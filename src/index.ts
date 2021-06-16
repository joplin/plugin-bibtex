import joplin from 'api';
import { initConfigScreen } from './ui/settings';
import { registerToolbarButton } from './ui/toolbar-button';
import { registerAddBibTexReferenceCommand } from './add-bibtex-reference.command';

joplin.plugins.register({
	onStart: async function() {
		console.info('BibTeX plugin started!');

		await initConfigScreen();

		await registerAddBibTexReferenceCommand();
		await registerToolbarButton();
	}
});
