function func1() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            const error = true;
            if(!error) {
                console.log("Your promise resolved");
                resolve();
            }
            else {
                console.log("Your promise rejected");
                reject("Sorry! cannot fulfilled promise");
            }
        }, 5000);
    });
}

// let ret = func1().then(function() {
//     console.log("Thanks for resolving");
// }).catch(function(error) {
//     console.log("Very bad broah. " + error);
// });
// console.log(ret);