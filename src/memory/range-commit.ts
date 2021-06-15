import {Commit, Range} from "../core/commit";
import {Scanner} from "../core/scanner";

export class RangeCommit<T> implements Commit<T> {
    constructor(
        readonly base: Commit<T>,
        readonly range: Range<T>
    ) {
    }

    count(range: Range<T>): number {
        const intersection = {...this.range, ...range}
        return this.base.count(intersection)
    }

    scan(scanner: Scanner<T>, range: Range<T>) {
        const intersection = {...this.range, ...range}
        this.base.scan(scanner, intersection)
    }
}
