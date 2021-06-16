import joplin from "api";
import constants from "../constants";

/**
 * Show a dialog for the user to choose from a list of references
 * to be inserted in the note content
 */
export async function showCitationPopup () {
    let popupHandle: string = await joplin.views.dialogs.create(constants.CITATION_POPUP_ID);
    await joplin.views.dialogs.open(popupHandle);
}
