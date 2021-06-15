import {Scanner} from "./scanner";
import {Position} from "./position";

export interface Range<T> {
    start?: Position<T>,
    end?: Position<T>,
    endExclusive?: boolean
}

export interface Commit<T> {
    scan(scanner: Scanner<T>, range: Range<T>)
    count(range: Range<T>): number
}
