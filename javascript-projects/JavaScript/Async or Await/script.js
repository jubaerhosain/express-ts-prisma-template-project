console.log("Async or Await");

// do same task as fetch 
// syntax is different

async function getName() {
    console.log("inside fucntion");
    // const response = await fetch('https://api.github.com/');
    const response = await fetch('https://api.github.com/users');
    console.log("before response");
    const users = await response.json();
    console.log("after response");
    return users;
}

console.log("before calling");
let myName = getName();
console.log("after calling");
console.log(myName);
myName.then(data => console.log(data));
console.log("last line");