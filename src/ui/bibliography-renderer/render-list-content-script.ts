import { extractReferences } from "./extract-references";
import { renderInlineReferences } from "./render-inline-references";
import { FORMAT_REFERENCES, GET_REFERENCE_BY_ID } from "./Message";

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
            };

            /* Define how to render inline references (with custom styles) */
            markdownIt.core.ruler.push("inline_reference", (state: any) => {
                renderInlineReferences(
                    state.tokens,
                    contentScriptId,
                    state.Token
                );
                console.log(state.tokens);
            });

            /*
            I want to intercept all inline reference tokens and replace them with the appropriate html
            But for some reason, It does not work
            I still don't understand exactly how to do this
            and the documentation of markdown-it does not help either
            */
            markdownIt.renderer.rules["inline_reference"] = function (
                tokens,
                idx,
                options
            ) {
                return "<strong>(Loading...)</strong>";
            };
        },
    };
}
