/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { Settings } from '../server';

describe('Settings:server', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    // afterEach(async () => {
    // });
    it('should find options', async () => {
        process.env.OPTION__SNAKE = '1';
        process.env['option.dotted'] = '2';

        const settings = new Settings();
        expect(await settings.get('OPTION__SNAKE')).toEqual('1');
        expect(await settings.get('option.dotted')).toEqual('2');
        expect(await settings.get('option.snake')).toEqual('1');
        expect(await settings.get('unknown.option', 10)).toEqual(10);
        expect(await settings.get('another.unknown.option')).toEqual(null);
    });
});
