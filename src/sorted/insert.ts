import {Commit} from "../core/commit";
import {locateSorted} from "./locate";
import {Comparator} from "./comparator";
import {append, insert} from "../util/add";

export function insertSorted<T>(base: Commit<T>, value: T, comparator: Comparator<T>): Commit<T> {
    const position = locateSorted(base, value, comparator)

    if (position == undefined) {
        return append(base, [value])
    } else {
        return insert(base, position, [value])
    }
}
