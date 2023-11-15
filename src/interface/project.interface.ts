export interface Moves {
    L: string;
    R: string;
    D: String;
}

export interface Directions {
    N: Moves;
    W: Moves;
    S: Moves;
    E: Moves;
}

export interface AxisElements {
    x: number;
    y: number;
}

export interface RoboDirectionRes extends AxisElements {
    dir: string;
}