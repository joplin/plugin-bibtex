import { GET_REFERENCE_BY_ID } from "./Message";

/**
 * Given a list of markdown tokens and their children,
 * formats all inline references according to the syntax given here:
 * https://discourse.joplinapp.org/t/customize-the-rendering-of-inline-references-spec/19294?u=xuser5000
 * Uses recursive Depth-First-Search
 */
export function renderInlineReferences(
    tokens: any[],
    contentScriptId: string,
    Token
) {
    DFS(tokens, contentScriptId, Token);
}

let pattern: RegExp = /\[-@(\w|:|\?|\-)+\]/g;
function DFS(nodes: any[], contentScriptId: string, Token: any): void {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === "text") {
            // If it's the default format, keep it as it is
            if (
                i - 1 >= 0 &&
                nodes[i - 1].type === "link_open" &&
                i + 1 < nodes.length &&
                nodes[i + 1].type === "link_close"
            ) {
                continue;
            }

            const matches: string[] = nodes[i].content.match(pattern);
            if (matches && matches.length) {
                if (!nodes[i].children) nodes[i].children = [];
                matches.forEach((match) => {
                    const refToken = new Token("inline_reference", "", 0);
                    refToken.content = match;
                    nodes[i].children.push(refToken);
                });
            }

            // Get all the matches of the pattern and replace them with the formatted reference
            /* const content: string = nodes[i].content;
            const matches = content.match(pattern);
            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    const match = matches[j];
                    const refId = match.substring(3, match.length - 1);
                    const script: string = `
                    webviewApi.postMessage("${contentScriptId}", ${JSON.stringify(
                        {
                            type: GET_REFERENCE_BY_ID,
                            refId,
                        }
                    )}).then(reference => {
                                const yearView = document.getElementById("bibtex-year-${j}");
                                if (reference && reference.year) {
                                    yearView.textContent = "(" + reference.year + ")";
                                }

                            });
                            return false;
                        `;

                    const html: string = `
                            <strong id="bibtex-year-${j}">(Loading...)</strong>
                            <style onload='${script.replace(/\n/g, " ")}'/>`;
                    console.log("Html " + html);

                    content.replace(match, html);
                }
            } */
        }

        // Recursively search child nodes
        if (nodes[i].children && nodes[i].children.length) {
            DFS(nodes[i].children, contentScriptId, Token);
        }
    }
}
