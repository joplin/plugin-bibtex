import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import constants from '../constants';

/**
 * Create a toolbar button that executes addBibTeXReference Command
 * The button is located right above the text editor
 * It applies to the note body only
 */
export async function registerToolbarButton () {
    await joplin.views.toolbarButtons.create(
        constants.PLUGIN_TOOLBAR_BUTTON_ID,
        constants.ADD_BIBTEX_REFERENCE_COMMAND,
        ToolbarButtonLocation.EditorToolbar
    );
}
