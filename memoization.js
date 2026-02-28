//memoize from example
const argKey = x => x.toString() + ':' + typeof x;
const genKey = args => args.map(argKey).join('|');

const memoize = (fn, length) => {
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

const max = (...args) => Math.max(...args);
const memoMax = memoize(max, 2);

console.log(memoMax(1, 2, 3));    
console.log(memoMax(1, 2, 3));    
console.log(memoMax(4, 5, 6));    
console.log(memoMax(7, 8, 9));    
console.log(memoMax(10, 11, 12)); 