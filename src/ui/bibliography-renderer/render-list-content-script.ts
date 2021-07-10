import { Reference } from "../../model/reference.model";

declare const webviewApi: any;

export default function(context) { 
	return {
		plugin: function(markdownIt, _options) {
			const contentScriptId = context.contentScriptId;

			/* Appends a new custom token for references list */
			markdownIt.core.ruler.push("reference_list", async state => {

				/* Collect references from the note body using Depth-first-search */
				const ids: Reference[] = [];
				dfs(state.tokens);
				
				function dfs (children: any[]): void {
					if (!children) return;

					/* Search for three consecutive tokens: "link_open", "text", and "link_close" */
					for (let i = 1; i < children.length - 1; i++) {
						const curr = children[i], prev = children[i-1], next = children[i+1];
						if (
							prev["type"] === "link_open" &&
							curr["type"] === "text" &&
							next["type"] === "link_close" &&
							curr.content && curr.content.length > 1 &&
							curr.content.startsWith("@")
						) {
							const id = curr.content.substring(1);
							ids.push(id);
						} else {
							if (curr["children"]) dfs(curr["children"]);
						}
					}
					// first and last child that were not traversed previously
					const last = children[children.length - 1], first = children[0];
					if (last["children"]) dfs(last["children"]);
					if (first["children"]) dfs(first["children"]);
				};
				
				/* Append reference_list token */
				let token = new state.Token("reference_list", "", 0);
				console.log(ids);
				token.attrSet("refs", ids);
				state.tokens.push(token);
			});
			
			/* Define how to render the previously defined token */
			markdownIt.renderer.rules["reference_list"] = renderReferenceList;

			function renderReferenceList (tokens, idx, options) {
				let IDs: string[] = tokens[idx]["attrs"][0][1];
				if (IDs.length === 0) return "";

				const script: string = `
					webviewApi.postMessage("${contentScriptId}", ${JSON.stringify(IDs)}).then(refs => {
						const referenceListView = document.getElementById("references_list");
						const referenceTitleView = document.getElementById("references_title");

						if (refs.length > 0) referenceTitleView.style.display = "block";

						let ans = "";
						refs.forEach(ref => ans += ref);
						referenceListView.innerHTML = ans;
					});
					return false;
				`;

				return `
					<h1 id="references_title" style="display:none">References</h1>
					<ul id="references_list"></ul>
					<style onload='${script.replace(/\n/g, ' ')}'/>
				`;
			}
		}
	}
}
