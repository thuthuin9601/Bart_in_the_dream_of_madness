export class Rect{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    strokeRectangle(ctx){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
export class Circle{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    strokeCircle(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.stroke();
    }
}

export function isCircleCollision(circle1, circle2){
    let dx = circle2.x - circle1.x;
    let dy = circle2.y - circle1.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let sumOfRadi = circle1.radius + circle2.radius;
    return (distance <= sumOfRadi) ;
}

export function isCircleRectCollision(cir, rect) {
    let Ax = cir.x;
    let Ay = cir.y;

    let rect_left = rect.x;
    let rect_top = rect.y;
    let rect_right = rect.x + rect.width;
    let rect_bottom = rect.y + rect.height;

    if (cir.x < rect_left)
        Ax = rect_left;
    else if (cir.x > rect_right)
        Ax = rect_right;

    if (cir.y < rect_top)
        Ay = rect_top;
    else if (cir.y > rect_bottom)
        Ay = rect_bottom;

    let dx = cir.x - Ax;
    let dy = cir.y - Ay;

    return (dx * dx + dy * dy) <= cir.radius * cir.radius;
}
