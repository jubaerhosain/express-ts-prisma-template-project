let dir = { x: 0, y: 0 };
let food = { x: 2, y: 5 };
let snake_array = [{ x: 11, y: 11 }];

let last_time = 0;
let board = document.querySelector(".board");

function eat_food() {
    if (food.x == snake_array[0].x && food.y == snake_array[0].y) {
        // add one block to the end of the snake
        // initialize -1,-1 but it takes position of the last block while move snake
        snake_array.push({ x: -1, y: -1 });
        // new position of food random number between 1 and 21;
        let min = 1,
            max = 21;
        let diff = max - min;
        let x = Math.floor(Math.random() * diff);
        x = x + min;
        let y = Math.floor(Math.random() * diff);
        y = y + min;
        food.x = x;
        food.y = y;
    }
}

function play_game() {
    // move snake
    // erasing the last element and assinging it's previous element's value
    // and next segments increment the head position according to the direction
    for (let i = snake_array.length - 1; i > 0; i--) {
        snake_array[i] = { ...snake_array[i - 1] };
    }

    // new head position
    snake_array[0].x += dir.x;
    snake_array[0].y += dir.y;
    // console.log(snake_array[0].x, snake_array[0].y);

    // move also can be done by removing one element from the end
    // and add new position of head to the front of snake_array

    // if goes inside wall then rise from opposit
    if (snake_array[0].x > 21) snake_array[0].x = 1;
    if (snake_array[0].y > 21) snake_array[0].y = 1;
    if (snake_array[0].x < 1) snake_array[0].x = 21;
    if (snake_array[0].y < 1) snake_array[0].y = 21;

    eat_food();

    // erase previous paint
    board.innerHTML = "";

    // start new paint
    let snake_food = document.createElement("div");
    snake_food.classList.add("food");
    snake_food.style.setProperty("grid-row-start", food.y);
    snake_food.style.setProperty("grid-column-start", food.x);
    board.append(snake_food);

    // draw snake
    snake_array.forEach((element, index) => {
        let snake = document.createElement("div");
        snake.style.setProperty("grid-row-start", element.y);
        snake.style.setProperty("grid-column-start", element.x);
        if (index == 0) {
            snake.classList.add("head");
        } else {
            snake.classList.add("body");
        }
        board.append(snake);
    });
}

function main(current_time) {
    // this is not recursion, this is working
    window.requestAnimationFrame(main);

    // call after every 1000ms
    if (current_time - last_time < 100) return;

    // console.log(current_time);
    last_time = current_time;
    play_game();

    // this is not working(for if condition...bcz last time is always == current that is always less than 1000ms, otherwise works), stops after one call
    // window.requestAnimationFrame(main);
}

// main logic strarts from here
// when render animation, highly recomended this thing over setInterval()
// pauses while leave the tab to new tab..and come back
// this thing means = window.requestAnimationFrame(callback)
// window.requestAnimationFrame(main);

window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        dir.x = 0;
        dir.y = -1;
    } else if (event.key == "ArrowDown") {
        dir.x = 0;
        dir.y = 1;
    } else if (event.key == "ArrowLeft") {
        dir.x = -1;
        dir.y = 0;
    } else if (event.key == "ArrowRight") {
        dir.x = 1;
        dir.y = 0;
    }

    // after clicking any key then start this.....
    window.requestAnimationFrame(main);
});
