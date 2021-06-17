import joplin from "api";
import constants from "../../constants";
const fs = joplin.require("fs-extra");

/**
 * Show a dialog for the user to choose from a list of references
 * to be inserted in the note content
 */

let popupHandle: string = "";

export async function showCitationPopup () {

    // If the dialog was not initialized, create it and get its handle
    if (popupHandle === "")
        popupHandle = await joplin.views.dialogs.create(constants.CITATION_POPUP_ID);
    
    const installDir = await joplin.plugins.installationDir();
    const html = await fs.readFile(installDir + '/ui/citation-popup/view.html', 'utf8');

    await joplin.views.dialogs.setHtml(popupHandle, html);
    await joplin.views.dialogs.open(popupHandle);
}
