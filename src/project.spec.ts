import { readFile, writeFile } from './project';

describe('Testing roboDirection', () => {
    it('testing final robo direction success', async () => {
        expect.assertions(1);
        await expect(readFile('./src/input.txt')).resolves.toEqual({dir: 'N', x: 5, y: 6});
    })

    it('testing robo direction invalid moves', async () => {
        expect.assertions(1);
        await expect(readFile('./src/input2.txt')).rejects.toThrow('Invalid moves line 2 in txt file');
    })

    it('testing robo direction invalid position', async () => {
        expect.assertions(1);
        await expect(readFile('./src/input1.txt')).rejects.toThrow('Invalid position line 1 in txt file');
    })

    it('testing robo direction invalid writeFile', async () => {
        expect.assertions(1);
        await expect(writeFile('./src/')).rejects.toThrow('Failed writing file.');
    })
});