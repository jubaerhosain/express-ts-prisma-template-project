console.log('Welcome to My Library');

// Using Prototype
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display 
function Display() {

}

Display.prototype.valid = function(book) {
    if(book.name.length < 3 || book.author.length < 3) 
        return false;
    else
        return true;
}

Display.prototype.add = function(book) {
    console.log('Adding to UI');
    let tableBody = document.getElementById('tableBody');
    let uiHtml = 
    `<tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
    </tr>`;

    tableBody.innerHTML += uiHtml;
}

Display.prototype.clear = function() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.show = function(type) {
    let messageDiv = document.getElementById('message');
    messageDiv.innerHTML = 
    `<div class="alert alert-warning alert-bs-dismissible fade show" role="alert">
        <strong>${type}</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;

    setTimeout(function() {
        messageDiv.innerHTML = ``;
    }, 2000);
}


// Add methods to display prototype


//Add submit event listener
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', submitForm);

function submitForm(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author  = document.getElementById('authorName').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type = fiction.value;

    if(programming.checked) {
        type = programming.value;
    } 
    else if(cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    
    let display = new Display();
    if(display.valid(book)) {
        display.add(book);
        display.clear();
        display.show('successful');
    }
    else {
        // Display alert message;
        display.show('error');
    }
    
    
    console.log(book);
    e.preventDefault();
}