const { BibTex } = require("./BibTex")

/**
 * Parse the bibtex data and return an array of reference objects
 * to be later processed by the Data Store.
 * @param data raw bibtex data as a string
 * @returns Array of reference objects
 */
export function parse (data: string): any[] {
    let bib = new BibTex();
    bib.content = data;
    bib.parse();
    return bib.data;
}
