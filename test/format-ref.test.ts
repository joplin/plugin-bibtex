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

        expect(result).toBe("[@Steinbeck2005](http://dx.doi.org/10.1021/ci025584y)");
    });

    it("Format a reference having a URL without a DOI", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );
        const result = formatReference(data[1]);

        expect(result).toBe("[@Bu2010](http://www.aclweb.org/anthology/D10-1109)");
    });

    it("Format a reference with neither URL nor DOI", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );

        const result = formatReference(data[2]);
        
        expect(result).toBe("[@Smith2005](https://scholar.google.com/scholar?q=MedTag:%20A%20Collection%20of%20Biomedical%20Annotations,%20Smith)");
    });

});
