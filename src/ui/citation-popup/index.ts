import joplin from "api";
import { Reference } from "../../model/reference.model";
import { getDate } from "../../util/get-date.util";
import { encode, decode } from "html-entities";
import { CITATION_POPUP_ID } from "../../constants";
const fs = joplin.require("fs-extra");

let popupHandle: string = "";

/**
 * Show a dialog for the user to choose from a list of references
 * to be inserted in the note content
 * @returns ID of the selected reference
 */
export async function showCitationPopup (refs: Reference[]): Promise<string> {

    // If the dialog was not initialized, create it and get its handle
    if (popupHandle === "") {
        popupHandle = await joplin.views.dialogs.create(CITATION_POPUP_ID);
    }

    const installationDir = await joplin.plugins.installationDir();
    let html: string = await fs.readFile(
        installationDir + "/ui/citation-popup/view.html",
        'utf8'
    );

    html = html.replace("<!-- content -->", fromRefsToHTML(refs));

    await joplin.views.dialogs.setHtml(popupHandle, html);
    await joplin.views.dialogs.addScript(popupHandle, "./ui/citation-popup/view.css");
    await joplin.views.dialogs.addScript(popupHandle, "./ui/citation-popup/view.js");

    const result = await joplin.views.dialogs.open(popupHandle);

    if (result.id === "no") return "";
    if (result.formData["main"]["reference_id"] === "") return "";

    // Insert the selected reference into the note content
    return decode(result.formData["main"]["reference_id"]);
}

function fromRefsToHTML (refs: Reference[]): string {
    const ans: string = (
        '<div id="json" style="display:none;">' +
            JSON.stringify(
                refs.map(ref => {
                    return {
                        id: encode(ref.id),
                        title: encode(ref.title),
                        author: ref.author.map(auth => {
                                    return {
                                        given: encode(auth.given),
                                        family: encode(auth.family)
                                    };
                                }),
                        year: (ref.issued) ? getDate(ref).getFullYear() : null
                    };
                })
             ) +
        '</div>'
    );
    return ans;
}
