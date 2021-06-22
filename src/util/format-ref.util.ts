import { Reference } from "../model/reference.model";
import { getDate } from "./get-date.util";

/**
 * Format a given reference as a valid markdown url
 */
export function formatReference (ref: Reference): string {
    const displayText: string = getDisplayText(ref);
    const link: string = getLink(ref);
    return `[@${displayText}](${link})`;
}

/**
 * Given a reference, returns the family name of the first author
 * If there are no authors provided, returns empty string ("")
 */
function getDisplayText (ref: Reference): string {
    const author = getAuthor(ref);
    let text: string = author;
    try {
        text += getDate(ref).getFullYear();
    } catch (e) { }

    // If there is no author or year, put the title of the ref
    if (author === "") text = ref.title.split(" ").join();
    return text;
}

/**
 * returns the url of the ref to be used in markdown
 */
function getLink (ref: Reference): string {
    let url: string = "";
    if (ref.DOI && ref.DOI !== "") {
        url = `http://dx.doi.org/${ref.DOI}`;
    } else if (ref.URL && ref.URL !== "") {
        url = ref.URL;
    } else {
        url = `https://scholar.google.com/scholar?q=${ref.title}`;
        if (getAuthor(ref) !== "") url += `, ${getAuthor(ref)}`;
    }
    return url;

}

function getAuthor (ref: Reference): string {
    return (ref.author && ref.author.length > 0) ?
        (ref.author[0].family) :
        ("");
}
