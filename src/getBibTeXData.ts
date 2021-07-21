import joplin from "api";
import { DataStore } from "./data/data-store";
import { parse } from "./util/parser.util";
import { Reference } from "./model/reference.model";
import {
    ERROR_PARSING_FAILED,
    SETTINGS_FILE_PATH_ID
} from "./constants";
const fs = joplin.require("fs-extra");

/**
 * Get .bib file paths from settings
 * Read the contents of the file
 * Parse
 * Store
 */
export async function getBibTeXData (): Promise<Reference[]> {

    // Get file Paths
    const filePaths: string[] = (await joplin.settings.value(SETTINGS_FILE_PATH_ID))
        .split(";")                     // use ; as delimiter
        .map(path => path.trim());      // remove spaces at the end of each path

    // Read the contents of each file and 
    let fileContent: string;
    try {
        fileContent = (
            await Promise.all(
                filePaths.map(path => fs.readFile(path, "utf8"))
            )
        ).join("");
    } catch (e) {
        console.log(e);
        throw new Error(`Error: Could not open some files: ${e.message}`);
    }


    // Parse the raw data and store it
    let refs: Reference[] = [];
    try {
        refs = parse(fileContent);
        DataStore.setReferences(refs);
    } catch (e) {
        console.log(e);
        throw new Error(`${ERROR_PARSING_FAILED}\n\n${e.message}`);
    }

    return refs;
}
