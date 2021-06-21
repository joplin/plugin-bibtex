import { formatReference } from "../src/util/format-ref.util";
import { Reference } from "../src/model/reference.model";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { parse } from "../src/util/parser.util";

describe("Format Reference Util", () => {

    it("Format a reference with a DOI", () => {
        const data: Reference[] = JSON.parse(readFileSync(join(__dirname, "assets", "test.json"), "utf-8"));

        const result = formatReference(data[0]);

        expect(result).toBe("[@Steinbeck2003](http://dx.doi.org/10.1021/ci025584y)");
    });

    it("Format a reference having a URL without a DOI", () => {
        const data: Reference[] = JSON.parse(readFileSync(join(__dirname, "assets", "test.json"), "utf-8"));

        const result = formatReference(data[1]);

        expect(result).toBe("[@Bu2010](http://www.aclweb.org/anthology/D10-1109)");
    });

    it("Format a reference with neither URL nor DOI", () => {
        const data: Reference[] = parse(readFileSync(join(__dirname, "assets", "test.bib"), "utf-8"));

        const result = formatReference(data[2]);
        
        expect(result).toBe("[@Smith2005](https://scholar.google.com/scholar?q=MedTag:+A+Collection+of+Biomedical+Annotations,+Smith)");
    });

});
