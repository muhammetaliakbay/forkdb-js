import {Commit, Range} from "../core/commit";
import {Scanner} from "../core/scanner";
import {Position} from "../core/position";

class PositionImpl<T> implements Position<T> {
    constructor(
        readonly commitIndex: number,
        readonly position: Position<T>
    ) {
    }
}

interface RangeImpl<T> extends Range<T> {
    start?: PositionImpl<T>
    end?: PositionImpl<T>
}

export class JoinCommit<T> implements Commit<T> {
    constructor(
        readonly commits: Commit<T>[]
    ) {
    }

    count(range: RangeImpl<T>): number {
        const startCommitIndex = range.start?.commitIndex ?? 0
        const endCommitIndex = range.end?.commitIndex ?? this.commits.length

        let total = 0;
        for (let commitIndex = startCommitIndex; commitIndex < endCommitIndex; commitIndex ++) {
            const intersection = {
                ...range,
                start: commitIndex === startCommitIndex ? range.start?.position : undefined,
                end: commitIndex === endCommitIndex ? range.end?.position : undefined
            }
            total += this.commits[commitIndex].count(intersection)
        }

        return total
    }

    scan(scanner: Scanner<T>, range: RangeImpl<T>) {
        const startCommitIndex = range.start?.commitIndex ?? 0
        const endCommitIndex = range.end?.commitIndex ?? this.commits.length

        for (let commitIndex = startCommitIndex; commitIndex < endCommitIndex && scanner.continue(); commitIndex ++) {
            const intersection = {
                ...range,
                start: commitIndex === startCommitIndex ? range.start?.position : undefined,
                end: commitIndex === endCommitIndex ? range.end?.position : undefined
            }
            this.commits[commitIndex].scan({
                continue(): boolean {
                    return scanner.continue()
                },
                receive(position: Position<T>, value: T) {
                    scanner.receive(
                        new PositionImpl<T>(commitIndex, position),
                        value
                    )
                }
            }, intersection)
        }
    }
}
