/**
 * Given a list of markdown tokens and their children,
 * returns a list of reference IDs that exists in the markdown tree
 * Uses recursive Depth-First-Search
 */
export function extractReferences(tokens: any[]): string[] {
    const ids: string[] = [];
    const referencePattern = /@(\w|:|\?|\-)+/g;

    /* Collect all words that matches the regular expression */
    DFS(tokens);

    function DFS(nodes: any[]): void {
        nodes.forEach((node) => {
            if (
                node["type"] === "text" &&
                node.content &&
                node.content.length > 1
            ) {
                /* If matches found, add them to IDs without @ */
                const matches = node.content.match(referencePattern);
                if (matches && matches.length > 0) {
                    matches.forEach((word) => ids.push(word.substring(1)));
                }
            }

            if (node["children"]) {
                DFS(node["children"]);
            }
        });
    }

    return ids;
}
