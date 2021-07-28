import joplin from "api";
import { SettingItem } from "api/types";
import {
    SETTINGS_SECTION_ID,
    PLUGIN_ICON,
    SETTINGS_BIBTEX_FILE_PATH_ID,
} from "../constants";

/**
 * Initialize all the necessary components in the config screen
 */
export async function initConfigScreen(): Promise<void> {
    // Register the config screen page
    await joplin.settings.registerSection(SETTINGS_SECTION_ID, {
        name: "bibtex",
        label: "BibTeX Plugin",
        description:
            "Use locally stored BibTeX files to include citations in Joplin notes",
        iconName: PLUGIN_ICON,
    });

    // Bibtex file path

    const options: Record<string, SettingItem> = {};
    options[SETTINGS_BIBTEX_FILE_PATH_ID] = {
        value: "",
        type: 2,
        section: "bibtex.settings",
        public: true,
        label: "BibTeX File",
    };
    await joplin.settings.registerSettings(options);
}
