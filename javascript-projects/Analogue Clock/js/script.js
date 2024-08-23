setInterval(() => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    let hour_rotation = 30*hour + minute/2;
    let minute_rotation = 6*minute;
    let second_rotation = 6*seconds;

    document.getElementById('hour').style.transform = `rotate(${hour_rotation}deg)`;
    document.getElementById('minute').style.transform = `rotate(${minute_rotation}deg)`;
    document.getElementById('second').style.transform = `rotate(${second_rotation}deg)`;
}, 1000)