import { DataStore } from "../src/data/data-store";
import { Reference } from "../src/model/reference.model";
import { promises as fs } from "fs";
import { join } from "path";

describe("Data Store", () => {
    it("Calling SetReference() updates the data in the store", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );
        DataStore.setReferences(data);

        const res: Reference[] = DataStore.getAllReferences();

        expect(res).toBeInstanceOf(Array);

        // Asserts Deep Equality between input and internal data
        expect(res).toEqual(data);
    });

    it("getReferenceById() returns the reference that matches the id", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );
        DataStore.setReferences(data);

        const refId = DataStore.getAllReferences()[0].id;
        const ref: Reference = DataStore.getReferenceById(refId);

        expect(ref).toEqual(DataStore.getAllReferences()[0]);
    });

    it("getReferenceById() throws error when the reference is not found", async () => {
        const data: Reference[] = JSON.parse(
            await fs.readFile(join(__dirname, "assets", "test.json"), "utf-8")
        );
        DataStore.setReferences(data);

        const refId = "someRandomId";

        expect(() => DataStore.getReferenceById(refId)).toThrow();
    });
});
