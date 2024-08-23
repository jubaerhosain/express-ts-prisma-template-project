console.log("Sets");

// let set = new Set();

// set.add('asfas');
// set.add(1);
// set.add("abcd");
// set.add('asfas');

// console.log(set);

let set1 = new Set([3,355,5443,6467,324643, 'sasdf']);
// console.log(set1);
// console.log(set1.has(3));


// set1.delete('sasdf');
// console.log(set1);

for(let item of set1) {
    console.log(item);
}

set1.forEach((item) => {
    console.log(item);
});

let array = Array.from(set1);
console.log(array);