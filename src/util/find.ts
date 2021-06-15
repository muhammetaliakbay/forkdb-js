import {Commit, Range} from "../core/commit";
import {Position} from "../core/position";

export function find<T>(commit: Commit<T>, predicate: (val: T) => boolean, range: Range<T> = {}): [position: Position<T>, value: T] | [position: undefined, value: undefined] {
    let foundPosition: Position<T> | undefined
    let foundValue: T | undefined
    commit.scan(
        {
            receive(position: Position<T>, value: T) {
                if (predicate(value)) {
                    foundPosition = position
                    foundValue = value
                }
            },
            continue(): boolean {
                return foundPosition == undefined
            }
        },
        range
    )

    return [foundPosition, foundValue]
}

export function findPosition<T>(commit: Commit<T>, predicate: (val: T) => boolean, range?: Range<T>): Position<T> | undefined {
    return find(commit, predicate, range)[0]
}

export function findValue<T>(commit: Commit<T>, predicate: (val: T) => boolean, range?: Range<T>): T | undefined {
    return find(commit, predicate, range)[1]
}
