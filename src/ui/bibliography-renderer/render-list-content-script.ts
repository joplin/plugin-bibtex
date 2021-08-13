import { extractReferences } from "./extract-references";
import { FORMAT_REFERENCES, GET_REFERENCES_BY_ID } from "./Message";

export default function (context) {
    return {
        plugin: function (markdownIt, _options) {
            const contentScriptId = context.contentScriptId;

            /* Appends a new custom token for references list */
            markdownIt.core.ruler.push("reference_list", (state) => {
                /* Collect references from the note body */
                const ids: string[] = extractReferences(state.tokens);

                /* Append reference_list token */
                let token = new state.Token("reference_list", "", 0);
                token.attrSet("refs", ids);
                state.tokens.push(token);
            });

            /* Define how to render the reference_list token */
            markdownIt.renderer.rules["reference_list"] = function (
                tokens,
                idx,
                options
            ) {
                let IDs: string[] = tokens[idx]["attrs"][0][1];
                if (IDs.length === 0) return "";

                const script: string = `
					webviewApi.postMessage("${contentScriptId}", ${JSON.stringify({
                    type: FORMAT_REFERENCES,
                    IDs,
                })}).then(html => {
						const referenceListView = document.getElementById("references_list");
						const referenceTitleView = document.getElementById("references_title");

						if (html !== "") referenceTitleView.style.display = "block";

						referenceListView.innerHTML = html;
					});
					return false;
				`;

                return `
					<h1 id="references_title" style="display:none">References</h1>
					<div id="references_list"></div>
					<style onload='${script.replace(/\n/g, " ")}'/>
				`;
            }
        },
    };
}
