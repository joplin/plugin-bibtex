import joplin from "api";
import { showCitationPopup } from "./ui/citation-popup";
import { Reference } from "./model/reference.model";
import { formatReference } from "./util/format-ref.util";
import { DataStore } from "./data/data-store";
import { getBibTeXData } from "./getBibTeXData";
import { ADD_BIBTEX_REFERENCE_COMMAND, PLUGIN_ICON } from "./constants";
const fs = joplin.require("fs-extra");

/**
 * Register the main command of the plugin
 */
export async function registerAddBibTexReferenceCommand() {
    await joplin.commands.register({
        name: ADD_BIBTEX_REFERENCE_COMMAND,
        label: "Add BibTeX Reference",
        iconName: PLUGIN_ICON,
        execute: async () => {
            // Get refs
            let refs: Reference[] = [];
            try {
                refs = await getBibTeXData();
            } catch (e) {
                await joplin.views.dialogs.showMessageBox(e.message);
                return;
            }

            // Show the citation popup and get the IDs of the selected references
            const selectedRefsIDs: string[] = await showCitationPopup(refs);

            // If no reference was selected, exit the command
            if (selectedRefsIDs.length === 0) return;

            // Insert the selected references into the note content
            const toBeInsertedText = selectedRefsIDs
                .map((refId) => DataStore.getReferenceById(refId))
                .map((ref) => formatReference(ref))
                .reduce((acc, curr) => acc + " " + curr);

            await joplin.commands.execute("insertText", toBeInsertedText);

            // Return the focus to the note editor
            await joplin.commands.execute("focusElement", "noteBody");
        },
    });
}
