import { Reference } from "../../model/reference.model";

declare const webviewApi: any;

export default function(_context) { 
	return {
		plugin: function(markdownIt, _options) {
			const contentScriptId = _context.contentScriptId;

			/* Appends a new custom token for references list */
			markdownIt.core.ruler.push("reference_list", async state => {

				/* Collect references from the note body */
				const ids: Reference[] = [];
				const refPattern: RegExp = /\[@.+\]\(.+\)/;
				state.tokens.forEach(t => {
					if (t["type"] !== "inline") return;
					if (!refPattern.test(t["content"])) return;
					ids.push(t["children"][1]["content"]);
				});
				
				/* Append reference_list token */
				let token = new state.Token("reference_list", "", 0);
				token.attrSet("refs", ids);
				state.tokens.push(token);
			});
			
			/* Define how to render the previously defined token */
			markdownIt.renderer.rules["reference_list"] = renderReferenceList;

			function renderReferenceList (tokens, idx, options) {
				let IDs: string[] = tokens[idx]["attrs"][0][1];
				if (IDs.length === 0) return "";
				
				IDs = IDs.map(id => id.substring(1));

				const script: string = `
					webviewApi.postMessage("${contentScriptId}", ${JSON.stringify(IDs)}).then(refs => {
						const referenceListView = document.getElementById("reference_list");
						refs.forEach(ref => referenceListView.innerHTML += ref);
					});
					return false;
				`;

				return `
					<h1>References</h1>
					<ul id="reference_list"></ul>
					<style onload='${script.replace(/\n/g, ' ')}'/>
				`;
			}
		}
	}
}
