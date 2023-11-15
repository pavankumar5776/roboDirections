import { RoboDirectionRes } from "./interface/project.interface";
import { roboDirection } from './roboDirection';
import {promises as fsPromises, write} from 'fs';


export async function readFile (inputFile: string): Promise<RoboDirectionRes> {
    try {
        const result = await fsPromises.readFile(inputFile,'utf-8')
        const re = result.split(/\r?\n/);
        const moves: string = re[1];
        if(!isNaN(parseInt(moves[0])))
            throw new Error('Invalid moves line 2 in txt file')
        const intial: Array<any> = [];
        if(!isNaN(parseInt(re[0])))
            throw new Error('Invalid position line 1 in txt file')
        for(let i = 0 ; i < re[0].length ; i++){
            if(re[0][i] != ' ')
                intial.push(isNaN(parseInt(re[0][i])) ? re[0][i] : parseInt(re[0][i]));
        }
        let [dir, x, y] = [...intial];
        let finalPosition = roboDirection(moves, dir, x, y);
        return finalPosition;
    } catch (error) {
        throw new Error(error);
    }
}

export async function writeFile(outputFile: string) {
    try{
        let writeContentJson: RoboDirectionRes = await readFile('./src/input.txt');
        let writeContent: string = Object.values(writeContentJson).join(' ');
        await fsPromises.writeFile(outputFile, writeContent);
    }catch(error){
        throw new Error('Failed writing file.');
    }
}
writeFile('./src/output.txt');