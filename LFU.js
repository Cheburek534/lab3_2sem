const argKey = x => x.toString() + ':' + typeof x;
const generateKey = args => args.map(argKey).join('|');

const memoizeLFU = (fn, length = INfinity) => {
    const cache = new Map();
    const count = new Map();
    return (...args) => {
        const key = generateKey(args);

        if(cache.has(key)) {
            count.set(key, count.get(key) + 1);
            return cache.get(key);
        }

        if(cache.size >= length) {
            const lfuKey = [...count.entries()].reduce((a,b) => a[1] < b[1] ? a : b)[0];
            console.log('LFU Delete:', lfuKey, `(count: ${count.get(lfuKey)})`);
            cache.delete(lfuKey);
            count.delete(lfuKey);
        }
        const res = fn(...args);
        cache.set(key, res);
        count.set(key, 1);
        return res;
    };
};

const sum = (...args) => args.reduce((a, b) => a + b, 0);
const lfu = memoizeLFU(sum, 3);

lfu(1, 2); lfu(1, 2); lfu(1, 2); 
lfu(2, 3);                       
lfu(3, 4);                       
lfu(4, 5); 
console.log("LFU from cache:", lfu(1, 2)); 