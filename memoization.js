//memoize from example
const argKey = x => x.toString() + ':' + typeof x;
const genKey = args => args.map(argKey).join('|');

const memoize = (fn, lendth) => {
    const cache = new Map();

    return(...args) => {
        const key = genKey(args);
        console.log(`${fn.name}(${key}) call`);
        if(cache.has(key)) return cache.get(key);
        const res = fn(...args);

        if(cache.size >= length) {
            const Key1 = cache.keys().next().value;
            console.log('Delete key:', Key1);
            cache.delete(Key1);
        }

        cache.set(key, res);
        return res;
    };
};