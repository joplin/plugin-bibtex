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
     * Runs in O(n), where n = this.references.length
     * @param refs array of reference objects
     */
    public static setReferences (refs: Reference[]): void {
        this.references = [];

        /*
          Why not just do 'this.references = refs'?
          In this case, refs and this.references will point to the same object in memory,
          so any changes applied to refs outside the class will be reflected in this.references and vice versa
          This violates encapsulation and might cause unexpected behavior.
          The safer option is to push every element from refs to this.references
         */
        refs.forEach(ref => this.references.push(ref));
    }

    /**
     * Returns all the stored references
     * Runs in O(n), where n = this.references.length
     */
    public static getAllReferences (): Reference[] {
        /*
          Why not just return this.references?
          Because of the same reason illustrated above in setReferences()
         */
        return this.search("");
    }

    /**
     * Given a search query, returns an array of reference objects that matches the query
     * Currently tests whether or not the "title" field is compatible with the query or not
     * Compatible means that the search query is an exact substring of the "title" field, which will be improved later
     * @param query Search Query
     * @returns references matching the search criteria
     */
    public static search (query: string): Reference[] {
        return (
            this.references.
                filter(ref => ref.title.includes(query))
        );
    }
}
