/**
 * Given a list of markdown tokens and their children,
 * returns a list of reference IDs that exists in the markdown tree
 * Uses Depth-First-Search
 */
export function extractReferences(tokens: any[]): string[] {
    const ids: string[] = [];
    DFS(tokens);

    /* Collect all words that starts with @ */
    function DFS(nodes: any[]): void {
        nodes.forEach((node) => {
            if (
                node["type"] === "text" &&
                node.content &&
                node.content.length > 1
            ) {
                /* A text token might contain several words separable by a space */
                const content: string = node.content;
                content
                    .split(" ")
                    .filter((word) => word.startsWith("@"))
                    .map((word) => word.substring(1)) // Remove the @
                    .forEach((word) => ids.push(word));
            }

            if (node["children"]) {
                DFS(node["children"]);
            }
        });
    }

    return ids;
}
