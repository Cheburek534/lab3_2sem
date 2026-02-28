const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');

const memoizeLRU = (fn, length = Infinity) => {
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

const sum = (...args) => args.reduce((a, b) => a + b, 0);
const lru = memoizeLRU(sum, 3);

lru(1, 2); 
lru(2, 3); 
lru(3, 4); 
lru(1, 2); 
lru(5, 6); 
console.log("LRU from cache", lru(1, 2)); 