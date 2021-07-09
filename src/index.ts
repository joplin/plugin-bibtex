import joplin from 'api';
import { init } from './init';

joplin.plugins.register({
	onStart: async function() {
		console.info('BibTeX plugin started!');

		init();
	}
});
