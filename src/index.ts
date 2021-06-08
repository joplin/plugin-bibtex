import joplin from 'api';
import { initConfigScreen } from './ui/settings';

joplin.plugins.register({
	onStart: async function() {
		console.info('BibTeX plugin started!');

		await initConfigScreen();
	},
});
