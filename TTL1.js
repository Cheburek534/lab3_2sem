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
        cache.set(key, {res, time: Date.now()});
        return res;
    };
};
const sum = (...args) => args.reduce((a, b) => a + b, 0);
const ttl = memoizeTTL(sum, 100);
console.log(ttl(5, 5));
setTimeout(() => console.log("50ms: ", ttl(5, 5)), 50);
setTimeout(() => console.log("150ms: ", ttl(5, 5)), 150);
