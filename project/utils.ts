import { Moves } from "./interface/project.interface";

export const north : Moves = {
    L: 'W',
    R: 'E',
    D: 'Y',
}
export const west : Moves = {
    L: 'S',
    R: 'N',
    D: 'X',
}
export const south : Moves = {
    L: 'E',
    R: 'W',
    D: 'Y',
}
export const east : Moves = {
    L: 'N',
    R: 'S',
    D: 'X',
}