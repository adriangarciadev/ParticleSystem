var vec = new PS.Vector(0,0);
console.log("vector test :" +JSON.stringify(vec));





window.addEventListener("load", function(){
	

	
	/*DAT GUI STUFF*/

   
	/*DAT GUI STUFF*/
	
	let a = new PS.VectorRange( new PS.Vector(0,0) , new PS.Vector(100,100));
	let b =  new PS.ScalarRange(-Math.PI, Math.PI);
	let c = new PS.ColorRange( "#fcf727", "#ff0000");
	
	//let anotha = new VGenerators.VectorRange(new Vector(-400,000), new Vector(0,800));
	let an = new PS.VectorRange(new PS.Vector(-400,0) , new PS.Vector(0,800));

	let p = new PS.Particle({});
	
	/*var theSpritesheet =  new PS.SpriteSheet(
		{
				img: document.getElementById("fire-fx"),
				//ncols:9,
				//nrows:4,
				//maxSprites: 36,
				frameWidth: 100,
				frameHeight: 237,
				//frameTime : 100
				prerenderMode: true,
				rotateFromCenter:false
		});
	*/
	
	
	//explosion
	/*var theSpritesheet =  new PS.SpriteSheet(
		{
				img: document.getElementById("fire-fx"),
				ncols:7,
				nrows:7,
				maxSprites: 49,
				frameWidth: 127,
				frameHeight: 127,
				frameTime : 30,
				//color: new PS.Color(255,0,0,0.5),
				prerenderMode: true,
			//	prerenderNum: 3//compositeOperation : 'source-over'
		});

	*/
	
	/*
	//bird
	var theSpritesheet =  new PS.SpriteSheet(
		{
				img: document.getElementById("fire-fx"),
				ncols:5,
				nrows:4,
				maxSprites: 20,
				frameWidth: 240,
				frameHeight: 314,
				frameTime : 30,
				prerenderMode: true,
				//color: new PS.ColorList( [ new PS.Color(0,0,0,0.5), new PS.Color(255,0,0, 0.5),  new PS.Color(0,255,0,0.5), new PS.Color(0,0,255, 0.5) ] , true)
				//color: new PS.ColorRange( new PS.Color(0,0,0,1) , new PS.Color(0,255,0,1))
		});
*/
	
		
		//leaf
		var theSpritesheet =  new PS.SpriteSheet(
		{
				img: document.getElementById("fire-fx"),
				frameWidth: 512,
				frameHeight: 363,
			//	prerenderMode:true
				
		});
		
	
		
		  var canvas = document.createElement("canvas");
		  canvas.width = 1600;
		  canvas.height = 1200;
		  document.querySelector("body").prepend(canvas);
		 // canvas.style.position = 'fixed';
		  //canavs.style.top = '0px';
		  canvas.style.zIndex='400';
	  
	  
		  var theColorTimeline = new PS.ColorTimeline({
		  
			  values: [ [0 , new PS.Color(255,0,0,1)], [100 , new PS.Color(0,255,0,1)], [200 , new PS.Color(0,0,255,1)], [500 , new PS.Color(255,0,0,1)]],
			  loop: true
			}
		);
	  
	  	  var JSparameters = {
		//  clear:false,
		  trace: theSpritesheet,

		  maxParticles:1000,
		  generationSpeed:60,
		  TTL:15000,
		  initialPosition: new PS.VectorRange(new PS.Vector(-400,0) , new PS.Vector(-399,1000)),
		  //initialPosition: new PS.VectorArcRange( 0,6.2,800,800, new PS.Vector(500,500) ) ,
		  fillStyle: c,
		  
		  strokeStyle:function(t){
			return "transparent"; 
		  },
		  
		  canvas:canvas,
		  
		  initialVelocity: new PS.VectorRange(new PS.Vector(400,-400), new PS.Vector(600,400)),
		  //initialVelocity: new PS.VectorArcRange(0,6.2,-500,-500),
		  initialScale:new PS.Vector(0.2,0.2),
		  //initialScale:new PS.VectorRange(new PS.Vector(-0.5,0.5), new PS.Vector(-1.5,1.5), true),
		  angularSpeed: b,
		  //color: new PS.Color(255,0,0,0.5),//ath.PI*2
		  //color: new PS.ColorRange(new PS.Color(0,0,0,0.5), new PS.Color(255,255,255,0.5)),//ath.PI*2
		  //colorTimeline: theColorTimeline,
		  options:{initialPosition:{
							type:'Vector',
							Vector:new PS.Vector(0,0),
							VectorRange: new PS.VectorRange(new PS.Vector(-200,0), new PS.Vector(-200,500))
							
								 }
				}
		  };
		  
		  
	
		  
		  
		//var particleSystem = new PS.ParticleSystem(JSparameters);
		
		
	let treeSwing = {
		 
		 canvas: document.getElementById("tree-swing"),
		 maxParticles:60,
		 generationSpeed:10,
		 TTL:6000,
		 initialPosition: new PS.VectorRange(new PS.Vector(0,0) , new PS.Vector(0,1000)),
		initialVelocity: new PS.VectorRange(new PS.Vector(400,100), new PS.Vector(600,200)),
		initialScale: 	new PS.VectorRange(new PS.Vector(0.5,0.5), new PS.Vector(1.5,1.5), true),
		angularSpeed: new PS.ScalarRange(-2*Math.PI, 2*Math.PI),


		 trace:   new PS.SpriteSheet(
			{
					img: document.getElementById("tree-swing-leaf"),
					frameWidth: 40,
					frameHeight: 40,
				//	prerenderMode:true
					
			}),
		
		
	}
	
	let birdSprite =  {
		 
		 canvas: document.getElementById("bird-sprites"),
		 maxParticles:60,
		 generationSpeed:10,
		 TTL:6000,
		 initialPosition: new PS.VectorRange(new PS.Vector(0,0) , new PS.Vector(0,1000)),
		initialVelocity: new PS.VectorRange(new PS.Vector(700,-400), new PS.Vector(900,-200)),
		initialScale: 	new PS.VectorRange(new PS.Vector(-1.5, 1.5), new PS.Vector(-0.5 , 0.5), true),
	

		 trace:   new PS.SpriteSheet(
			{
					img: document.getElementById("bird-flock-sprite"),
					ncols:5,
					nrows:4,
					maxSprites: 20,
					frameWidth: 240,
					frameHeight: 314,
					frameTime : 30,
					//prerenderMode: true,
		
					
			}),
		
		
	}
	
	let coins =  {
	 
	 canvas: document.getElementById("coins-canvas"),
	 maxParticles:100,
	 generationSpeed:50,
	 TTL:6000,
	 initialPosition: new PS.Vector(512,340),
	 initialVelocity: new PS.VectorArcRange(-Math.PI/3, -2*Math.PI/3, 600, 900),
	 initialScale: new PS.Vector(0.8,0.8),
	 acceleration : PS.Vector.Gravity,
	

	 trace:   new PS.SpriteSheet(
		{
				img: document.getElementById("coins"),
				ncols:10,
				nrows:1,
				maxSprites: 10,
				frameWidth: 100,
				frameHeight: 100,
				frameTime : 30,
				//prerenderMode: true,
	
				
		}),
	
	
	}
	
	
	let explosion =  {
	 
	 canvas: document.getElementById("explosion-canvas"),
	 maxParticles:600,
	 generationSpeed:400,
	 TTL:6000,
	initialPosition: new PS.VectorRange(new PS.Vector(0,0) , new PS.Vector(1024,768)),
	//initialVelocity: new PS.VectorRange(new PS.Vector(200,-200), new PS.Vector(300,200)),
	//acceleration: new PS.Vector(0,-200),
	attractor : {translation: new PS.Vector(0,0) , strength:-100000, radius: 100},

	 trace:   new PS.SpriteSheet(
		{
				img: document.getElementById("explosion"),
				ncols:7,
				nrows:7,
				maxSprites: 49,
				frameWidth: 127,
				frameHeight: 127,
				frameTime : 30,
				//color: new PS.Color(255,0,0,0.5),
				prerenderMode: true,
				//prerenderMode: true,
	
				
		}),
	
	
	}
	
	explosion.canvas.addEventListener('mousemove', attractor, false);
	explosion.canvas.addEventListener('mouseout', stopAttractor, false);
	explosion.canvas.addEventListener('mouseenter', startAttractor, false);
	
	
	function stopAttractor(evt){explosion.attractor.strength=0;}
	function startAttractor(evt){explosion.attractor.strength=-10000;}
	
	function attractor(evt)
	{
		var rect = explosion.canvas.getBoundingClientRect();
		let canvasPos = {
			x: (evt.clientX - rect.left) / (rect.right - rect.left) * explosion.canvas.width,
			y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * explosion.canvas.height
		};
		
	
		explosion.attractor.translation.x = canvasPos.x;
		explosion.attractor.translation.y = canvasPos.y;
		
	}
	
	//var particleSystem = new PS.ParticleSystem(treeSwing);
	//var particleSystem = new PS.ParticleSystem(birdSprite);
	var particleSystem = new PS.ParticleSystem(explosion);


		  
		var stats = new Stats();
		stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild( stats.dom );

		  
	  function animate()
	  {	
		stats.begin();
		
		particleSystem.tick();
		
		stats.end();
		
		window.requestAnimationFrame(animate);
		  //console.log("ticking");
	  }
	  
	  animate();
		
	  
	  
	
	
});