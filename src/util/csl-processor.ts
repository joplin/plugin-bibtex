import joplin from "api";
import { DataStore } from "../data/data-store";
import { APA_STYLE } from "../assets/apa-6th-edition";
import { EN_US_LOCALE } from "../assets/locales-en-US";
const CSL = require("citeproc");
const fs = joplin.require("fs-extra");

/**
 * @singleton
 * https://citeproc-js.readthedocs.io/en/latest/running.html
 * Format research references according to a given citation style
 * Depends on DataStore
 */
export class CSLProcessor {
    private static instance: CSLProcessor = null;
    private citeproc: any;

    private constructor() {
        this.init();
    }

    public static getInstance(): CSLProcessor {
        if (this.instance === null) this.instance = new CSLProcessor();
        return this.instance;
    }

    private init(CSLFilePath: string = "") {
        const style: string =
            CSLFilePath === ""
                ? APA_STYLE
                : fs.readFileSync(CSLFilePath, "utf-8");

        this.citeproc = new CSL.Engine(
            {
                retrieveLocale: (langTag: string) => {
                    return EN_US_LOCALE;
                },

                retrieveItem: (refId: string) => {
                    return DataStore.getReferenceById(refId);
                },
            },
            style
        );
    }

    /**
     * Sets the citation style that should be used for formatting references
     * Warning: This is a slow operation since it requires reading a file
     */
    public setStyle(CSLFilePath: string): void {
        this.init(CSLFilePath);
    }

    /**
     * Given an array of references,
     * returns cited version of the research references as an HTML string
     */
    public formatRefs(refIDs: string[]): string {
        this.citeproc.updateItems(refIDs);
        return this.citeproc.makeBibliography()[1].join("<br>");
    }
}
