'use strict';

describe('diceware', () => {
    let diceware = require('../index');

    function isString(str) {
        return Object.prototype.toString.call(str) === '[object String]';
    }

    describe('.size', () => {
        it('should have a default passphrase size of six', () => {
            expect(diceware.size).toBe(6);
        });

        it('should allow the passphrase size to be changed', () => {
            diceware.size = 8;
            expect(diceware.size).toBe(8);
        });

        it('should not allow a negative size passphrase', () => {
            expect(() => {
                diceware.size = -5;
            }).toThrow();
        });
    });

    describe('#generate', () => {
        it('should be an alias of #getPassphrase', () => {
            expect(diceware.generate).toBe(diceware.getPassphrase);
        });
    });

    describe('#getPassphrase', () => {
        it('should return a string', () => {
            expect(isString(diceware.getPassphrase())).toBe(true);
        });

        it('should return an empty passphrase when passed a size argument of zero', () => {
            expect(diceware.getPassphrase(0)).toBe('');
        });

        it('should return an empty passphrase when passed a negative size argument', () => {
            expect(diceware.getPassphrase(-5)).toBe('');
        });

        it('should return a passphrase equal to the current size value when not passed an argument', () => {
            expect((diceware.getPassphrase().trim()).split(' ').length).toBe(diceware.size);
        });
    });

    describe('#getWord', () => {
        it('should return a string', () => {
            expect(isString(diceware.getWord())).toBe(true);
        });

        it('should return a single word', () => {
            expect(diceware.getWord().split(' ').length).toBe(1);
        });
    });
});

