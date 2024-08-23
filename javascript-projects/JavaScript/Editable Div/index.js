
// create a new div
let editableDiv = document.createElement('div');
// find value from local storage
let value = localStorage.getItem('editableText');
// assign value to the textnode
let textNode;
if(value == null) {
    textNode = document.createTextNode('Edit the text');
} 
else {
    textNode = document.createTextNode(value);
}

// add textnode to the editable div
editableDiv.appendChild(textNode);
editableDiv.setAttribute('id', 'edit');
editableDiv.setAttribute('class', 'editable');
editableDiv.setAttribute('style', 
`width: 300px; height: 300px; border: yellow solid 2px; margin: 50px 50px 50px 50px;`);

//add editable div into container
let container = document.querySelector('.container');
container.appendChild(editableDiv);

//add event on editable div
editableDiv.addEventListener('click', function() {
    let length = document.getElementsByClassName('textarea').length;
    if(length == 0) {
        editableDiv.innerHTML = 
        `<textarea id="textarea" class="textarea" width:100%; height:100%';>
        ${editableDiv.innerText}</textarea>`;
    }
    
    let textarea = document.getElementById('textarea');
    textarea.addEventListener('blur', function() {
        editableDiv.innerText = textarea.value;
        localStorage.setItem('editableText', textarea.value);
    });
});

// localStorage.clear();