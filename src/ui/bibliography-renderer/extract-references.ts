/**
 * Given a list of markdown tokens and their children,
 * returns a list of reference IDs that exists in the markdown tree
 * Uses recursive Depth-First-Search
 */
export function extractReferences(tokens: any[], Token: any): string[] {
    const ids: string[] = [];
    const referencePattern = /@(\w|:|\?|\-)+/g;

    /* Collect all words that matches the regular expression */
    DFS(tokens, Token);

    function DFS(nodes: any[], Token: any): void {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].type === "text") {
                // If it's the default format, keep it as it is
                // Example: [@dijkstraNoteTwoProblems1959](https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=two+problems+connexion+with+graphs&btnG=&oq=note+on+two+problems+in+connexion+)
                if (
                    nodes[i].content.startsWith("@") &&
                    i - 1 >= 0 &&
                    nodes[i - 1].type === "link_open" &&
                    i + 1 < nodes.length &&
                    nodes[i + 1].type === "link_close"
                ) {
                    ids.push(nodes[i].content.substring(1));
                    continue;
                }

                const matches: string[] =
                    nodes[i].content.match(referencePattern);
                if (!matches || !matches.length) continue;

                // Replace the current textToken with a reference Token with the same content
                // Just to be parsed later on by the renderer
                const content = nodes[i].content;
                nodes[i] = new Token("inline_reference", "", 0);
                nodes[i].content = content;

                // push all the matches to the ids array, without "@"
                matches.forEach((match) => ids.push(match.substring(1)));
            }
            // Recursively search child nodes
            else if (nodes[i].children && nodes[i].children.length) {
                DFS(nodes[i].children, Token);
            }
        }
    }

    return ids;
}
