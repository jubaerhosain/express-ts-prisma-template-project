console.log('This is CallBack Tutorial.');

// Suppose this is response from server
const students = [
    { name: "Jubaer", subject: "IIT" },
    { name: "Shanto", subject: "Desining" }
];

function enrollStudent(student, getStudents) {
    setTimeout(function () {
        students.push(student);
        getStudents();
    }, 1000);
}

function getStudents() {
    setTimeout(function () {
        let html = "";
        students.forEach(function (student) {
            html += `<li>${student.name}  ${student.subject} </li>`;
        });
        let ul = document.getElementById('list');
        ul.innerHTML = html;
    }, 5000);
}

let newStudent = {name: "Vai Sera", subject: "Dept Sera"};
// getStudent function will be called after enrollStudent 
// Completed it's task
enrollStudent(newStudent, getStudents);
// getStudents();