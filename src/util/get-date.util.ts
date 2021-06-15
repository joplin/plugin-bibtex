import { Reference } from "../model/reference.model";

/**
 * Given a reference as parameter, returns a JS Date object
 */
export function getDate (ref: Reference): Date {
    let raw = ref.issued["date-parts"][0];
    let res: Date = new Date();
    if (raw[0] !== null) res.setFullYear(raw[0]);       // Year
    if (raw[1] !== null) res.setMonth(raw[1]);          // Month
    return res;
}
