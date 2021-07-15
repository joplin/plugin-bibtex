import joplin from 'api';
import { SettingItem, SettingItemType } from 'api/types';
import {
	SETTINGS_SECTION_ID,
	PLUGIN_ICON,
	SETTINGS_FILE_PATH_ID,
	SETTINGS_STRICT_MODE
} from '../constants';

/**
 * Initialize all the necessary components in the config screen
 */
export async function initConfigScreen (): Promise<void> {

	/* Register the config screen page */
	await joplin.settings.registerSection(SETTINGS_SECTION_ID, {
		name: "bibtex",
		label: "BibTeX Plugin",
		description: "Use locally stored BibTeX files to include citations in Joplin notes",
		iconName: PLUGIN_ICON
	});

	/* Bibtex file path */
	const options1: Record<string, SettingItem> = {};
	options1[SETTINGS_FILE_PATH_ID] = {
		value: "",
		type: SettingItemType.String,
		section: SETTINGS_SECTION_ID,
		public: true,
		label: 'BibTeX File',
	};
	await joplin.settings.registerSettings(options1);

	const options2: Record<string, SettingItem> = {};
	options2[SETTINGS_STRICT_MODE] = {
		value: true,
		type: SettingItemType.Bool,
		section: SETTINGS_SECTION_ID,
		public: true,
		label: "Strict mode",
		description: `When searching for references, strict mode shows only the items that contains the search query as a substring`,
		advanced: true
	};
	await joplin.settings.registerSettings(options2);

}
