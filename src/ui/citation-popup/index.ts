import joplin from "api";
import { DataStore } from "../../data/data-store";
import { Reference } from "../../model/reference.model";
import { encode, decode } from "html-entities";
import { CITATION_POPUP_ID } from "../../constants";
const fs = joplin.require("fs-extra");

let popupHandle: string = "";

/**
 * Show a dialog for the user to choose from a list of references
 * to be inserted in the note content
 */
export async function showCitationPopup () {

    // If the dialog was not initialized, create it and get its handle
    if (popupHandle === "") {
        popupHandle = await joplin.views.dialogs.create(CITATION_POPUP_ID);
    }

    const installationDir = await joplin.plugins.installationDir();
    let html: string = await fs.readFile(
        installationDir + "/ui/citation-popup/view.html",
        'utf8'
    );

    const refs: Reference[] = DataStore.getAllReferences();
    html = html.replace("<!-- content -->", fromRefsToHTML(refs));

    await joplin.views.dialogs.setHtml(popupHandle, html);
    await joplin.views.dialogs.addScript(popupHandle, "./ui/citation-popup/view.css");
    await joplin.views.dialogs.addScript(popupHandle, "./ui/citation-popup/view.js");

    const result = await joplin.views.dialogs.open(popupHandle);

    if (result.id === "no") return;
    if (result.formData["main"]["reference_id"] === "") return;

    const referenceId = decode(result.formData["main"]["reference_id"]);
    console.log(referenceId);
}

function fromRefsToHTML (refs: Reference[]): string {
    const ans: string = (
        `<ul>` +
            refs
                .map(ref => `
                    <li id="${ encode(ref.id) }">
                        ${ encode(ref.title) }
                    </li>
                `)
                .reduce((acc, curr) => acc + curr) +
        `</ul>`
    );
    return ans;
}
