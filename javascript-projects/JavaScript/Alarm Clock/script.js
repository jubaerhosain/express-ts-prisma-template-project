console.log("Alarm Clock");

let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    console.log('as;dlfk');

    const alarm = document.getElementById('alarm');
    let date = new Date(alarm.value);
    let now = new Date();
    console.log(date);

    let remain = date - now;
    console.log(remain);

    if(remain >= 0) {
        setTimeout(() => {

        }, remain);
    }
});

function ringBell() {
    let audio = new Audio('src');
    audio.play();
}





