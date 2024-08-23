console.log("Charset");

// match with any character between a to z
// const reg = /ha[a-z]b/;
// match with a or c or d or e
// const reg = /ha[acde]b/;

// match is not j or not s or not k
// const reg = /ha[^jsk]b/;

// match any character between the ranges
// const reg = /ha[a-zA-Z0-9]b/;

// {} is called quantifiers
// const reg = /ha[a-zA-Z0-9]{1,3}b/;
// a can occur 0, 1, 2 or 3 times
// const reg = /ha{0,3}b/;

// () is used for groupings
// (ha) can occur 0, 1, 2 or 3 times
const reg = /(ha){0,3}b/;

const str = "haabb sdfasfsagghasas";

let res = reg.exec(str);
console.log(res);