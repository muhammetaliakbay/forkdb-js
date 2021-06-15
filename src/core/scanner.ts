import {Position} from "./position";

export interface Scanner<T> {
    continue(): boolean
    receive(position: Position<T>, value: T): void
}
