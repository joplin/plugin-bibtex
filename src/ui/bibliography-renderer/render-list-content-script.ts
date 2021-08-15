import { extractReferences } from "./extract-references";
import { generateScript } from "./generateScript";
import { FORMAT_REFERENCES } from "./Message";
import { patterns } from "./reference-patterns";

export default function (context) {
    return {
        plugin: function (markdownIt, _options) {
            const contentScriptId = context.contentScriptId;

            /* Appends a new custom token for references list */
            markdownIt.core.ruler.push("reference_list", (state) => {
                /* Collect references from the note body */
                const ids: string[] = extractReferences(
                    state.tokens,
                    state.Token
                );
                const script: string = generateScript(
                    state.tokens,
                    contentScriptId
                );

                /* Append reference_list token */
                let token = new state.Token("reference_list", "", 0);
                token.attrSet("refs", ids);
                token.attrSet("script", script);
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
                let script: string = tokens[idx]["attrs"][1][1];

                script += `
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
					<style onload='${script.replace(/\n/g, " ")}' />
				`;
            };

            let inlineReferenceCounter: number = 0;
            markdownIt.renderer.rules["inline_reference"] = function (
                tokens,
                idx,
                options
            ) {
                const token = tokens[idx];
                let content = token.content;
                for (let i = 0; i < patterns.length; i++) {
                    const pattern: RegExp = patterns[i];

                    const matches: string[] = content.match(pattern);
                    if (matches && matches.length) {
                        for (let j = 0; j < matches.length; j++) {
                            const match = matches[j];
                            const viewId = `bibtex_reference_${inlineReferenceCounter}`;
                            const html = `<span id="${viewId}">(Loading...)</span>`;
                            content = content.replace(match, html);
                            inlineReferenceCounter++;
                        }
                    }
                }
                return content;
            };
        },
    };
}
