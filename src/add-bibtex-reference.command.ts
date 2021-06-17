import joplin from "api";
import { showCitationPopup } from './ui/citation-popup';
import { Reference } from "./model/reference.model";
import { parse } from "./util/parser.util";
import { DataStore } from "./data/data-store";
import {
    ADD_BIBTEX_REFERENCE_COMMAND,
    PLUGIN_ICON,
    SETTINGS_FILE_PATH_ID,
    ERROR_PARSING_FAILED
} from "./constants";
const fs = joplin.require("fs-extra");

const showMessageBox = joplin.views.dialogs.showMessageBox;

/**
 * Register the main command of the plugin
 */
export async function registerAddBibTexReferenceCommand () {
    await joplin.commands.register({
        name: ADD_BIBTEX_REFERENCE_COMMAND,
        label: 'Add BibTeX Reference',
        iconName: PLUGIN_ICON,
        execute: async () => {

            // Get file Path and read the contents of the file
            const filePath: string = await joplin.settings.value(SETTINGS_FILE_PATH_ID);
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
                await showMessageBox(ERROR_PARSING_FAILED);
            }

        }
    });
}
