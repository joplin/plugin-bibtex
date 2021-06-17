import joplin from 'api';
import constants from '../constants';

/**
 * Initialize all the necessary components in the config screen
 */
export async function initConfigScreen (): Promise<void> {

    	// Register the config screen page
		await joplin.settings.registerSection(constants.SETTINGS_SECTION_ID, {
			name: "bibtex",
			label: "BibTeX Plugin",
			description: "Use locally stored BibTeX files to include citations in Joplin notes",
			iconName: constants.PLUGIN_ICON
		});

		// Bibtex file path
		const options = {};
		options[constants.SETTINGS_FILE_PATH_ID] = {
			value: "",
			type: 2,
			section: 'bibtex.settings',
			public: true,
			label: 'BibTeX File',
		};
		await joplin.settings.registerSettings(options);
}
