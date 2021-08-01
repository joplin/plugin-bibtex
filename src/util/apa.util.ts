import * as Cite from "citation-js";
import { Reference } from "../model/reference.model";

/**
 * Converts a reference to APA format (in HTML)
 */
export function fromRefToAPA(reference: Reference): string {
    return new Cite(reference).format("bibliography", {
        format: "html",
        template: "citation-apa",
        lang: "en-US",
    });
}
