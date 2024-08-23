// let numbers = [1, 2, 4, 5];

// for (let index = 0; index < numbers.length; index++) {
//     const element = numbers[index];
//     console.log(element);
// }


// obj = {
//     name: 'Jubaer',
//     location: 'Dhaka',
//     language: "Bangla"
// }

// // for (let index = 0; index < Object.keys(obj).length; index++) {
// //     const key = Object.keys(obj)[index];
// //     const element = obj[key];
// //     console.log(key + ":" + element);
// // }

// for(let key in obj) {
//     console.log(obj[key]);
//     // not working
//     // console.log(obj.key);
// }

let str = ['abcd', 'efgh', 'ijkl'];
// giving index
for(let char in str)
    console.log(str[char]);

// giving key values
for(let word of str)
    console.log(word);




