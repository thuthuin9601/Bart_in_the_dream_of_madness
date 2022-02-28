function isRectCollision(rect1X, rect1Y, rect1W, Rect1H, rect2X, rect2Y, rect2W, Rect2H) {
    let distX = (rect1X + (rect1W/2)) - (rect2X + (rect2W)/2);
    if (distX < 0)
        distX = -distX;

    const distW = (rect1W + rect2W)/2;

    let distY =(rect1Y + (Rect1H/2)) - (rect2Y + (Rect2H)/2);
    if(distY < 0)
        distY = -distY;

    const distH = (Rect1H + Rect2H)/2;

    return (distX <= distW && distY <= distH);
}
export function isRectCircleCollision(rectX, rectY, rectW, rectH, cirX, cirY, cirR ){
    let Ax = cirX;
    let Ay = cirY;

    let rect_left = rectX;
    let rect_top = rectY;
    let rect_right = rectX + rectW;
    let rect_bottom =rectY + rectH;

    if (cirX < rect_left)
        Ax = rect_left;
    else if (cirX > rect_right)
        Ax = rect_right;

    if (cirY < rect_top)
        Ay = rect_top;
    else if (cirY > rect_bottom)
        Ay = rect_bottom;

    let dx = cirX - Ax;
    let dy = cirY - Ay;

    return (dx * dx + dy * dy) <= cirR * cirR;
}
export function isCircleCollision(Cir1X, Cir1Y, Cir1R, Cir2X, Cir2Y, Cir2R){
    let dx = Cir1X - Cir2X;
    let dy = Cir1Y - Cir2Y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    return distance <= Cir1R + Cir2R;
}


export default isRectCollision;