/**
 * Given a list of markdown tokens and their children,
 * returns a list of reference IDs that exists in the markdown tree
 * Uses recursive Depth-First-Search
 */
export function extractReferences(tokens: any[]): string[] {
    const ids: string[] = [];
    DFS(tokens, ids);
    return ids;
}

function DFS(nodes: any[], ids): void {
    /* Collect all words that matches the below regular expression */
    const referencePattern = /@(\w|:|\?|\-)+/g;
    nodes.forEach((node) => {
        if (
            node["type"] === "text" &&
            node.content &&
            node.content.length > 1
        ) {
            /* A text token might contain several words separable by a space */
            const content: string = node.content;
            const matches = content.match(referencePattern);
            if (matches && matches.length > 0) {
                matches
                    .map((word) => word.substring(1)) // Remove the @
                    .forEach((word) => ids.push(word));
            }
        }

        if (node["children"]) {
            DFS(node["children"], ids);
        }
    });
}
