import * as Cite from "citation-js";
import { Reference } from "../model/reference.model";

/**
 * Parse the bibtex data and return an array of reference objects
 * to be later processed by the Data Store.
 * @param data raw bibtex data as a string
 * @returns Array of reference objects
 */
export function parse (data: string): Reference[] {
    let citation = new Cite(data);
    let refs: Reference[] = citation.data;

    // Add the more formatted date property instead of relying on "issued"
    refs = refs.map(ref => {
        return {
            ...ref,
            date: {
                year: ref.issued["date-parts"][0][0],
                month: ref.issued["date-parts"][0][1],
                day: ref.issued["date-parts"][0][2]
            }
        }
    });

    return refs;
}
