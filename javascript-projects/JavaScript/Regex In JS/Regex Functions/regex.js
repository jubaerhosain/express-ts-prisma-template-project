console.log("Regular Expression in JavaScript")

// Regex literal in JS
// let reg = /jubaer/;

// this is global identifier
// let reg = /jubaer/g;

// console.log(reg);
// console.log(reg.source);

// let str = "This is great jubaer with great jubaer boss. tik ho na jubaer vai??";

// // exec() return array object for true, null for no match
// let result = reg.exec(str);
// console.log(result);

// // after adding global identifier
// result = reg.exec(str);
// console.log(result);

// result = reg.exec(str);
// console.log(result);

// result = reg.exec(str);
// console.log(result);

// without global flag it always returns first matching position



// ==============================================
// i means case insensitive
// let reg = /jubaer/i;

// console.log(reg);
// console.log(reg.source);

// let str = "Jubaer is great jubaer with great jubaer boss. tik ho na jubaer vai??";

// // exec() return array for true, null for no match
// let result = reg.exec(str);
// console.log(result);
// // without global flag it always returns first matching position



// =============================================================
// test() returns true or false
// let reg = /jubaer/;

// console.log(reg);
// console.log(reg.source);

// let str = "Jubaer is great jubaer with great jubaer boss. tik ho na jubaer vai??";

// let result = reg.test(str);
// console.log(result);


// ====================================================================
// match() returns an array of results or null
// let reg = /jubaer/;

// g = global , helps to prints all matches
// let reg = /jubaer/g; 

// console.log(reg);
// console.log(reg.source);

// let str = "Jubaer is great jubaer with great jubaer boss. tik ho na jubaer vai??";

// let result = str.match(reg);
// console.log(result);



// ======================================================================
// search() returns index of first match or -1
// let reg = /jubaer/g; 

// console.log(reg);
// console.log(reg.source);

// let str = "Jubaer is great jubaer with great jubaer boss. tik ho na jubaer vai??";

// let result = str.search(reg);
// console.log(result);


// ====================================================================
// replace() replace all pattern
// global flag replaces all matches 
// else only replaces first match
let reg = /jubaer/g; 

console.log(reg);
console.log(reg.source);

let str = "Jubaer is great jubaer with great jubaer boss. tik ho na jubaer vai??";

let result = str.replace(reg, 'Muhammad Jubaer');
console.log(result);





