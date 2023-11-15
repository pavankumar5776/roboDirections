import { Directions, RoboDirectionRes, AxisElements } from "./interface/project.interface";
import { north, south, west, east } from "./utils";

const directions : Directions = {
    N: north,
    E: east,
    W: west,
    S: south,
}

export function roboDirection(moves: string, direction: string, xCo: number, yCo: number): RoboDirectionRes {
    let movesArr = moves.split('');
    let dir: string = direction;
    let x: number = xCo;
    let y: number = yCo;
    let finalResult: AxisElements;
    for(let i = 0 ; i < movesArr.length; i++){
        let step = movesArr[i];
        if(isNaN(parseInt(step))
        ){
            switch(step){
                case 'M':
                    finalResult = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
                case 'R':
                    dir = directions[dir].R;
                    finalResult = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
                case 'L':
                    dir = directions[dir].L;
                    finalResult = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
            }
        }
        else{
            finalResult = incrementXY(dir, step, x, y);
        }
        x = finalResult.x;
        y = finalResult.y;
    }
    return {dir, x, y};
}

function common(current: number, next: number, dir: string, x: number, y:number, movesArr: any[]): AxisElements{
    let result : AxisElements;
    if(current == next)
        result = incrementXY(dir, '1', x, y);
    else if(isNaN(parseInt(movesArr[current+1])))
        result = incrementXY(dir, '1', x, y);
    x = result && result.x || x;
    y = result && result.y || y;
    return {x, y};
}

function incrementXY(str: string , num: string, x: number , y: number): AxisElements{
    if(directions[str].D === 'X')
        x = x + parseInt(num);
    else
        y = y + parseInt(num);
    return {x, y};
}