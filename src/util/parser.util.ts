import * as Cite from "citation-js";

/**
 * Parse the bibtex data and return an array of reference objects
 * to be later processed by the Data Store.
 * @param data raw bibtex data as a string
 * @returns Array of reference objects
 */
export function parse (data: string) {
    let citation = new Cite(data);
    return citation.data;
}
