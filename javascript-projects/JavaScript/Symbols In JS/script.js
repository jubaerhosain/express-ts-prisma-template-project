console.log("Symbols");

// Symbol is a premitive datatype
// cannot use new keyword

const symb1 = Symbol('e4tq3tg');
const symb2 = Symbol('e4tq3tg');
console.log(symb1 == symb2);


// double equals makes same type first
const a = 2;
const b = '2';
console.log(a == b);

// dosen't converts type to same
const c = 2;
const d = '2';
console.log(c === d);



