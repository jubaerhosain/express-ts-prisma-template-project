console.log("Welcome to Notes App");

//add notes from localStorage
showNotes();

//Add notes from user
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById('addText');
    let addTextTitle = document.getElementById('addTextTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        //notesObj array
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push([addTextTitle.value, addText.value]);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = "";
    addTextTitle.value = "";
    showNotes();
});


//add notes to the notes container
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        //notesObj array
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html +=
        `<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element[0]}</h5>
                <p class="card-text">${element[1]}</p>
                <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
            </div>
        </div>`;
    });

    let notesContainer = document.getElementById('notesContainer');
    if(notesObj.length != 0) {
        notesContainer.innerHTML = html;
    }
    else {
        notesContainer.innerHTML = `<h3>Nothing to show! Please add notes.</h3>`;
    }
}


//delete a note
function deleteNote(index) {
    console.log('I am deleting.......');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        //notesObj array
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    //delete 1 element from  notesObj array
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//add searching functionality
let search = document.getElementById('searchText');
search.addEventListener('input', function(e) {
    // console.log('Input event fired......');
    let inputText = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardText = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardText.includes(inputText)) {
            element.style.display = 'block';
        } 
        else {
            element.style.display = 'none';
        }
    });
});

// Further features:
// 1) Add valid title 
// 2) Mark as Important 
// 3) Separate notes according to user 
// 4) Sync and host ot web server
