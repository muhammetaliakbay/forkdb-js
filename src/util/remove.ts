import {Commit} from "../core/commit";
import {Position} from "../core/position";
import {RangeCommit} from "../memory/range-commit";
import {ArrayCommit} from "../memory/array-commit";
import {JoinCommit} from "../memory/join-commit";

export function remove<T>(base: Commit<T>, start: Position<T> | undefined, end: Position<T> | undefined): Commit<T> {
    if (start == undefined && end == undefined) {
        return new ArrayCommit<T>([])
    } else {
        if (start == undefined) {
            return new RangeCommit(base, {start: end})
        } else if (end == undefined) {
            return new RangeCommit(base, {end: start, endExclusive: true})
        } else {
            const left = new RangeCommit(base, {end: start, endExclusive: true})
            const right = new RangeCommit(base, {start: end})

            return new JoinCommit([left, right])
        }
    }
}
