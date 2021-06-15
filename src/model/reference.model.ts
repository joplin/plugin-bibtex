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
}
