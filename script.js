var canvas = document.getElementById("packed-circles");
var context = canvas.getContext("2d");

var board = [];

var wsize = 400;
var draw_interval;

function draw_circle(x, y, radius, debug=false) {
    /* Draws a circle at (x,y) with radius=adius */

    context.beginPath();
    context.lineWidth = 1;
    context.arc(x, y, radius, 0, 2 * Math.PI);

    if(debug) {
        context.fillStyle = "red";
        context.fill();
    }

    context.stroke();
}

function rand_point(xmax, ymax) {
    /* Generates random coodinates in R2 */

    return [ Math.random() * xmax,
             Math.random() * ymax ];
}

function rand_radius(x, y, xmax, ymax, rmin, rmax) {
    /* Generates random rmin <= radius <= rmax */

    var closest_boundary = Math.min(xmax - x, ymax - y, x, y);
    rmax = Math.min(closest_boundary, rmax);

    return Math.floor(Math.random() * (rmax - rmin + 1)) + rmin;
}

function dist_point_circle(point, circle) {
    /* Calculates distance from point to circle */

    var x_diff = (point[0] - circle[0]);
    var y_diff = (point[1] - circle[1]);

    return Math.sqrt(x_diff * x_diff + y_diff * y_diff) - circle[2];
}

function dist_list(p, l) {
    /* Calculates distance between point p and closest circle in l */

    if(l.length == 0) return 1000;

    var min_dist = 1000;
    for(var i = 0; i < l.length; i++) {
        dist = dist_point_circle(p, l[i]);

        if(dist <= 2)
            return 0;

        min_dist = Math.min(min_dist, dist);
    }

    return min_dist;
}

function draw() {
    /* Generates and draws random circle */

    var point = rand_point(wsize, wsize);
    var dist = dist_list(point, circles);

    if(dist > 2) {
        var x = point[0];
        var y = point[1];
        var r = rand_radius(x, y, wsize, wsize, 2, dist);

        draw_circle(x, y, r);
        circles.push([x, y, r]);
    }
}

function start() {
    /* Starts the drawing */

    draw_interval = setInterval(draw, 300);
}

function reset() {
    /* Resets the drawing */

    circles = [];
    canvas.width = canvas.width;
    clearInterval(draw_interval);
}

function stop() {
    /* Stops the drawing */

    clearInterval(draw_interval);
}
