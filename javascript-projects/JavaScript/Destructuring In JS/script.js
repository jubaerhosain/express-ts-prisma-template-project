console.log("Destructuring");

let a, b, c, d;
[a, b] = [44, 523];
console.log(a, b);

[a, b, c, ...d] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(a, b, c, d);

const names = ['nahid', 'saimul', 'dhin'];
[a, b, c] = names;
console.log(a, b, c);

const obj = {
    name: 'name',
    gender: 'gender',
    age: 'age',
    start: function () {
        console.log("age");
    }
}

const {name, gender, age} = obj;
console.log(name, gender, age);

