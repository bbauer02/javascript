const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get Mouse Position

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


// Create particule

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2 , false);
        ctx.fillStyle = '#8C5523';
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // check if particle is still within canvas
        if(this.x > canvas.width || this.x < 0 ) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = - this.directionY;
        }

        // check collision detection - mouse position / particle position

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size) {
            if(mouse.x < this.x && this.x < canvas.width - this.size -10) {
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size *10) {
                this.x -=10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if(mouse.y > this.y && this.y >  this.size * 10) {
                this.y -= 10;
            }
        }
        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();

    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 900;
    for (let i = 0; i < numberOfParticles; i++) {
       let size = (Math.random()*5) +1;
       let x = (Math.random() * ((innerWidth - size * 2) - (size * 2 )) + size *2);
       let y = (Math.random() * ((innerHeight - size * 2) - (size * 2 )) + size *2);
       let directionX = (Math.random() * 5) - 2.5;
       let directionY = (Math.random() * 5) - 2.5;
       let color = '#8C5523';

       particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
    }
}



// Animation loop

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}


// check if particle are close enought to draw line between them
function connect() {
    let opacityValue = 1;
    for(let a =0; a<particlesArray.length; a++) {
        for(let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = dx*dx + dy*dy;
            if(distance < (canvas.width/20) * (canvas.height/20)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle='rgba(140,85,31,'+opacityValue+')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// resize event

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) / (canvas.height/80));
    init();
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animate();