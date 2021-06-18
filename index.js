const deleteProperty = require('core-js/library/fn/reflect/delete-property');

module.exports = function withProcessEnv(name, value) {
    return function (fn) {
        let old;

        // check to make sure process actually exists
        if (typeof process === 'undefined' || typeof process.env === 'undefined') {
            return fn(new Error('Unable to access process variable'));
        }

        if (!Object.getOwnPropertyDescriptor(process, 'env').writable) {
            return fn(new Error('process.env is not writable'));
        }

        // if the variable wasn't previously we need to remember to delete it later
        const wasDefined = name in process.env;

        try {
            old = process.env[name];
            process.env[name] = value;
        }
        catch (e) {
            return fn(e);
        }

        if (old === process.env[name]) {
            return fn(new Error('Unable to modify process env variable'));
        }

        const retVal = fn();

        if (wasDefined) {
            process.env[name] = old;
        }
        else {
            deleteProperty(process.env, name);
        }

        return retVal;
    };
}
