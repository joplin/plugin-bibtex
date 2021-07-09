import joplin from 'api';
import { initConfigScreen } from './ui/settings';
import { registerToolbarButton } from './ui/toolbar-button';
import { registerAddBibTexReferenceCommand } from './add-bibtex-reference.command';
import { registerBibliographyRenderer } from './ui/bibliography-renderer';

joplin.plugins.register({
	onStart: async function() {
		console.info('BibTeX plugin started!');

		await initConfigScreen();
		await registerAddBibTexReferenceCommand();
		await registerToolbarButton();
		await registerBibliographyRenderer();
	}
});
