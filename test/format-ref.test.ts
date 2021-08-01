import { formatReference } from "../src/util/format-ref.util";
import { Reference } from "../src/model/reference.model";
import { promises as fs } from "fs";
import { join } from "path";

describe("Format Reference Util", () => {
    it("Format a reference with a DOI", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );

        const result = formatReference(data[0]);

        expect(result).toBe(
            "[@Steinbeck2003](http://dx.doi.org/10.1021%2Fci025584y)"
        );
    });

    it("Format a reference having a URL without a DOI", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );
        const result = formatReference(data[1]);

        expect(result).toBe(
            "[@bu-EtAl:2010:EMNLP](http://www.aclweb.org/anthology/D10-1109)"
        );
    });

    it("Format a reference with neither URL nor DOI", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );

        const result = formatReference(data[2]);

        expect(result).toBe(
            "[@smith-EtAl:2005:Biolink](https://scholar.google.com/scholar?q=MedTag%3A%20A%20Collection%20of%20Biomedical%20Annotations%2C%20Smith)"
        );
    });
});
