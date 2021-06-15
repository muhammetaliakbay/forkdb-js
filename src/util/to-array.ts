import {Commit, Range} from "../core/commit";
import {Position} from "../core/position";

export function scanToArray<T>(commit: Commit<T>, range: Range<T> = {}): [position: Position<T>, value: T][] {
    const array: [Position<T>, T][] = []
    commit.scan(
        {
            receive(position: Position<T>, value: T) {
                array.push([position, value])
            },
            continue(): boolean {
                return true
            }
        },
        range
    )
    return array
}

export function scanValuesToArray<T>(commit: Commit<T>, range?: Range<T>): T[] {
    return scanToArray(commit, range).map(
        ([pos, val]) => val
    )
}
