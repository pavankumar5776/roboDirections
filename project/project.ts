import { Directions } from "./interface/project.interface";
import { north, south, west, east } from "./utils";
import {promises as fsPromises} from 'fs';

const directions : Directions = {
    N: north,
    E: east,
    W: west,
    S: south,
}

async function readFile(inputFile,outputFile){
    try {
        const result = await fsPromises.readFile(inputFile,'utf-8')
        const re = result.split(/\r?\n/);
        const moves: string = re[1];
        if(!isNaN(parseInt(moves[0])))
            throw new Error('Invalid moves line 2 in txt file')
        const intial: Array<any> = [];
        if(!isNaN(parseInt(re[0])) && (isNaN(parseInt(re[0][0]))))
            throw new Error('Invalid position line 1 in txt file')
        for(let i = 0 ; i < re[0].length ; i++){
            if(re[0][i] != ' ')
                intial.push(isNaN(parseInt(re[0][i])) ? re[0][i] : parseInt(re[0][i]));
        }
        let [dir, x, y] = [...intial];
        let finalPosition = roboDirection(moves, dir, x, y);
        console.log(finalPosition.join(' '));
        await fsPromises.writeFile(outputFile,finalPosition.join(' '))
    } catch (error) {
        console.log(error);
    }
}
readFile('./input.txt','./output.txt');

function roboDirection(moves: string, direction: string, xCo: number, yCo: number): [string, number, number] {
    let movesArr = moves.split('');
    let dir: string = direction;
    let x: number = xCo;
    let y: number = yCo;
    for(let i = 0 ; i < movesArr.length; i++){
        let step = movesArr[i];
        if(isNaN(parseInt(step))
        ){
            switch(step){
                case 'M':
                    [x, y] = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
                case 'R':
                    dir = directions[dir].R;
                    [x, y] = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
                case 'L':
                    dir = directions[dir].L;
                    [x, y] = common(i, movesArr.length-1, dir, x, y, movesArr);
                    break;
            }
        }
        else{
            [x, y] = incrementXY(dir, step, x, y);
        }
    }
    return [dir, x, y];
}

function common(current: number, next: number, dir: string, x: number, y:number, movesArr: any[]): [number, number]{
    if(current == next)
        [x, y] = incrementXY(dir, '1', x, y);
    else if(isNaN(parseInt(movesArr[current+1])))
        [x, y] = incrementXY(dir, '1', x, y);
    return [x, y]
}

function incrementXY(str: string , num: string, x: number , y: number): [number, number]{
    if(directions[str].D === 'X')
        x = x + parseInt(num);
    else
        y = y + parseInt(num);
    return [x, y];
}