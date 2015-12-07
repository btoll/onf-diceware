(() => {
    'use strict';

    let crypto = require('crypto'),
        wordlist = require('./lib/wordlist'),
        diceware;

    diceware = {
        /**
         * The default size of the generated passphrase.
         */
        size: 6,

        getKey: (n) => {
            let res;

            if (n < 1) {
                return '';
            }

            res = [];
            // We always want 5-digit keys.
            n = n || 5;
            res.push(new Uint32Array(crypto.randomBytes(1))[0] % 6 + 1);

            return res.concat(diceware.getKey(--n)).join('');
        },

        /**
         * Either pass in a number to use as the passphrase length or set `diceware.size`
         * to the preferred default.
         */
        getPassphrase: (n) => {
            let res;

            if (n < 1) {
                return '';
            }

            res = [];
            n = n || diceware.size;
            res.push(diceware.getWord());

            return res.concat(diceware.getPassphrase(--n)).join(' ');
        },

        getWord: () => {
            return wordlist[diceware.getKey()];
        }
    };

    diceware.generate = diceware.getPassphrase;

    module.exports = diceware;
})();

