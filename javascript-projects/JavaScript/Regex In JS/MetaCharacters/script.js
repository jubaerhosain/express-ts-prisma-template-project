console.log("MetaCharacters");

// ^ means start with md and
// $ means end with md
// let reg = /^md$/;

// . means match with any single character
// let reg = /j.b/;

// * matches 0 or more character before 're'
// j is not considered here...may be or may not be present
// let reg = /j*re/;

// ? means option character
// here a and d are optional
// let reg = /juba?erd?/;

// * not a meta character here
// it's acts like general character
// let reg = /j\*baer/;


let reg = /j\*baer/;

let str = "md jabaer hosain";
let res = reg.exec(str);

console.log(res);