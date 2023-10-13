function draw(startX, startY, endX, endY) {
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
const canvas = document.getElementById('person');
const ctx = canvas.getContext('2d');
let lives = 7

function drawString() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    draw(0,10,75,10)
    draw(10,0,10,180)
    draw(0,180,180,180)
    draw(75,10,75,40) // 1 Rope
    ctx.arc(75, 56, 13, 0, 2 * Math.PI) // 2 head
    draw(75, 70, 75, 125) // 3 columna
    draw(75,80, 110, 100) //4 rigth arm
    draw(75, 80, 42,100) // 5 left arm
    draw(73,123,110,150) // 6 rigth leg
    draw(74,123,41,150)// 7 left leg
}
const drawRope = ()=>{
    draw(60,10,60,40)
}
const drawHead = () => {
    draw

}


switch (lives) {
    case 6:
        drawRope()
        break;

    default:
        break;
}


document.addEventListener("DOMContentLoaded", drawString)


