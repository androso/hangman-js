function draw(ctx, startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

//funcion que dibuja la cuerda del ahorcado
const drawRope = (ctx) => {
    draw(ctx, 60, 10, 60, 40)
}

//funcion que dibuja una j
function drawLine(ctx, startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

//funcion que dibuja un circulo
function drawCirc(ctx, startX, startY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, startAngle, endAngle);
    ctx.stroke();
}

//funcion que dibuja la cabeza 
function drawHead(ctx) {
    drawCirc(ctx, 60, 50, 10, 0, Math.PI * 2);
}

//funcion que el cuerpo
function drawBody(ctx) {
    drawLine(ctx, 60, 60, 60, 110);
}

//funcion que dibuja el brazo izquierdo
function drawLeftArm(ctx) {
    drawLine(ctx, 60, 70, 32, 50);
}

//funcion que dibuja el brazo derecho
function drawRightArm(ctx) {
    drawLine(ctx, 60, 70, 88, 50);
}

//funcion que dibuja la pierna izquierda
function drawLeftLeg(ctx) {
    drawLine(ctx, 61, 109, 35, 130)
}

// funcion que dibuja la plataforma
const drawHangmanPlatform = (ctx) => {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    draw(ctx, 0, 10, 75, 10)
    draw(ctx, 10, 0, 10, 180)
    draw(ctx, 0, 180, 180, 180)
}

export default {
    drawHangmanPlatform,
    drawLeftArm,
    draw,
    drawBody,
    drawCirc,
    drawHead,
    drawLeftLeg,
    drawLine,
    drawRightArm,
    drawRope,
}