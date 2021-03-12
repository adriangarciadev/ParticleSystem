# ParticleSystem

[Check the site](https://adriangarciadev.github.io/ParticleSystem/)

### Usage ###

This code creates a simple particle system, you have to provide an image and some basic parameters.

```javascript

	//when everything loads
	window.addEventListener("load", function()
	{

		let parameters =  
		{
		canvas: document.getElementById("the-canvas"),//the canvas where to draw provided by you in the HTML
		maxParticles:600,//this particle system will hold max 600 particles.
		generationSpeed:50,//generation speed 50 particles per second.
		TTL:6000,//Time To Live each particle lasts 6 seconds.
		initialPosition: new PS.VectorRange(new PS.Vector(0,0) , new PS.Vector(0,1024)),//initial position in range of the width of the canvas, at height 0
		initialVelocity: new PS.VectorRange(new PS.Vector(400,100), new PS.Vector(600,200)),//initial velocity very little in y
		initialScale: 	new PS.VectorRange(new PS.Vector(0.5,0.5), new PS.Vector(1.5,1.5), true),//random scale to give variation
		angularSpeed: new PS.ScalarRange(-2*Math.PI, 2*Math.PI),//random angular speed  between -1 and 1 revolutions per second.
		//the trace configuration of the element to draw
		trace:   new PS.SpriteSheet(
			{
					img: document.getElementById("tree-swing-leaf"),//provide your own image by id
					frameWidth: 40, //just one frame 40 width
					frameHeight: 40,//just one frame 40 width
			}),
		}
  
	var particleSystem = new PS.ParticleSystem(parameters);
  
  
  
  	function animate(){
		particleSystem.tick();
		window.requestAnimationFrame(animate);
	}
	animate();
  
  });	

```
