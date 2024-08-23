console.log('This is Form Validation.');

const userName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const submit = document.getElementById('submit');

let validName = validEmail = validPhone = false;

// console.log(name, email, phone);
// blur means, click outside of that elemnet
userName.addEventListener('blur', () => {
    console.log('name');
    let reg = /^[a-zA-Z][0-9a-zA-Z\s]{1,10}$/;
    let str = userName.value;
    if(reg.test(str)) {
        validName = true;
        console.log("valid");
        userName.classList.remove('is-invalid');
    } 
    else {
        userName.classList.add('is-invalid');
    }

});

email.addEventListener('blur', () => {
    console.log('email');
    let reg = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]{2,7})$/;
    let str = email.value;
    if(reg.test(str)) {
        validEmail = true;
        console.log("valid");
        email.classList.remove('is-invalid');
    } 
    else {
        email.classList.add('is-invalid');
    }
});

phone.addEventListener('blur', () => {
    console.log('phone');
    let reg = /^01[3-9][0-9]{8}$/;
    let str = phone.value;
    if(reg.test(str)) {
        validPhone = true;
        console.log("valid");
        phone.classList.remove('is-invalid');
    } 
    else {
        phone.classList.add('is-invalid');
    }
});

submit.addEventListener('click', (e) => {
    // prevent to refresh the page
    e.preventDefault();

    if(validName && validEmail && validPhone) {
        console.log("Valid");
        let valid = document.getElementById('valid');
        valid.classList.add('show');
    }
    else {
        let invalid = document.getElementById('invalid');
        invalid.classList.add('show');
    }
});

let closeBtn1 = document.getElementById('closeBtn1');
closeBtn1.addEventListener('click', () => {
    let valid = document.getElementById('valid');
    valid.classList.remove('show');
});

let closeBtn2 = document.getElementById('closeBtn2');
closeBtn1.addEventListener('click', () => {
    let invalid = document.getElementById('invalid');
    invalid.classList.remove('show');
});








