import { readFileSync, writeFileSync } from "fs";
import { parse } from "../src/util/parser.util";
import { join } from "path";

describe("Parser", () => {

    it("Correct Parsing", () => {
        let raw = readFileSync(join(__dirname, "assets", "test.bib"), "utf-8");
        let result = parse(raw);

        // Validation
        expect(result).toBeInstanceOf(Array);             // The result is an array of reference objects
        
        let firstItem = result[0];
        expect(firstItem).toHaveProperty("id", "Steinbeck2003");
        expect(firstItem).toHaveProperty("type", "article-journal");
        expect(firstItem).toHaveProperty("title", "The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics.");
        expect(firstItem).toHaveProperty("author");
        expect(firstItem.author.length).toBe(6);
        expect(firstItem["volume"]).toBe("43");
    });

    it("Invalid Format", () => {
        /// In the below example, there is no @ sign at the beginning
        let raw = `
        article{Steinbeck2003,
            author = {Steinbeck, Christoph and Han, Yongquan and Kuhn, Stefan and Horlacher, Oliver and Luttmann, Edgar and Willighagen, Egon},
            year = {2003},
            month = {10},
            title = {{The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics.}},
            journal = {Journal of chemical information and computer sciences},
            volume = {43},
            number = {2},
            pages = {493--500},
            doi = {10.1021/ci025584y},
            isbn = {2214707786},
            issn = {0095-2338},
            pmid = {12653513},
            url = {http://www.ncbi.nlm.nih.gov/pubmed/12653513}
          }
        `;

        /**
         * Note: You must wrap the code in a function,
         * otherwise the error will not be caught and the assertion will fail.
         * https://jestjs.io/docs/expect#tothrowerror
         */
        expect(() => parse(raw)).toThrow();
    });

});
