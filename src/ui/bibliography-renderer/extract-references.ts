import { Reference } from "../../model/reference.model";

/**
 * Given a list of markdown tokens and their children,
 * returns a list of reference IDs that exists in the markdown tree
 * Uses Depth-First-Search
 */
export function extractReferences(tokens: any[]): Reference[] {
    const ids: Reference[] = [];
    DFS(tokens);

    function DFS(children: any[]): void {
        if (!children) return;

        /* Search for three consecutive tokens: "link_open", "text", and "link_close" */
        for (let i = 1; i < children.length - 1; i++) {
            const curr = children[i],
                prev = children[i - 1],
                next = children[i + 1];
            if (
                prev["type"] === "link_open" &&
                curr["type"] === "text" &&
                next["type"] === "link_close" &&
                curr.content &&
                curr.content.length > 1 &&
                curr.content.startsWith("@")
            ) {
                const id = curr.content.substring(1);
                ids.push(id);
            } else {
                if (curr["children"]) DFS(curr["children"]);
            }
        }
        // first and last child that were not traversed previously
        const last = children[children.length - 1],
            first = children[0];
        if (last["children"]) DFS(last["children"]);
        if (first["children"]) DFS(first["children"]);
    }

    return ids;
}
