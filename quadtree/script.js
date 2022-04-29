function random(min, max) {

    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result;
    //The maximum is inclusive and the minimum is inclusive
  }

const canvasWidth = 400;
const canvasHeight = 400;

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;



const x = 20;
const y = 20;
const w = 300;
const h = 300;
let boundary = new Rectangle(x,y,w,h);
let qt = new QuadTree(boundary,4);

for(let i = 0; i < 5; i++) {
    const px = random(x, x+w);
    const py = random(y, y+h);
    let p = new Point(px,py);
    qt.insert(p);
}
console.log(qt)
qt.show(ctx);