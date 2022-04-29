class QuadTree {
    constructor(boundary,capacity=4) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const h = this.boundary.h;
        const w = this.boundary.w;

        let tl = new Rectangle(x, y, x / 2, y / 2);
        this.topleft = new QuadTree(tl,this.capacity);
        let tr = new Rectangle(x + w / 2, y,w / 2, h / 2);
        this.topright = new QuadTree(tr,this.capacity);
        let bl = new Rectangle(x , y + h / 2,w / 2, h / 2);
        this.bottomleft = new QuadTree(bl,this.capacity);
        let br = new Rectangle(x + h / 2, y + h / 2,w / 2, h / 2);
        this.bottomright = new QuadTree(br,this.capacity);
        this.divided = true;
    }
    insert(point) {

        if(!this.boundary.contains(point)) {
            return;
        }

        // Si une zone possède moins de point que la limite 
        // Alors on ajoute le point
        if(this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if(!this.divided) {
                this.subdivide();  
            }
            this.topleft.insert(point);
            this.topright.insert(point);
            this.bottomleft.insert(point);
            this.bottomright.insert(point);
        }
    }



    show(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.h, this.boundary.w);
        if(this.divided) {
            this.topleft.show(ctx);
            this.topright.show(ctx);
            this.bottomleft.show(ctx);
            this.bottomright.show(ctx);
        }
        if(this.divided) {
            this.topleft.show(ctx);
            this.topright.show(ctx);
            this.bottomleft.show(ctx);
            this.bottomright.show(ctx);
        }
        for(let p of this.points) {
            ctx.beginPath();
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(p.x,p.y,2,2);
            ctx.closePath();
        }
    }
}