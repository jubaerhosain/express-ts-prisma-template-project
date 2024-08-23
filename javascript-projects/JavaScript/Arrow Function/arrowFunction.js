console.log('This is Arrow Function in JavaScript');

// function printName() {
//     console.log("Muhammad Jubaer");
// }

// const printName = function() {
//     console.log("Muhammad Jubaer");
// }

// const printName = () => {
//     console.log("Muhammad Jubaer");
// }

// printName();

// const greet = () => {
//     return "Hi!";
// }

// one liner dosen't need braces
// returns automatically
// const greet = () => "Hi!";

// to return object need parenthesis
// const greet = () => ({name: 'Muhammad Jubaer'});

// single argument dosen't need parenthesis
// const greet = name => "Assalamualaikum " + name;

// multiple argument needs parenthesis
const greet = (name, religion) => name + " is a " + religion;

console.log(greet("Muhammad Jubaer", "Muslim"));