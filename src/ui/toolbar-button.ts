import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';
import {
    PLUGIN_TOOLBAR_BUTTON_ID,
    ADD_BIBTEX_REFERENCE_COMMAND
} from '../constants';

/**
 * Create a toolbar button that executes addBibTeXReference Command
 * The button is located right above the text editor
 * It applies to the note body only
 */
export async function registerToolbarButton () {
    await joplin.views.toolbarButtons.create(
        PLUGIN_TOOLBAR_BUTTON_ID,
        ADD_BIBTEX_REFERENCE_COMMAND,
        ToolbarButtonLocation.EditorToolbar
    );
}
