var c = document.getElementById('playground');
var canvas = c.getBoundingClientRect();

var ctx = c.getContext('2d');

var dvdButton = document.getElementById("dvd");
var dotButton = document.getElementById('circle');
var stopButton = document.getElementById('stop');
var clearb = document.getElementById("clear");

var requestID = 0;
var radius = 0;
var growing = true;

var x_prev = -1
var y_prev = -1

clearb.addEventListener("click", function(e)
			{
			    console.log("clearing");
			    clear();
			});

c.addEventListener("click", function(e)
		     {
			 draw(e);
		     });

// clears the canvas
var clear = function(e)
{
    ctx.clearRect(0, 0, c.width, c.height);; // clear canvas the size of the canvas

    x_prev = -1;
    y_prev = -1;
};

// draws a dot on the canvas
// connects new dot to the previous dot if applicable
var draw = function(e)
{
    console.log("(" + e.clientX + ", " + e.clientY + ")");

    // e.offsetX is used to return the x coordinate of mouse cursor
    // in relation to the div in which your cursor is in
    //e.offsetY same as above, but returns y coordinate instead

    // coordinates of the new dot
    var x = e.offsetX;
    var y = e.offsetY;

    console.log(x + " " + y);

    if (x_prev > -1)
    {
	// ctx.beginPath() is used before starting a new path,
	// it can be used to draw lines, ellipses, arcs, or rectangles
	ctx.beginPath();

	// starts at a coordinate location
	ctx.moveTo(x_prev, y_prev);

	// creates a line to a new coordinate
	ctx.lineTo(x, y);

	// displays the line in the canvaas
	ctx.stroke();

	// redraw the previous circle
	drawCircle(x_prev, y_prev)
    }

    // draw the new circle
    drawCircle(x, y);

    // set the coordinates again
    x_prev = x;
    y_prev = y;

};

// draw a dot with given coordinates
var drawCircle = function(xcor, ycor)
{
    ctx.fillStyle = "#000000"; // color of fill
    ctx.beginPath();
    ctx.ellipse(xcor, ycor, 20, 20, 0, 0, 2 * Math.PI); // creates an ellipse
    ctx.fill(); // display a filled in ellipse
};

var clear = function (e) {
    console.log("clearing");
    ctx.clearRect(0, 0, c.width, c.height);
};

function drawDot() {

    window.cancelAnimationFrame(requestID);
    clear();

    if (radius == c.width / 2){
        growing = false;
    }
    if (radius == 0){
        growing = true;
    }


    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2,
           radius, 0, 2 *Math.PI);
    clear();
    ctx.stroke();
    ctx.fill();

    if (growing){
        radius = radius + 1;
    }
    else{
        radius = radius - 1;
    }

    requestID = window.requestAnimationFrame(drawDot);
}

var stopIt = function() {
    window.cancelAnimationFrame(requestID);
    requestID = 0;
};

var dvdLogoSetup = function() {

    window.cancelAnimationFrame(requestID);
    var rectWidth = 100;
    var rectHeight = 50;

    var rectX = Math.floor(Math.random() * (c.width-rectWidth));
    var rectY = Math.floor(Math.random() * (c.height-rectHeight));

    var xvel = 1;
    var yvel = 1;

    var logo = new Image();
    logo.src = "img/logo_dvd.jpg"
	  //ctx.drawImage(logo, rectX, rectY, rectWidth, rectHeight);
	  //ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

	var dvdLogo = function() {

		clear();

      ctx.drawImage(logo, rectX, rectY, rectWidth, rectHeight);

      if (rectX + rectWidth == c.width ){
			xvel = xvel * -1;
	    }
	    if (rectX == 0){
			xvel = xvel * -1;
	    }
	    if (rectY + rectHeight == c.height ){
			yvel = yvel * -1;
	    }
	    if (rectY == 0){
			yvel = yvel * -1;
	    }

		rectX += xvel;
		rectY += yvel;

		//ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

		requestID = window.requestAnimationFrame(dvdLogo);
	}
	dvdLogo()

}

dotButton.addEventListener('click', drawDot);
dvdButton.addEventListener('click', dvdLogoSetup);
stopButton.addEventListener('click', stopIt);
