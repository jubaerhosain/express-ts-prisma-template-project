console.log("PostMan");

// hide parameter box, bcz json type is default
hideParamBox();
function hideParamBox() {
    let parameterBox = document.getElementById('parameterBox');
    parameterBox.style.display = 'none';
}

function showParamBox() {
    let parameterBox = document.getElementById('parameterBox');
    parameterBox.style.display = 'block';
}

function hideJsonBox() {
    let jsonBox = document.getElementById('jsonBox');
    jsonBox.style.display = 'none';
}

function showJsonBox() {
    let jsonBox = document.getElementById('jsonBox');
    jsonBox.style.display = 'block';
}

// if click on param box(content type custom), hide json box
let paramRadio = document.getElementById('customRadio');
paramRadio.addEventListener('click', () => {
    hideJsonBox();
    showParamBox();
});


// if click on json box(content type json), hide param box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    hideParamBox();
    showJsonBox();
});


// If the user clicks on + button, add more parameters
let noOfAddedParam = 2;
let plusBtn = document.getElementById('plusBtn');
plusBtn.addEventListener('click', () => {
    let addParamBox = document.getElementById('addParameterBox');
    let div = document.createElement('div');
    div.innerHTML =
        `<div class="row">
        <label for="pkey${noOfAddedParam}" class="col-sm-2 col-form-label">Parameter ${noOfAddedParam} </label>
        <div class="col">
            <input id="pkey${noOfAddedParam}" type="text" class="form-control" placeholder="Parameter ${noOfAddedParam} key">
        </div>
        <div class="col">
            <input id="pvalue${noOfAddedParam}" type="text" class="form-control" placeholder="Perameter ${noOfAddedParam} value">
        </div>
        <button class="btn btn-primary crossBtn">x</button>
    </div>`;
    noOfAddedParam += 1;
    addParamBox.appendChild(div);

    let crossBtns = document.getElementsByClassName('crossBtn');
    for (btn of crossBtns) {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
});


let submit = document.getElementById('fetchButton');
submit.addEventListener('click', () => {
    document.getElementById('responseData').value = 'Please wait... Fetching response...';

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    console.log(url);
    console.log(requestType);
    console.log(contentType);

    // this is a data object
    let data = {};

    if (contentType == 'CUSTOM') {
        for (let i = 1; i < noOfAddedParam; i++) {
            if (document.getElementById('pkey' + i) != undefined) {
                let key = document.getElementById('pkey' + i).value;
                let value = document.getElementById('pvalue' + i).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }
    console.log(data);

    if (requestType == 'GET') {
        fetch(url, { method: 'GET' }).then(response => response.text()).then(text => {
            document.getElementById('responseData').value = text;
        });
    }
    else {
        fetch(url,
        {
            method: 'POST',
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text()).then(text => {
            document.getElementById('responseData').value = text;
        });
    }
});




