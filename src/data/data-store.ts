import { Reference } from "../model/reference.model";

/**
 * This class is responsible for storing citation data and providing it when requested
 */
export class DataStore {

    /**
     * Array containing reference objects
     */
    private static references: Reference[] = [];

    /**
     * Private constructor to prevent the instantiation of this class
     */
    private constructor () { }

    /**
     * Sets the data to be stored in the references array
     */
    public static setReferences (refs: Reference[]): void {
        this.references = refs;
    }

    /**
     * Returns all the stored references
     */
    public static getAllReferences (): Reference[] {
        return this.references;
    }

    /**
     * Gets a single reference using its id
     */
    public static getReferenceById (id: string): Reference {
        const n = this.references.length;
        for (let i = 0; i < n; i++) {
            if (this.references[i].id === id) return this.references[i];
        }
        throw new Error("Reference not found");
    }

    /**
     * Given a search query, returns an array of reference objects that matches the query
     * Currently tests whether or not the "title" field is compatible with the query or not
     * Compatible means that the search query is an exact substring of the "title" field, which will be improved later
     * @param query Search Query
     */
    public static search (query: string): Reference[] {
        return (
            this.references.
                filter(ref => ref.title.includes(query))
        );
    }
}
