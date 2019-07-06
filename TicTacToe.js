let playerTurn = 0;
let lastRow = '';
let lastColumn = '';

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
    let x = (outerCoords.x * 100) + (innerCoords.x * 33) + 15
    let y = (outerCoords.y * 100) + (innerCoords.y * 33) + 15
    console.log(x,'   ',y)
    if (playerTurn % 2 ===1) {
        drawCircle(x,y)
    } else {
        drawX(x,y)
    }
    playerTurn += 1;
    return false;
}

function getQuadrant() {
    return {x:Math.floor(mouseX/100), y:Math.floor(mouseY/100)}
}

function getInnerQuadrant() {
    return {x:Math.floor((mouseX%100)/33), y:Math.floor((mouseY%100)/33)}
}