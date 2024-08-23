console.log("Try Catch");

// suppose this data is comming from server
// let a = "asdfa";
// if(a != undefined) {
//     throw new Error("Defined");
// }
// else {
//     console.log("Undefined");
// }

try {
    // ASDFASDFA
    console.log("We are inside try block");
    // callFunction();
} catch (error) {
    console.log("Are you okay?");
    console.log(error);
} finally {
    console.log("Finally run this");
}