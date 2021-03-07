var vec = new PS.Vector(0,0);
console.log("vector test :" +JSON.stringify(vec));





window.addEventListener("load", function(){
	
	
	function systemChanged(par)
	{
		switch(par.options.initialPosition.type)
		{
			case 'Vector':
				par.options.initialPosition.VF.show();
				par.options.initialPosition.VRF.hide();
				par.options.initialPosition.VARF.hide();
				par.initialPosition = par.options.initialPosition.Vector;
				break;
			case 'VectorRange':
				par.options.initialPosition.VF.hide();
				par.options.initialPosition.VRF.show();
				par.options.initialPosition.VARF.hide();
				par.initialPosition = par.options.initialPosition.VectorRange;
				break;
			default:break;
			
		}
		
		particleSystem = new PS.ParticleSystem(par);
		
		//console.log("I've changed come again " + JSON.stringify(par.maxParticles) );
		
	}
	function otherTest(par)
	{
		console.log(JSON.stringify(par));
	}
	
	var obj = {
        message: 'Hello World',
        displayOutline: false,

        maxSize: 6.0,
        speed: 5,

        height: 10,
        noiseStrength: 10.2,
        growthSpeed: 0.2,

        type: 'three',

        explode: function () {
          alert('Bang!');
        },

        color0: "#ffae23", // CSS string
        color1: [ 0, 128, 255 ], // RGB array
        color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
        color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
    };
	
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
		  
		  
		
		var gui = new dat.gui.GUI();
		var f1 = gui.addFolder('Basic Parameters')
		f1.open();
		f1.add(JSparameters, 'maxParticles').onChange(function(){systemChanged(JSparameters)});
		f1.add(JSparameters, 'generationSpeed').onChange(function(){systemChanged(JSparameters)});
		f1.add(JSparameters, 'TTL').onChange(function(){systemChanged(JSparameters)});
		
		let f2 = gui.addFolder('Initial Position');
			f2.add(JSparameters.options.initialPosition, 'type', [ 'Vector', 'VectorRange', 'VectorArcRange' ] ).onChange(function(){systemChanged(JSparameters)});
		
		var alias = JSparameters.options.initialPosition;
		alias.VF = f2.addFolder('Vector');
			alias.VF.open();
			alias.VF.add(JSparameters.options.initialPosition.Vector, 'x').onChange(function(){systemChanged(JSparameters)});
			alias.VF.add(JSparameters.options.initialPosition.Vector, 'y').onChange(function(){systemChanged(JSparameters)});
		alias.VRF = f2.addFolder('VectorRange');
			alias.VRF.open();
		JSparameters.options.initialPosition.VRF.hide();
			let VRFMin = alias.VRF.addFolder('VectorRangeMin');
				VRFMin.open();
				VRFMin.add(JSparameters.options.initialPosition.VectorRange.min, 'x').onChange(function(){systemChanged(JSparameters)});
				VRFMin.add(JSparameters.options.initialPosition.VectorRange.min, 'y').onChange(function(){systemChanged(JSparameters)});
			let VRFMax = alias.VRF.addFolder('VectorRangeMax');
				VRFMax.open();
					VRFMax.add(JSparameters.options.initialPosition.VectorRange.max, 'x').onChange(function(){systemChanged(JSparameters)});
					VRFMax.add(JSparameters.options.initialPosition.VectorRange.max, 'y').onChange(function(){systemChanged(JSparameters)});
		alias.VARF = f2.addFolder('VectorArcRange');
	

	
		gui.add(obj, 'displayOutline');
		gui.add(obj, 'explode');

		//gui.add(obj, 'maxSize').min(-10).max(10).step(0.25);
		gui.add(obj, 'maxSize').onChange(function(){otherTest(obj)});
		gui.add(obj, 'height').step(5); // Increment amount

		// Choose from accepted values
		gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

		// Choose from named values
		gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );

		/*var f1 = gui.addFolder('Colors');
		f1.addColor(obj, 'color0');
		f1.addColor(obj, 'color1');
		f1.addColor(obj, 'color2');
		f1.addColor(obj, 'color3');
*/
	//	var f2 = gui.addFolder('Another Folder');
	//	f2.add(obj, 'noiseStrength');

		var f3 = f2.addFolder('Nested Folder');
		f3.add(obj, 'growthSpeed');
		
		  
		  
		var particleSystem = new PS.ParticleSystem(JSparameters);

		  
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