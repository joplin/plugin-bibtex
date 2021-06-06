import joplin from 'api';

/**
 * Initialize all the necessary components in the config screen
 */
export async function initConfigScreen (): Promise<void> {

    	// Register the config screen page
		await joplin.settings.registerSection("bibtex.settings", {
			name: "bibtex",
			label: "BibTeX Plugin",
			description: "Use locally stored BibTeX files to include citations in Joplin notes",
		});

        // Bibtex file path
		await joplin.settings.registerSetting('bibtex.file', {
			value: "",
			type: 2,
			section: 'bibtex.settings',
			public: true,
			label: 'BibTeX File',
		});
}
