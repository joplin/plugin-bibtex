import joplin from "api";
import constants from "./constants";
import { showCitationPopup } from './ui/citation-popup';

/**
 * Register the main command of the plugin
 */
export async function registerAddBibTexReferenceCommand () {
    await joplin.commands.register({
        name: constants.ADD_BIBTEX_REFERENCE_COMMAND,
        label: 'Add BibTeX Reference',
        iconName: constants.PLUGIN_ICON,
        execute: async () => {
            await showCitationPopup();
        }
    });
}
