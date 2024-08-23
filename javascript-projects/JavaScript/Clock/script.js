console.log("Alarm Clock");

function updateTime() {
    let date = new Date();
    currentHours = date.getHours();
    let currentMinutes = date.getMinutes();
    let currentSeconds = date.getSeconds();

    let ampm = (currentHours < 12) ? 'AM' : 'PM';
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours == 0) ? 12 : currentHours;
    let currentTime = currentHours + ':' + currentMinutes + ':' + currentSeconds + ' ' + ampm;
    document.getElementById('clock').innerHTML = currentTime;
}

