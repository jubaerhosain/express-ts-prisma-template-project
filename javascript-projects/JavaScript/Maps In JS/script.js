console.log("Maps");

let map = new Map();

console.log(map);

const key1 = 'str', key2 = {}, key3 = function () { };

map.set(key1, 'str');
map.set(key2, "blankobj");
map.set(key3, "empty function");
console.log(map);

// console.log(map.get(key3));

// for(let [key, value] of map) {
//     console.log(key, value);
// }

// for(let key of map.keys()) {
//     console.log(key);
// }

// for(let value of map.values()) {
//     console.log(value);
// }

map.forEach((value, key) => {
    console.log(key, value);
});

let arr = Array.from(map);
console.log(arr);

let keys = Array.from(map.keys());
console.log(keys);

let values = Array.from(map.values());
console.log(values);