import { Author } from "./author.model";

export interface Reference {
    id: string,
    title: string,
    author: Author[],
    type: string,
    DOI?: string,
    URL?: string,
    publisher?: string,
    "publisher-place"?: string,
    edition?: string,
    volume?: string,
    issue?: string,
    page?: string,
    issued: { "date-parts": number[][] },
    date?: {            // Optional alias for issued with better format
        year: number,
        month?: number,
        day?: number
    }
}
