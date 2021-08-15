import { GET_REFERENCE_BY_ID } from "./Message";
import { patterns } from "./reference-patterns";

/**
 * Given a list of tokens and their children,
 * return a string of javascript code that requests the reference data
 */
export function generateScript(tokens: any[], contentScriptId: string): string {
    let js: string = "";

    /* Collect all words that matches the regular expression */
    let inlineReferenceCounter: number = 0;
    DFS(tokens, contentScriptId);

    function DFS(nodes: any[], contentScriptId: string): void {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].type === "inline_reference") {
                let matches: string[];

                matches = nodes[i].content.match(patterns[0]);
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
                                if (ref && ref.year) {
                                    const view = document.getElementById("${viewId}");
                                    view.textContent = "(" + ref.year + ")";
                                }
                            });
                        `;

                        js += script;
                        inlineReferenceCounter++;
                    }
                }

                matches = nodes[i].content.match(patterns[1]);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        const match: string = matches[j];
                        const refId: string = match.substring(
                            2,
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
                                if (ref && ref.year && ref.auth) {
                                    const view = document.getElementById("${viewId}");
                                    view.textContent = "(" + ref.auth + " " + ref.year + ")";
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
