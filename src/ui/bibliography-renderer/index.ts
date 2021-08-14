import joplin from "api";
import { ContentScriptType } from "api/types";
import { DataStore } from "../../data/data-store";
import { CSLProcessor } from "../../util/csl-processor";
import {
    REFERENCE_LIST_CONTENT_SCRIPT_ID,
    SETTINGS_CSL_FILE_PATH_ID,
} from "../../constants";
import { FORMAT_REFERENCES, GET_REFERENCE_BY_ID } from "./Message";

/**
 * Render the full list of references at the end of the note viewer
 */
export async function registerBibliographyRenderer(): Promise<void> {
    /* Register a new content script of type "markdown-it" */
    await joplin.contentScripts.register(
        ContentScriptType.MarkdownItPlugin,
        REFERENCE_LIST_CONTENT_SCRIPT_ID,
        "./ui/bibliography-renderer/render-list-content-script.js"
    );

    const processor = CSLProcessor.getInstance();

    /* Handle messages sent by the content script */
    await joplin.contentScripts.onMessage(
        REFERENCE_LIST_CONTENT_SCRIPT_ID,

        (req: { type: string }) => {
            switch (req.type) {
                /**
                 * Format the references according to the style specified by the user
                 */
                case FORMAT_REFERENCES:
                    /**
                     * Filter duplicate IDs
                     * Filter fake IDs (IDs that don't correspond to actual reference objects)
                     */
                    let IDs: string[] = req["IDs"];
                    IDs = [...new Set(IDs)].filter((id) => {
                        try {
                            DataStore.getReferenceById(id);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    });

                    /**
                     * Apply the specified citation style to the references
                     * Does html-encoding by default
                     */
                    return processor.formatRefs(IDs);
                    break;

                case GET_REFERENCE_BY_ID:
                    console.log(req);
                    const id = req["id"];
                    try {
                        return DataStore.getReferenceById(id);
                    } catch (e) {
                        return null;
                    }
                    break;
            }
        }
    );
    setProcessorStyle(processor);

    /**
     * Listen to changes applied to the CSL field
     * On change, set the style of the CSL Processor
     */
    joplin.settings.onChange(async (event) => {
        if (event.keys.includes(SETTINGS_CSL_FILE_PATH_ID)) {
            await setProcessorStyle(processor);
        }
    });
}

/**
 * Sets the style of the given processor as the value specified by the user in the settings
 */
async function setProcessorStyle(processor: CSLProcessor) {
    try {
        processor.setStyle(
            await joplin.settings.value(SETTINGS_CSL_FILE_PATH_ID)
        );
    } catch (e) {
        console.log(e);
        await joplin.views.dialogs.showMessageBox(e.message);
    }
}
