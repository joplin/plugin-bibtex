/**
 * This class is responsible for storing citation data and providing it when requested
 */
export class DataStore {
    
    /**
     * Array containing reference objects
     */
    private static references: any[] = [];

    /**
     * Private constructor to prevent the instantiation of this class
     */
    private constructor () { }
    
    /**
     * Sets the data to be stored in the references array
     * @param refs array of reference objects
     */
    public static setReferences (refs: any[]): void {
        this.references = [];

        /**
         * Why not just do 'this.references = refs'?
         * In this case, refs and this.references will point to the same object in memory,
         * so any changes applied to refs outside the class will be reflected in this.references and vice versa
         * This breaks encapsulation.
         * The safer option is to push every element from refs to this.references
         */
        refs.forEach(ref => this.references.push(ref));
    }

    /**
     * Given a search query, returns an array of reference objects that matches the query
     * Currently tests whether or not the "title" field is compatible with the query or not
     * @param query Search Query
     * @returns references matching the search criteria
     */
    public static search (query: string): any[] {
        return (
            this.references.
                filter(ref => ref["title"].includes(query))
        );
    }
}
