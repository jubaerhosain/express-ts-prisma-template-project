console.log('AJAX');

let fetchBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click', fetchClick);

function fetchClick() {
    console.log('Clicked Fetch Button');
    // Instantiate XMLHttpsRequest = xhr
    const xhr = new XMLHttpRequest();
    // xhr.open('GET', 'https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8', true);
    xhr.open('POST', 'http://dummy.restapiexample.com/api/v1/create', true);
    xhr.getResponseHeader('Content-type', 'application/json');

    xhr.onprogress = function () {
        console.log('on progress');
    }

    xhr.onreadystatechange = function () {
        console.log('ready state is: ' + xhr.readyState);
    }

    // what to do when response is ready
    xhr.onload = function () {
        if (this.status == 200)
            console.log(this.responseText);
        else
            console.log("Some error occurs");
    }

    let params = { "name": "test", "salary": "123", "age": "23" };
    xhr.send(params);
    console.log('We Are Done');
}

// Populate Button
let popBtn = document.getElementById('popBtn');
popBtn.addEventListener('click', popClick);

function popClick() {
    console.log('Clicked Populate Button');
    // Instantiate XMLHttpsRequest = xhr
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://dummy.restapiexample.com/api/v1/employees', true);

    // xhr.open('POST', 'http://dummy.restapiexample.com/api/v1/create', true);
    // xhr.getResponseHeader('Content-type', 'application/json');

    // xhr.onprogress = function () {
    //     console.log('on progress');
    // }

    // xhr.onreadystatechange = function () {
    //     console.log('ready state is: ' + xhr.readyState);
    // }

    // what to do when response is ready
    xhr.onload = function () {
        if (this.status == 200) {
            let obj = JSON.parse(this.responseText);
            console.log(obj);
            let list = document.getElementById('list');
            let html = '';
            let index = 1;
            for (key in obj.data) {
                html += `<li>${obj.data[key].employee_name}</li>`;
                console.log(index++);
            }
            // Array.from(obj).forEach(function(element, index) {
            //     console.log("Hi " + index);
            //     console.log(element.employee_name);
            // });
            list.innerHTML = html;
        }
        else
            console.log("Some error occurs");
    }

    // let params = { "name": "test", "salary": "123", "age": "23" };
    xhr.send();
    console.log('We Are Fetching Employees');
}