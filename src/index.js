import { Vector } from './Vector.js';
import { Color } from './Color.js';
import {VectorGenerator, VectorRange, VectorArcRange, VectorFunction} from './Generators/VectorGenerator.js'
import {ColorGenerator, ColorRange, ColorFunction} from './Generators/ColorGenerator.js'
import {ScalarGenerator, ScalarRange, ScalarFunction} from './Generators/ScalarGenerator.js'
import {Particle} from './Particle.js'
import {Sprite, TraceList, SpriteSheet, TraceSheet} from './Sprites/Sprite.js'
import {ParticleSystem} from './ParticleSystem.js'


export {Vector, Color,  VectorGenerator, VectorRange, VectorArcRange, VectorFunction,
ColorGenerator, ColorRange, ColorFunction,
ScalarGenerator, ScalarRange, ScalarFunction,
Sprite, TraceList, SpriteSheet, TraceSheet,
Particle, ParticleSystem};


/*
console.log("TESTING THIS SHIT 2");

let vec = new Vector(5,5);

console.log(vec);





document.addEventListener("DOMContentLoaded", function(){
	
	
	let a = new VectorRange( new Vector(0,0) , new Vector(100,100));
	let b =  new ScalarRange(-Math.PI, Math.PI);
	let c = new ColorRange( "#fcf727", "#ff0000");
	let myColor = new Color(0,0,0);
	
	//let anotha = new VGenerators.VectorRange(new Vector(-400,000), new Vector(0,800));
	let an = new VectorRange(new Vector(-400,0) , new Vector(0,800));

	let p = new Particle({});
	
	var theSpritesheet =  new SpriteSheet(
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

		  maxParticles:45,
		  generationSpeed:1000,
		  TTL:6000,
		  initialPosition: new VectorRange(new Vector(-400,0) , new Vector(0,800)),
		  fillStyle: c,
		  
		  strokeStyle:function(t){
			return "transparent"; 
		  },
		  
		  canvas:canvas,
		  initialVelocity: new VectorRange(new Vector(100,-400), new Vector(500,400)),
		  initialScale:new Vector(5,5),
		   angularSpeed: b,//Math.PI*2
	
		  };
		  
		  
		var particleSystem = new ParticleSystem(JSparameters);

		  
		  
	  function animate()
	  {	
		  particleSystem.tick();
		  window.requestAnimationFrame(animate);
		  //console.log("ticking");
	  }
	  
	  animate();
		
	  
	  
	
	
});*/