import { Reference } from "../model/reference.model";

/**
 * Given a reference as parameter, returns a JS Date object
 */
export function getDate (ref: Reference): Date {
    const raw = ref.issued["date-parts"][0];
    switch (raw.length) {
        case 1: return new Date(raw[0]);
        case 2: return new Date(raw[0], raw[1]);
        case 3: return new Date(raw[0], raw[1], raw[2]);
    }
    throw new Error("Invalid Date Object");
}

export function getDateYear (ref: Reference): number {
    try {
        return getDate(ref).getFullYear();
    } catch (e) {
        return null;
    }
}
