const expect = require('chai').expect;

const withProcessEnv = require('../index');

describe('withProcessEnv', () => {
    const LOL = 'LOL';
    const KEK = 'KEK';
    const LEL = 'LEL';
    const withLolLol = withProcessEnv(LOL, LOL);
    const withLelKek = withProcessEnv(LEL, KEK);

    describe('undefined environment variables', function () {
        it('should do the thing', function () {
            expect(withLolLol(function (err) {
                if (err) {
                    throw err;
                }

                return process.env[LOL];
            })).to.equal(LOL);
        });

        it('should remove after', function () {
            expect(process.env[LOL]).to.be.undefined;
        });
    });

    process.env[LEL] = LEL;

    describe('already defined environment variables', function () {
        it('should do the thing', function () {
            expect(withLelKek(function (err) {
                if (err) {
                    throw err;
                }

                return process.env[LEL];
            })).to.equal(KEK);
        });

        it('should restore previous value after', function () {
            expect(process.env[LEL]).to.equal(LEL);
        });
    });
});
