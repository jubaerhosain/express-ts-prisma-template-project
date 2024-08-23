let disabled_ArrowUp = false;
let game_over = document.getElementById('game-over');
let dinosor = document.getElementById('dinosor');
let dragon = document.getElementById('dragon');

document.onkeydown = function(e) {
    // with out disabled condition. if click within given setTimeout then re-initialize th animation and animation position goes to 0%;
    if(e.keyCode == 38 && !disabled_ArrowUp) {
        console.log(e.key);
        let dinosor = document.getElementById('dinosor');
        dinosor.classList.add('animate-dinosor');
        disabled_ArrowUp = true;

        // to randomize the start point of dragon animation 
        // let dragon_x = document.querySelector(':root');
        // dragon_x.style.setProperty('--dragon-x', '400px');

        dragon.classList.add('animate-dragon');

        // runs one time after 500ms
        setTimeout(() => {
            dinosor.classList.remove('animate-dinosor');
            disabled_ArrowUp = false;
        }, 500);
    }
}

// runs after every 100ms 

setInterval(() => {
    let dinosor_x = parseInt(window.getComputedStyle(dinosor, null).getPropertyValue('left'));
    let dinosor_y = parseInt(window.getComputedStyle(dinosor, null).getPropertyValue('top'));

    // find the current css value, animation or non-animation
    let dragon_x = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    let dragon_y = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));
    
    let offset_x = Math.abs(dragon_x-dinosor_x);
    let offset_y = Math.abs(dragon_y-dinosor_y);
    if(offset_x <= 95 && offset_y <= 12 && dragon_x > dinosor_x) {
        console.log('game over');
        dragon.classList.remove('animate-dragon');
        dragon.style.left = `${dragon_x}px`;
    }

    // increase speed 
    if(dragon_x <= 20) {
        let duration = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
        duration -= 0.001;
        dragon.style.setProperty('animation-duration', duration + 's');
    }
}, 1);