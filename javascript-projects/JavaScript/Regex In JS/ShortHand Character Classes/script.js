console.log("this is shorthand");

// \w means word character = _ or alphabets or numbers only
// this regex means \w matches with only one word character 
// \w matches with d here
// let reg = /\wabc/;
// let str = "dabc def ghijkl mno";


// one or more word character and then a1k
// let reg = /\w+a1k/;
// let str = "dabcde8*fghijkla1k mno";


// capital \W means match with non-word character
// \W matches with non-word character &
// let reg = /\Wa1k/;
// let str = "dabcde8*fghijkl$a1k mno";

// \d matches with a single digit
// matches with 9
// let reg = /\da1k/;
// let str = "dabcde8*fghijkl9a1k mno";

// \D matches with not-digit character
// matches with t
// let reg = /\Da1k/;
// let str = "dabcde8*fghijklRta1k mno";

// \s matches with a single whitespace
// let reg = /\sa1k/;
// let str = "dabcde8*fghijkl   a1k mno";

// \S matches with a single non-whitespace character
//matches with l
// let reg = /\Sa1k/;
// let str = "dabcde8*fghijkla1k mno";


// \b charters before it should be the last characters of that particular word
// sohoj vashay = the character befor it should be word-boundary
// always works for the characters that's are before óf it
// let reg = /a1k\b/;
// let str = "dabcde8*fghijkla1k mno";

// assertions, most important topic
// // there should r after h
// let reg = /h(?=r)/;
// let str = "dabcde8*fgh9rrijkla1khr mno";

// there should not r after h
let reg = /h(?!r)/;
let str = "dabcde8*fgh9rrijkla1khr mno";

let res = reg.exec(str);
console.log(res);