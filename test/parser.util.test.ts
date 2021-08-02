import { parse } from "../src/util/parser.util";
import { getDate } from "../src/util/get-date.util";
import { Reference } from "../src/model/reference.model";
import { promises as fs } from "fs";
import { join } from "path";

describe("Parser", () => {
    it("Correct Parsing", async () => {
        const raw: string = await fs.readFile(
            join(__dirname, "assets", "test.bib"),
            "utf-8"
        );

        const result: Reference[] = parse(raw);

        await fs.writeFile(
            join(__dirname, "assets", "test.json"),
            JSON.stringify(result)
        );

        // Validation
        expect(result).toBeInstanceOf(Array); // The result is an array of reference objects

        const firstItem = result[0];
        expect(firstItem).toHaveProperty("id", "Steinbeck2003");
        expect(firstItem).toHaveProperty("type", "article-journal");
        expect(firstItem).toHaveProperty(
            "title",
            "The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics."
        );
        expect(firstItem).toHaveProperty("author");
        expect(firstItem.author).toBeInstanceOf(Array);
        expect(firstItem.author.length).toBe(6);
        expect(firstItem).toHaveProperty("DOI", "10.1021/ci025584y");
        expect(firstItem).toHaveProperty(
            "URL",
            "http://www.ncbi.nlm.nih.gov/pubmed/12653513"
        );
        expect(firstItem).toHaveProperty("volume", "43");
        expect(firstItem).toHaveProperty("issue", "2");

        // Compare Dates
        const date = getDate(firstItem);
        expect(date.getFullYear()).toBe(2005);
        expect(date.getMonth()).toBe(2);
    });

    it("Invalid Format", () => {
        /// In the below example, there is no @ sign at the beginning
        const raw = `
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
