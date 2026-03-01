const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');

const memoizeTTL = (fn, ttlMs = Infinity) => {
    const cache = new Map();

    return(...args) => {
        const key = generateKey(args);
        const now = Date.now();

        if(cache.has(key)) {
            const {res, time} = cache.get(key);
            if(now - time < ttlMs) return res;
            console.log('TTL expired: ', key);
            cache.delete(key);
        }
        const res = fn(...args);
        cache.set(key, {res, time: Date.noe()});
        return res;
    };
};