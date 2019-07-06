let playerTurn = 0;
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
    if (playerTurn % 2 ===1) {
        drawCircle(mouseX,mouseY)
    } else {
        drawX(mouseX,mouseY)
    }
    playerTurn += 1;
    return false;
}