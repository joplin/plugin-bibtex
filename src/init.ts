import joplin from 'api';
import { initConfigScreen } from './ui/settings';
import { registerToolbarButton } from './ui/toolbar-button';
import { registerAddBibTexReferenceCommand } from './add-bibtex-reference.command';
import { registerBibliographyRenderer } from './ui/bibliography-renderer';

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

/**
 * Initialize the main components of the plugin
 */
export async function init (): Promise<void> {

    await initConfigScreen();
    await registerAddBibTexReferenceCommand();
    await registerToolbarButton();
    await loadBibTeXData();
    await registerBibliographyRenderer();

}

async function loadBibTeXData (): Promise<void> {
    try {

        // Get file Path and read the contents of the file
        const filePath: string = await joplin.settings.value(SETTINGS_FILE_PATH_ID);
        let fileContent: string;

        fileContent = await fs.readFile(filePath, "utf8");

        // Parse the raw data and store it
        const refs: Reference[] = parse(fileContent);
        DataStore.setReferences(refs);

    } catch (e) { }
}
