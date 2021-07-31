import joplin from "api";
import { SettingItemType } from "api/types";
import {
    SETTINGS_SECTION_ID,
    PLUGIN_ICON,
    SETTINGS_BIBTEX_FILE_PATH_ID,
    SETTINGS_CSL_FILE_PATH_ID,
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

    // Register settings fields
    await joplin.settings.registerSettings({
        [SETTINGS_BIBTEX_FILE_PATH_ID]: {
            value: "",
            type: SettingItemType.String,
            section: SETTINGS_SECTION_ID,
            public: true,
            label: "BibTeX File",
            description:
                'You can include multiple paths by putting a ";" between every two paths',
        },

        [SETTINGS_CSL_FILE_PATH_ID]: {
            value: "",
            type: SettingItemType.String,
            section: SETTINGS_SECTION_ID,
            public: true,
            label: "CSL File (used to specify citation style)",
        },
    });
}
