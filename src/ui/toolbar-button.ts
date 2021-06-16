import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';

/**
 * Create a toolbar button that executes addBibTeXReference Command
 * The button is located right above the text editor
 * It applies to the note body only
 */
export async function registerToolbarButton () {
    await joplin.views.toolbarButtons.create(
        "bibtex_plugin_toolbar_button",
        "addBibTeXReference",
        ToolbarButtonLocation.EditorToolbar
    );
}
