import joplin from "api";
import { ContentScriptType } from "api/types";
import { CSLProcessor } from "../../util/csl-processor";
import {
    REFERENCE_LIST_CONTENT_SCRIPT_ID,
    SETTINGS_CSL_FILE_PATH_ID,
    MESSAGE_RESTART_APP,
} from "../../constants";

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

    /**
     * Format the references according to the style specified by the user
     */
    const processor = CSLProcessor.getInstance();
    await joplin.contentScripts.onMessage(
        REFERENCE_LIST_CONTENT_SCRIPT_ID,

        (IDs: string[]) => {
            IDs = [...new Set(IDs)]; // Filter duplicate references

            /**
             * Apply the specified citation style to the references
             * Note: Does html-encoding by default
             */
            return processor.formatRefs(IDs);
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
