import { Move } from "./move.model";

export interface User {
    _id: string,
    name: string,
    coins: number,
    moves: Move[]
}
