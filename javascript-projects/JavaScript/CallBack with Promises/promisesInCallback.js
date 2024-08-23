console.log('This is CallBack Tutorial.');

// Suppose this is response from server
const students = [
    { name: "Jubaer", subject: "IIT" },
    { name: "Shanto", subject: "Desining" }
];

function enrollStudent(student) {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            students.push(student);
            const error = false;
            if(!error) {
                console.log("Your promise resolved");
                resolve();
            }
            else {
                console.log("Your promise rejected");
                reject("Sorry! cannot fulfilled promise");
            }
        }, 3000);
    });
}

function getStudents() {
    setTimeout(function () {
        let html = "";
        students.forEach(function (student) {
            html += `<li>${student.name}  ${student.subject} </li>`;
        });
        let ul = document.getElementById('list');
        ul.innerHTML = html;
    }, 1000);
}

let newStudent = {name: "Vai Sera", subject: "Dept Sera"};
// getStudent function will be called after enrollStudent 
// Completed it's task
// enrollStudent(newStudent).then(function() {
//     getStudents();
// }).catch(function(error) {
//     console.log('Some error occured.');
// });
// getStudents();

enrollStudent(newStudent).then(getStudents).catch(function(error) {
    console.log('Some error occured.');
});