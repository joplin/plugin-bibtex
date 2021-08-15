import { GET_REFERENCE_BY_ID } from "./Message";

/**
 * Given a list of tokens and their children,
 * return a string of javascript code that requests the reference data
 */
export function generateScript(tokens: any[], contentScriptId: string): string {
    let js: string = "";
    const pattern: RegExp = /\[-@(\w|:|\?|\-)+\]/g;

    /* Collect all words that matches the regular expression */
    let inlineReferenceCounter: number = 0;
    DFS(tokens, contentScriptId);

    function DFS(nodes: any[], contentScriptId: string): void {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].type === "inline_reference") {
                const matches: string[] = nodes[i].content.match(pattern);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        const match: string = matches[j];
                        const refId: string = match.substring(
                            3,
                            match.length - 1
                        );
                        const viewId = `bibtex_reference_${inlineReferenceCounter}`;
                        const script: string = `
                        webviewApi.postMessage("${contentScriptId}", ${JSON.stringify(
                            {
                                type: GET_REFERENCE_BY_ID,
                                id: refId,
                            }
                        )}).then(ref => {
                                console.log("This is reference " + ref);
                                const yearView = document.getElementById("${viewId}");
                                console.log(yearView);
                                if (ref && ref.year) {
                                    yearView.textContent = "(" + ref.year + ")";
                                }
                            });
                        `;

                        js += script;
                        inlineReferenceCounter++;
                    }
                }
            }
            // Recursively search child nodes
            else if (nodes[i].children && nodes[i].children.length) {
                DFS(nodes[i].children, contentScriptId);
            }
        }
    }

    return js;
}
