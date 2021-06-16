import joplin from "api";

/**
 * Register the main command of the plugin
 */
export async function registerAddBibTexReferenceCommand () {
    await joplin.commands.register({
        name: 'addBibTeXReference',
        label: 'Add BibTeX Reference',
        iconName: 'fa fa-graduation-cap',
        execute: async () => {
            alert('Add BibTeX Reference Command');
        }
    });
}
