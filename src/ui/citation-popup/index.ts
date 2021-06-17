import joplin from "api";
import { DataStore } from "../../data/data-store";
import constants from "../../constants";
import { Reference } from "../../model/reference.model";
import { encode } from "html-entities";
const fs = joplin.require("fs-extra");

let popupHandle: string = "";

/**
 * Show a dialog for the user to choose from a list of references
 * to be inserted in the note content
 */
export async function showCitationPopup () {

    // If the dialog was not initialized, create it and get its handle
    if (popupHandle === "") {
        popupHandle = await joplin.views.dialogs.create(constants.CITATION_POPUP_ID);
    }

    let html: string = await fs.readFile(
        await joplin.plugins.installationDir() + "/ui/citation-popup/view.html",
        'utf8'
    );

    const refs: Reference[] = DataStore.getAllReferences();
    html = html.replace("<!-- content -->", fromRefsToHTML(refs));

    await joplin.views.dialogs.setHtml(popupHandle, html);
    await joplin.views.dialogs.open(popupHandle);
}

function fromRefsToHTML (refs: Reference[]): string {
    const ans: string = (
        `<ul>` +
            refs
                .map(ref => `<li>${ encode(ref.title) }</li>`)
                .reduce((acc, curr) => acc + curr) +
        `</ul>`
    );
    console.log(ans);
    return ans;
}
