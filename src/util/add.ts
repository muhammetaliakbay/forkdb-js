import {Commit} from "../core/commit";
import {Position} from "../core/position";
import {RangeCommit} from "../memory/range-commit";
import {ArrayCommit} from "../memory/array-commit";
import {JoinCommit} from "../memory/join-commit";

export function insert<T>(base: Commit<T>, position: Position<T>, values: T[]): Commit<T> {
    const left = new RangeCommit(base, {end: position, endExclusive: true})
    const middle = new ArrayCommit(values)
    const right = new RangeCommit(base, {start: position})

    return new JoinCommit([left, middle, right])
}

export function append<T>(base: Commit<T>, values: T[]): Commit<T> {
    const appendix = new ArrayCommit(values)

    return new JoinCommit([base, appendix])
}
