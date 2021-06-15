import {Commit} from "../core/commit";
import {Comparator} from "./comparator";
import {findPosition} from "../util/find";
import {Position} from "../core/position";

export function locateSorted<T>(base: Commit<T>, subject: T, comparator: Comparator<T>): Position<T> | undefined {
    return findPosition(base, val => comparator(subject, val) <= 0)
}
