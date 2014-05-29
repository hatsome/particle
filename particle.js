
var MS_PER_UPDATE = 1000 / 25;
var max_Particles = 100;
var min_Size = 1;
var max_Size = 20;
var size_Change = -0.1;
var particle_Speed = 5;
var particles_Per_Update = 2;
var color = 'green';
var background_color = "white";
var previousTime = Date.now();
var lag = 0.0;
var particles = [];

ctx.globalCompositionOperation = "source-over";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function particle(x, y, xSpeed, ySpeed, size, color) {
	this.x = x;
	this.y = y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.size = size;
	this.color = color;
}  

particle.prototype.draw = function(interpolation) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x + (this.xSpeed * interpolation), this.y + (this.ySpeed * interpolation), this.size, this.size);
};

particle.prototype.update = function() {
	this.x += this.xSpeed;
	this.y += this.ySpeed;
	this.size = this.size + size_Change > 0 ? this.size + size_Change : 0;
};

function processInput() {
	max_Particles = parseFloat(document.getElementById('max_Particles').value);
	min_Size = parseFloat(document.getElementById('min_Size').value);
	max_Size = parseFloat(document.getElementById('max_Size').value);
	size_Change = parseFloat(document.getElementById('size_Change').value);
	particle_Speed = parseFloat(document.getElementById('particle_Speed').value);
	particles_Per_Update = parseFloat(document.getElementById('particles_Per_Update').value);
	color = document.getElementById('color').value;
	background_color = document.getElementById('background_color').value;
}

function update() {
	for (var i = 0; i < particles_Per_Update; i++) {
	particles.push(new particle(250, 250, 
							getRandom(-particle_Speed, particle_Speed), getRandom(-particle_Speed, particle_Speed), 
							getRandom(min_Size, max_Size), color));
	}

	if (particles.length >= max_Particles) {
		particles.shift(max_Particles);
	}

	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
	}
}

function render(interpolation) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for (var i = 0; i < particles.length; i++) {
		particles[i].draw(interpolation);
	}
}

var game = function() {
	var currentTime = Date.now();
	var elapsedTime = currentTime - previousTime;
	previousTime = currentTime;
	lag += elapsedTime;

	processInput();

	while (lag >= MS_PER_UPDATE) {
		update();
		lag -= MS_PER_UPDATE;
	}

	render(lag / MS_PER_UPDATE);

	requestAnimationFrame(game);
}

requestAnimationFrame(game);