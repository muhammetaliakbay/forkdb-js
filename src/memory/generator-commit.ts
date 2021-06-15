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

export class GeneratorCommit<T> implements Commit<T> {
    constructor(
        readonly length: number,
        readonly generator: (index: number) => T
    ) {
    }

    scan(scanner: Scanner<T>, range: RangeImpl<T>) {
        const startIndex = range.start?.index ?? 0
        let endIndex = range.end?.index ?? this.length
        if (range.endExclusive) {
            endIndex --;
        }

        for (let i = startIndex; i < endIndex && scanner.continue(); i ++) {
            const pos = new PositionImpl(i)
            scanner.receive(pos, this.generator(i))
        }
    }

    count(range: RangeImpl<T>): number {
        const startIndex = range.start?.index ?? 0
        let endIndex = range.end?.index ?? this.length
        if (range.endExclusive) {
            endIndex --;
        }

        return endIndex - startIndex
    }
}
