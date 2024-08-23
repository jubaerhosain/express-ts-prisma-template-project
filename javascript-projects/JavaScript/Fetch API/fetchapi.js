console.log("This is Fetch API");

let myBtn1 = document.getElementById('myBtn1');
let content = document.getElementById('çontent');

// function getData() {
//     console.log('started getdata');
//     // returns a promise
//     fetch('myfile.txt').then((response) => {
//         console.log('inside 1st then getdata');
//         return response.text();
//     }).then((data) => {
//         console.log('inside 2nd then getdata');
//         console.log(data);
//     });
// }

// get request
// same task can be done by xhs(XMLHttpsRequest)
// function getData() {
//     console.log('started getdata');
//     // returns a promise
//     fetch('https://api.github.com/users').then((response) => {
//         console.log('inside 1st then getdata');
//         // return response.text();
//         return response.json();
//     }).then((data) => {
//         console.log('inside 2nd then getdata');
//         console.log(data);
//     });
// }


// console.log('before getdata');
// getData();
// console.log('after getdata');

// ==========================
// If data is string, don't use JSON.stringify(obj);
// Else use JSON.stringify(obj);
// ==========================


// post request
// same task can be done by xhs(XMLHttpsRequest)
function postData() {
    console.log('started getdata');
    // returns a promise
    let url = 'http://dummy.restapiexample.com/api/v1/create';
    // this is JSON data
    let data = {"name":"asdfasf","salary":"123","age":"23"};
    // params object
    let params = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    // not one liner
    // fetch(url, params).then((response) => {
    //     console.log('inside 1st then getdata');
    //     // return response.text();
    //     return response.json();
    // }).then((data) => {
    //     console.log('inside 2nd then getdata');
    //     console.log(data);
    // });

    // this is one liner
    fetch(url, params).then(response => response.json()).then(data => console.log(data));
}

// this code is not working with live server in vscode
// but works in open with chrome

console.log('before getdata');
postData();
console.log('after getdata');








