
let info = document.getElementById('info');
let player_turn = 'X';
let line = document.querySelector('.line');

// length of wins_grid and line_transform is same 
// 0 1 2 
// 3 4 5 
// 6 7 8 
let wins_grid = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// [translateX(val), TranslateY(val), rotate(deg)]
// first translate to exact position then rotate by center
let line_transform = [
    [5, 5, 0],
    [-5, 15, 90],
    [5, 15, 45],
    [5, 15, 90],
    [15, 15, 90],
    [5, 15, 135],
    [5, 15, 0],
    [5, 25, 0],
];

function change_turn() {
    player_turn = player_turn == 'X' ? 'O' : 'X';
    info.innerText = 'Turn of ' + player_turn;
}

// returning from inside of for loop not working for this fucntion 
// but it should work....code example............ next function x()
// May be dosent working for ''''''''forEach'''''''''' loop
function check_win() {
    let wins = false;
    let boxtext = document.getElementsByClassName('boxtext');
    wins_grid.forEach((element, index) => {
        let trans = line_transform[index];
        let i = element[0], j = element[1], k = element[2];
        if (boxtext[i].innerText == boxtext[j].innerText &&
            boxtext[i].innerText == boxtext[k].innerText &&
            boxtext[i].innerText != '') {
            wins = true;
            info.innerText = 'Player ' + player_turn + ' Wins';

            // set width and transition property on line 
            line.style.width = '20vw';
            line.style.transform = `translate(${trans[0]}vw, ${trans[1]}vw) rotate(${trans[2]}deg)`;
            // forEach loop cannot break and return 
        }
    });
    return wins;
}

// this code is working fine 
// function x() {
//     for(let i = 0; i < 4; i++) 
//         if(i == 3) return true;
//     return false;
// }
// console.log(x());

// event listener on boxes logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach((element, index) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (e) => {
        if (boxtext.innerText == '') {
            boxtext.innerText = player_turn;
            if (!check_win()) {
                change_turn();
            }
        }
    });
});
