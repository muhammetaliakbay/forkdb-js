import {expect} from 'chai'
import {ArrayCommit} from "../memory/array-commit";
import {scanToArray} from "../util/to-array";
import * as Chance from "chance";

const chance = Chance()

describe('Memory/ArrayCommit', () => {
    it('should return 0 as count for empty array', async () => {
        const array: number[] = []
        const commit = new ArrayCommit(array)

        expect(commit.count({})).eq(0)
    })

    it('should populate an empty array for empty array commit', async () => {
        const array: number[] = []
        const commit = new ArrayCommit(array)

        expect(scanToArray(commit)).eql(array)
        expect(scanToArray(commit)).to.be.empty
    })

    it('should return correct count', async () => {
        const array = chance.n(chance.name, chance.integer({min: 10, max: 25}))
        const commit = new ArrayCommit(array)

        expect(commit.count({})).eq(array.length)
    })

    it('should return correct values', async () => {
        const array = chance.n(chance.name, chance.integer({min: 10, max: 25}))
        const commit = new ArrayCommit(array)

        expect(scanToArray(commit).map(([pos, val]) => val)).eql(array)
    })
})
