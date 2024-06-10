const root = document.getElementById("root");
const myniImg = document.getElementById("myniImg");
const myniDiv = document.getElementById("myniDiv");
const scoreHeader = document.getElementById("score");
const livesHeader = document.getElementById("lives");
const gameOverHeader = document.getElementById("ifOver");
const footer = document.getElementById("footer");

myniDiv.style.top = "512px";

let myni = {
    x: 0,
    left: 0,
    speed: 64,
}

let score = 0;
let lives = 5;
let index = 0;
let isOver = false;

createMap();

let game = setInterval(() => {
    if (lives <= 0) {
        clearInterval(game);
        livesHeader.innerText = "";
        gameOverHeader.style.fontSize = "96px";
        gameOverHeader.innerText = "GAME OVER";
        isOver = true;
    }
    randGlandex(index);
}, 1000);


/*
    FUNKCJE
*/
function createMap () {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 16; j++) {
            const div = document.createElement("div");
            div.setAttribute("id", `${j}_${i}`)
            div.classList.add("field");
            div.style.top = `${i * 64}px`;
            div.style.left = `${j * 64}px`;
            if (i == 9) {
                div.classList.add("grass");
            }
            else {
                div.classList.add("sky");
            }
            if (((3 > j > 0) || (j >= 4 && j <= 5) || (j >= 7 && j <= 10) || (j >= 13)) && i == 0) {
                div.classList.add("cloud");
            }
            else if (((j >= 5 && j <= 10) && i == 8) || ((j >= 6 && j <= 9) && i == 7)) {
                div.classList.add("sun");
            }

            root.appendChild(div);
        }
    }
}

function randGlandex () {
    let randX = getRndInteger(0, 15);
    let y = 0;
    let fall = setInterval(() => {
        if (lives > 0) {
            if (y > 0) {
                const prevField = document.getElementById(`${randX}_${y - 1}`);
                prevField.classList.remove("glandex");
            }
            if (y < 10) {
                const field = document.getElementById(`${randX}_${y}`);
                field.classList.add("glandex");
                if ((field.style.top == "512px" || field.style.top == "576px") && (document.getElementById(`${myni.x}_8`).style.left == field.style.left || document.getElementById(`${myni.x + 1}_8`).style.left == field.style.left || document.getElementById(`${myni.x + 2}_8`).style.left == field.style.left || document.getElementById(`${myni.x + 3}_8`).style.left == field.style.left)) {
                    console.log("trafiony");
                    field.classList.remove("glandex");
                    clearInterval(fall);
                    score++;
                    scoreHeader.innerText = score;
                }
                y++;
            }
            else {
                const field = document.getElementById(`${randX}_${9}`);
                field.classList.remove("glandex");
                lives--;
                livesHeader.innerText = lives;
                clearInterval(fall);
            }
        }
    }, 400);
}

function keyDown (e) {
    if (!isOver) {
        if (e.which == 65) { // D
            if (myni.left > 0) {
                myni.x--;
                myni.left -= myni.speed;
                myniDiv.style.left = `${myni.left}px`;
            }
            myniImg.style.transform = "scaleX(-1)";
        }

        if (e.which == 68) { // A
            if (myni.left < 768) {
                myni.x++;
                myni.left += myni.speed;
                myniDiv.style.left = `${myni.left}px`;
            }
            myniImg.style.transform = "scaleX(1)";
        }
    }
}

function getRndInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}