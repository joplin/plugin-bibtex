import joplin from "api";
import { initConfigScreen } from "./ui/settings";
import { registerToolbarButton } from "./ui/toolbar-button";
import { registerAddBibTexReferenceCommand } from "./add-bibtex-reference.command";
import { registerBibliographyRenderer } from "./ui/bibliography-renderer";
import { getBibTeXData } from "./getBibTeXData";
import { CSLProcessor } from "./util/csl-processor";
import { SETTINGS_CSL_FILE_PATH_ID } from "./constants";

/**
 * Initialize the main components of the plugin
 */
export async function init(): Promise<void> {
    await initConfigScreen();
    await registerAddBibTexReferenceCommand();
    await registerToolbarButton();
    await registerBibliographyRenderer();

    try {
        await getBibTeXData();
    } catch (e) {
        await joplin.views.dialogs.showMessageBox(e.message);
    }

    CSLProcessor.getInstance().setStyle(
        await joplin.settings.value(SETTINGS_CSL_FILE_PATH_ID)
    );
}
