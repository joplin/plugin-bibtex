import { fromRefToAPA } from "../src/util/apa.util";
import { Reference } from "../src/model/reference.model";
import { promises as fs } from "fs";
import { join } from "path";

describe("APA Util", () => {
    it("Convert json reference to APA format", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );

        const result: string = fromRefToAPA(data[0]).trim();
        // console.log(`(${result})`);
        const html: string = `<div class="csl-bib-body">
  <div data-csl-entry-id="Steinbeck2003" class="csl-entry">Steinbeck, C., Han, Y., Kuhn, S., Horlacher, O., Luttmann, E., &#38; Willighagen, E. (2005). The Chemistry Development Kit (CDK): an open-source Java library for Chemo- and Bioinformatics. <i>Journal of Chemical Information and Computer Sciences</i>, <i>43</i>(2), 493–500. https://doi.org/10.1021/ci025584y</div>
</div>`;

        expect(result).toBe(html);
    });
});
