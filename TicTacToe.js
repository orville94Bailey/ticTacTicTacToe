let playerTurn = 0;
let nextMove = null;

let board = Array.from(Array(9), () => new Array(9))
let largeBoard = Array.from(Array(3), () => new Array(3));
let winner = {}
var canvas;

function setup() {
    canvas = createCanvas(300, 300);
    canvas.parent('ticTacToe');
}

function draw() {
    if (winner.player == undefined) {
        hilightRequiredQuad()
        strokeWeight(3);
        //big
        line(0, 100, 300, 100)
        line(0, 200, 300, 200)
        line(100, 0, 100, 300)
        line(200, 0, 200, 300)

        drawLittleBoard(0, 0)
        drawLittleBoard(100, 0)
        drawLittleBoard(200, 0)

        drawLittleBoard(0, 100)
        drawLittleBoard(100, 100)
        drawLittleBoard(200, 100)

        drawLittleBoard(0, 200)
        drawLittleBoard(100, 200)
        drawLittleBoard(200, 200)

        strokeWeight(3)
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let xLoc = (Math.floor(x / 3) * 100) + (x % 3 * 33) + 15
                let yLoc = (Math.floor(y / 3) * 100) + (y % 3 * 33) + 15
                if (board[x][y] == 'x') {
                    drawX(xLoc, yLoc)
                } else if (board[x][y] == 'o') {
                    drawCircle(xLoc, yLoc)
                }
            }
        }

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (largeBoard[x][y] == 'x') {
                    markWin({ x: x, y: y }, 'x')
                } else if (largeBoard[x][y] == 'o') {
                    markWin({ x: x, y: y }, 'o')
                }
            }
        }
    } else {
        drawWinner(winner.player);
    }
}

function drawLittleBoard(xOffset, yOffset) {
    strokeWeight(2)
    let aThird = 30;
    let centerOffset = (100 - (aThird * 3)) / 2
    line(xOffset + aThird + centerOffset, yOffset + centerOffset, xOffset + aThird + centerOffset, yOffset + (3 * aThird) + centerOffset)
    line(xOffset + (2 * aThird) + centerOffset, yOffset + centerOffset, xOffset + (2 * aThird) + centerOffset, yOffset + (3 * aThird) + centerOffset)
    line(xOffset + centerOffset, yOffset + aThird + centerOffset, xOffset + (3 * aThird) + centerOffset, yOffset + aThird + centerOffset)
    line(xOffset + centerOffset, yOffset + (2 * aThird) + centerOffset, xOffset + (3 * aThird) + centerOffset, yOffset + (2 * aThird) + centerOffset)
}

function drawCircle(x, y) {
    ellipse(x, y, 25)
}

function drawX(x, y) {
    line(x - 15, y - 15, x + 15, y + 15)
    line(x - 15, y + 15, x + 15, y - 15)
}

function mouseClicked() {
    let outerCoords = getQuadrant()
    let innerCoords = getInnerQuadrant()
    if (isValidMove(outerCoords, innerCoords)) {
        let x = (outerCoords.x * 100) + (innerCoords.x * 33) + 15
        let y = (outerCoords.y * 100) + (innerCoords.y * 33) + 15
        if (playerTurn % 2 === 1) {
            drawCircle(x, y)
            markBoard(outerCoords, innerCoords, 'o')
        } else {
            drawX(x, y)
            markBoard(outerCoords, innerCoords, 'x')
        }
        let player = playerTurn % 2 == 1 ? 'o' : 'x';
        checkForWinner(outerCoords, player)
        playerTurn += 1;
        nextMove = innerCoords;
    }
    clear()
    return false;
}

function getQuadrant() {
    return { x: Math.floor(mouseX / 100), y: Math.floor(mouseY / 100) }
}

function getInnerQuadrant() {
    return { x: Math.floor((mouseX % 100) / 33), y: Math.floor((mouseY % 100) / 33) }
}

function markBoard(outerCoords, innerCoords, player) {
    board[(outerCoords.x * 3) + innerCoords.x][(outerCoords.y * 3) + innerCoords.y] = player;
}

function checkForWinner(outerCoords, player) {
    var result;
    for (let y = (outerCoords.y * 3); y <= (outerCoords.y * 3) + 2; y++) {
        //top to bottom
        for (let x = (outerCoords.x * 3); x <= (outerCoords.x * 3) + 2; x++) {
            //left to right
            if (board[x][y] == player) {
                result = result | (1 << ((x % 3) + ((y % 3) * 3)))
            }
        }
    }
    winningValues.forEach(x => {
        if ((x & result) == x) {
            largeBoard[outerCoords.x][outerCoords.y] = player
            markWin(outerCoords, player)
            checkForOverallWinner(player)
        }
    })
}

function markWin(outerCoords, player) {
    let x = outerCoords.x * 100;
    x += 50;
    let y = outerCoords.y * 100;
    y += 50;
    if (player == 'x') {
        strokeWeight(8)
        line(x - 50, y - 50, x + 50, y + 50)
        line(x - 50, y + 50, x + 50, y - 50)
    } else {
        ellipse(x, y, 90)
    }
}

function checkForOverallWinner(player) {
    var result;
    for (let y = 0; y <= 2; y++) {
        //top to bottom
        for (let x = 0; x <= 2; x++) {
            //left to right
            if (largeBoard[x][y] == player) {
                result = result | (1 << (x + (y * 3)))
            }
        }
    }

    if (winningValues.indexOf(result) != -1) {
        winner = { player: player };
    }
}

function isValidMove(outerCoords, innerCoords) {
    if (winner.player == undefined) {
        if (isValidQuadrant(outerCoords)) {
            if (largeBoard[outerCoords.x][outerCoords.y] == undefined) {
                if (board[(outerCoords.x * 3) + innerCoords.x][(outerCoords.y * 3) + innerCoords.y] == undefined) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isValidQuadrant(outerCoords) {
    if (nextMove == null) { return true }
    if (largeBoard[nextMove.x][nextMove.y] != undefined) {
        return true;
    } else if ((outerCoords.x == nextMove.x) && (outerCoords.y == nextMove.y)) {
        return true;
    }
    return false;
}

function hilightRequiredQuad() {
    if (nextMove == null) { return; }
    if (largeBoard[nextMove.x][nextMove.y] != undefined) { return; }
    stroke('green');
    strokeWeight(6);
    rect(nextMove.x * 100, nextMove.y * 100, 100, 100)
    stroke('black');
}

function drawWinner(player) {
    strokeWeight(2);
    textSize(32);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill('rgba(255,255,255,255)');
    rect(150, 150, 275, 60);
    fill('black');
    text(player.toUpperCase() + ' wins this time!', 150, 150);
    rectMode(CORNER);
}

let winningValues = [
    parseInt('100100100', 2),
    parseInt('010010010', 2),
    parseInt('001001001', 2),
    parseInt('111000000', 2),
    parseInt('000111000', 2),
    parseInt('000000111', 2),
    parseInt('100010001', 2),
    parseInt('001010100', 2)
]

function windowResized() {
    centerCanvas();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
}