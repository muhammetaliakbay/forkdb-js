import {Commit, Range} from "../core/commit";
import {Scanner} from "../core/scanner";
import {Position} from "../core/position";

class PositionImpl<T> implements Position<T> {
    constructor(
        readonly index: number
    ) {
    }
}

interface RangeImpl<T> extends Range<T> {
    start?: PositionImpl<T>
    end?: PositionImpl<T>
}

export class ArrayCommit<T> implements Commit<T> {
    constructor(
        readonly array: T[]
    ) {
    }

    scan(scanner: Scanner<T>, range: RangeImpl<T>) {
        const startIndex = range.start?.index ?? 0
        let endIndex = range.end?.index ?? this.array.length
        if (range.endExclusive) {
            endIndex --;
        }

        for (let i = startIndex; i < endIndex && scanner.continue(); i ++) {
            const pos = new PositionImpl(i)
            scanner.receive(pos, this.array[i])
        }
    }

    count(range: RangeImpl<T>): number {
        const startIndex = range.start?.index ?? 0
        let endIndex = range.end?.index ?? this.array.length
        if (range.endExclusive) {
            endIndex --;
        }

        return endIndex - startIndex
    }
}
