var vec = new PS.Vector(0,0);
console.log("vector test :" +JSON.stringify(vec));





document.addEventListener("DOMContentLoaded", function(){
	
	
	let a = new PS.VectorRange( new PS.Vector(0,0) , new PS.Vector(100,100));
	let b =  new PS.ScalarRange(-Math.PI, Math.PI);
	let c = new PS.ColorRange( "#fcf727", "#ff0000");
	let myColor = new PS.Color(0,0,0);
	
	//let anotha = new VGenerators.VectorRange(new Vector(-400,000), new Vector(0,800));
	let an = new PS.VectorRange(new PS.Vector(-400,0) , new PS.Vector(0,800));

	let p = new PS.Particle({});
	
	var theSpritesheet =  new PS.SpriteSheet(
		{
				img: document.getElementById("fire-fx"),
				//ncols:9,
				//nrows:4,
				//maxSprites: 36,
				frameWidth: 700,
				frameHeight: 393,
				//frameTime : 100
		});

	console.log("generator : " +JSON.stringify(theSpritesheet));


	
	
	  var canvas = document.createElement("canvas");
	  canvas.width = 1600;
      canvas.height = 1200;
      document.querySelector("body").prepend(canvas);
	  canvas.style.position = 'fixed';
	  //canavs.style.top = '0px';
	  canvas.style.zIndex='400';
	  
	  
	  
	  	  var JSparameters = {
		  
		  trace: theSpritesheet,

		  maxParticles:300,
		  generationSpeed:1000,
		  TTL:6000,
		  initialPosition: new PS.VectorRange(new PS.Vector(-400,0) , new PS.Vector(0,800)),
		  fillStyle: c,
		  
		  strokeStyle:function(t){
			return "transparent"; 
		  },
		  
		  canvas:canvas,
		  initialVelocity: new PS.VectorRange(new PS.Vector(100,-400), new PS.Vector(500,400)),
		  initialScale:new PS.Vector(0.5,0.5),
		   angularSpeed: b,//Math.PI*2
	
		  };
		  
		  
		var particleSystem = new PS.ParticleSystem(JSparameters);

		  
		  
	  function animate()
	  {	
		  particleSystem.tick();
		  window.requestAnimationFrame(animate);
		  //console.log("ticking");
	  }
	  
	  animate();
		
	  
	  
	
	
});