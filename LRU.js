const memorizeLRU = (fn, length = Infinity) => {
    const cache = new Map();
    return(...args) => {
        const key = generateKey(args);

        if(cache.has(key)) {
            const val = cache.get(key);
            cache.delete(key);
            cache.set(key, val);
            return val;
        }
        if(cache.size >= length) {
            const keyLRU = cache.keys().next().value;
            console.log('Delete LRU: ', keyLRU);
            cache.delete(keyLRU);
        }
        const res = fn(...args);
        cache.set(key, res);
        return res;
    };
};