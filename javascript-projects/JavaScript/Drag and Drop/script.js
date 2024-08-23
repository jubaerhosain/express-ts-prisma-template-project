console.log("Drag and Drop Elements");

let imgBox = document.querySelector('.imgBox');
let whiteBoxes = document.getElementsByClassName('whiteBox');

// let obj = document.getElementById('rad');
// obj.append(imgBox);

imgBox.addEventListener('dragstart', (e) => {
    console.log('dragstart');
    e.target.className += ' hold';
    // 0 means 
    // hide background div remains in initial position first
    // then, run this after executing all of command
    setTimeout(() => {
        e.target.className = 'hide';
    }, 0);
});

imgBox.addEventListener('dragend', (e) => {
    console.log('dragend');
    e.target.className = 'imgBox';
});

// add event listener to white boxex
for (let whiteBox of whiteBoxes) {
    whiteBox.addEventListener('dragover', (e) => {
        //helps to drop, while unclick
        e.preventDefault();
        console.log('dragover');

    });
    whiteBox.addEventListener('dragenter', (e) => {
        console.log('dragenter');
        e.target.className += ' dragenter';
    });
    whiteBox.addEventListener('dragleave', (e) => {
        console.log('dragleave');
        e.target.className = 'whiteBox';
    });
    whiteBox.addEventListener('drop', (e) => {
        console.log('drop');
        // append() removes DOM from initial position
        // and appends to the new DOM
        e.target.append(imgBox);
        e.target.className = 'whiteBox';
    });
}


