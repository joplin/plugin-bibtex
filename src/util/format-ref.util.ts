import { Reference } from "../model/reference.model";
import { getDate } from "./get-date.util";

/**
 * Format a given reference as a valid markdown url
 */
export function formatReference (ref: Reference): string {
    const author: string = ref.author[0].family;
    const year: number = getDate(ref).getFullYear();
    const title: string = ref.title.split(" ").join("+");

    let url: string = "";
    if (ref.DOI && ref.DOI !== "") url = `http://dx.doi.org/${ref.DOI}`;
    else if (ref.URL && ref.URL !== "") url = ref.URL;
    else url = `https://scholar.google.com/scholar?q=${title},+${author}`;
    
    return `[@${author + year}](${url})`;
}
