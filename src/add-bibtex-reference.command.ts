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

            // Get file Path and read the contents of the file
            const filePath: string = await joplin.settings.value(constants.SETTINGS_FILE_PATH_ID);
            let fileContent: string;
            try {
                fileContent = await fs.readFile(filePath, "utf8");
            } catch (e) {
                await showMessageBox(`Error: Could not open file ${filePath}: ${e.message}`)
                return;
            }

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
