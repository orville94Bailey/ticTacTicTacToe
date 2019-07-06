let playerTurn = 0;
let lastRow = '';
let lastColumn = '';

let board = Array.from(Array(9), ()=> new Array(9))
let largeBoard = Array.from(Array(3), ()=> new Array(3));

function setup() {
    createCanvas(300, 300);
}
  
function draw() {
    strokeWeight(3);
    //big
    line(0,100,300,100)
    line(0,200,300,200)
    line(100,0,100,300)
    line(200,0,200,300)

    drawLittleBoard(0,0)
    drawLittleBoard(100,0)
    drawLittleBoard(200,0)

    drawLittleBoard(0,100)
    drawLittleBoard(100,100)
    drawLittleBoard(200,100)

    drawLittleBoard(0,200)
    drawLittleBoard(100,200)
    drawLittleBoard(200,200)
}

function drawLittleBoard(xOffset,yOffset) {
    strokeWeight(2)
    let aThird = 30;
    let centerOffset = (100-(aThird * 3))/2
    line(xOffset+aThird+centerOffset,yOffset+centerOffset,xOffset+aThird+centerOffset,yOffset+(3*aThird)+centerOffset)
    line(xOffset+(2*aThird)+centerOffset,yOffset+centerOffset,xOffset+(2*aThird)+centerOffset,yOffset+(3*aThird)+centerOffset)
    line(xOffset+centerOffset,yOffset+aThird+centerOffset,xOffset+(3*aThird)+centerOffset,yOffset+aThird+centerOffset)
    line(xOffset+centerOffset,yOffset+(2*aThird)+centerOffset,xOffset+(3*aThird)+centerOffset,yOffset+(2*aThird)+centerOffset)
}

function drawCircle(x,y) {
    ellipse(x,y,25)
}

function drawX(x,y) {
    line(x-15,y-15,x+15,y+15)
    line(x-15,y+15,x+15,y-15)
}

function mouseClicked() {
    let outerCoords = getQuadrant()
    let innerCoords = getInnerQuadrant()
    if (isValidMove(outerCoords, innerCoords)) {
        let x = (outerCoords.x * 100) + (innerCoords.x * 33) + 15
        let y = (outerCoords.y * 100) + (innerCoords.y * 33) + 15 
        if (playerTurn % 2 ===1) {
            drawCircle(x,y)
            markBoard(outerCoords, innerCoords, 'o')
        } else {
            drawX(x,y)
            markBoard(outerCoords,innerCoords,'x')
        }
        let player = playerTurn % 2 == 1 ? 'o' : 'x';
        checkForWinner(outerCoords,player)
        playerTurn += 1;   
    }
    return false;
}

function getQuadrant() {
    return {x:Math.floor(mouseX/100), y:Math.floor(mouseY/100)}
}

function getInnerQuadrant() {
    return {x:Math.floor((mouseX%100)/33), y:Math.floor((mouseY%100)/33)}
}

function markBoard(outerCoords, innerCoords, player) {
    board[(outerCoords.x * 3) + innerCoords.x][(outerCoords.y * 3)+innerCoords.y] = player;
    console.log(board);
}

function checkForWinner(outerCoords, player) {
    var result;
    for(let y = (outerCoords.y*3); y <=(outerCoords.y*3)+2; y++) {
        //top to bottom
        for (let x=(outerCoords.x*3);x<=(outerCoords.x*3)+2;x++) {
            //left to right
            if (board[x][y] == player) {
                // console.log(x%3+y%3, '=',x%3,'+',y%3)
                result = result | (1<<((x%3)+((y%3)*3)))
            }
        }
    }
    if (winningValues.indexOf(result) != -1) {
        largeBoard[outerCoords.x][outerCoords.y] = player;
    }
}

function isValidMove(outerCoords, innerCoords){
    console.log(largeBoard[outerCoords.x][outerCoords.y])
    console.log(board[innerCoords.x][innerCoords.y])

    if (largeBoard[outerCoords.x][outerCoords.y] == undefined) {
        if (board[(outerCoords.x * 3) + innerCoords.x][(outerCoords.y * 3)+innerCoords.y] == undefined) {
            return true;
        }
    }
    return false;
}

let winningValues = [
    parseInt("100100100",2),
    parseInt("010010010",2),
    parseInt("001001001",2),
    parseInt("111000000",2),
    parseInt("000111000",2),
    parseInt("000000111",2),
    parseInt("100010001",2),
    parseInt("001010100",2)
]