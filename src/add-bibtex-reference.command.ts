import joplin from "api";
import constants from "./constants";
import { showCitationPopup } from './ui/citation-popup';
import { Reference } from "./model/reference.model";
import { parse } from "./util/parser.util";
import { DataStore } from "./data/data-store";
const fs = joplin.require("fs-extra");

const showMessageBox = joplin.views.dialogs.showMessageBox;

/**
 * Register the main command of the plugin
 */
export async function registerAddBibTexReferenceCommand () {
    await joplin.commands.register({
        name: constants.ADD_BIBTEX_REFERENCE_COMMAND,
        label: 'Add BibTeX Reference',
        iconName: constants.PLUGIN_ICON,
        execute: async () => {

            // Get file Path and check for errors
            const filePath: string = await joplin.settings.value(constants.SETTINGS_FILE_PATH_ID);
            if (!isFileExisting(filePath)) {
                await showMessageBox(constants.ERROR_FILE_NOT_FOUND);
                return;
            }
            if (!isFileReadable(filePath)) {
                await showMessageBox(constants.ERROR_PERMISSION_DENIED);
                return;
            }            

            // Import bibtex raw data
            const fileContent: string = await fs.readFile(filePath, "utf8");            

            try {

                // Parse the raw data and store it
                const refs: Reference[] = parse(fileContent);
                DataStore.setReferences(refs);

                // Show the citation popup
                await showCitationPopup();

            } catch (e) {
                console.log(e.message);
                await showMessageBox(constants.ERROR_PARSING_FAILED);
            }

        }
    });
}

function isFileExisting (file: string): boolean {
    try {
        fs.accessSync(file, fs.constants.F_OK | fs.constants.R_OK);
        return true;
    } catch (e) { return false; }
}

function isFileReadable (file: string): boolean {
    try {
        fs.accessSync(file, fs.constants.R_OK);
        return true;
    } catch (e) { return false; }
}
