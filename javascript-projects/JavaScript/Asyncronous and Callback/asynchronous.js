console.log('This is asynchornous programming');

// this will work after 1 sec and 
// console.log("Done Printing"); runs before it
setTimeout(function() {
    for(let index = 0; index < 5000; index++) {
        const element = index;
        console.log('This is index number' + element);
    }
}, 1000);

console.log("Done Printing");