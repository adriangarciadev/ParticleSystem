(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PS"] = factory();
	else
		root["PS"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Color": () => (/* reexport */ Color),
  "ColorFunction": () => (/* reexport */ ColorFunction),
  "ColorGenerator": () => (/* reexport */ ColorGenerator),
  "ColorRange": () => (/* reexport */ ColorRange),
  "Particle": () => (/* reexport */ Particle),
  "ParticleSystem": () => (/* reexport */ ParticleSystem),
  "ScalarFunction": () => (/* reexport */ ScalarFunction),
  "ScalarGenerator": () => (/* reexport */ ScalarGenerator),
  "ScalarRange": () => (/* reexport */ ScalarRange),
  "Sprite": () => (/* reexport */ Sprite),
  "SpriteSheet": () => (/* reexport */ SpriteSheet),
  "TraceList": () => (/* reexport */ TraceList),
  "TraceSheet": () => (/* reexport */ TraceSheet),
  "Vector": () => (/* reexport */ Vector),
  "VectorArcRange": () => (/* reexport */ VectorArcRange),
  "VectorFunction": () => (/* reexport */ VectorFunction),
  "VectorGenerator": () => (/* reexport */ VectorGenerator),
  "VectorRange": () => (/* reexport */ VectorRange)
});

;// CONCATENATED MODULE: ./src/MathUtils.js



class MathUtils
{
    static getRandom(min, max)
    {
       return Math.random() * (max - min) + min;
    }
    static randomTranslation(min, max)
    {
        return Vector.getRandom(min,max);
    }

    static watchDelta (delta)
    {
        if(delta > 30)
            return 17;

        else
            return delta;    
    }
    static lerp(x,y,a)
    {
       return x * (1 - a) + y * a;
    }

}


;// CONCATENATED MODULE: ./src/Vector.js



class Vector
{   
    static rotateVector(v, angle)
    {
        v.x = v.x*Math.cos(angle) - v.y*Math.sin(angle);
        v.y = v.x*Math.sin(angle) + v.y*Math.cos(angle);
    }
    static scaleVector(v, s)
    {
        v.x=v.x*s;
        v.y=v.y*s;

    }
	equals(v)
	{
		return this.x == v.x && this.y == v.y;
	}

    isZero()
    {
        return( this.x== 0 && this.y==0);
    }

    translateInto(v,w)
    {
        v.x=this.x + w.x;
        v.y=this.y + w.y;
    }

    rotateInto(v, angle)
    {
        v.x = this.x*Math.cos(angle) - this.y*Math.sin(angle);
        v.y = this.x*Math.sin(angle) + this.y*Math.cos(angle);

    }
    scaleInto(v, s)
    {
        v.x=this.x*s;
        v.y=this.y*s;
 

    }
    transformInto(v, Transform)
    {

        v.x = this.x*Math.cos(Transform.rotation) - this.y*Math.sin(Transform.rotation);
        v.y = this.x*Math.sin(Transform.rotation) + this.y*Math.cos(Transform.rotation);

        v.x=v.x*Transform.scale.x;
        v.y=v.y*Transform.scale.y;

       
        //v.x+= Transform.translation.getValue(0).x;
        //v.y+= Transform.translation.getValue(0).y;

        //console.log("test: " + Transform.translation.getValue().y );

        v.x+= Transform.translation.x;
        v.y+= Transform.translation.y;

    }

    transformIntoValues(v, Transform, elapsed)
    {
        //console.log("rotation value:" +Transform.rotation.getValue())

  

        v.x = this.x*Math.cos(Transform.rotation.getValue(elapsed)) - this.y*Math.sin(Transform.rotation.getValue(elapsed));
        v.y = this.x*Math.sin(Transform.rotation.getValue(elapsed)) + this.y*Math.cos(Transform.rotation.getValue(elapsed));

  
        v.x=v.x*Transform.scale.getValue(elapsed).x;
        v.y=v.y*Transform.scale.getValue(elapsed).y;
        


       
        //v.x+= Transform.translation.getValue(0).x;
        //v.y+= Transform.translation.getValue(0).y;

        //console.log("test: " + Transform.translation.getValue().y );

        v.x+= Transform.translation.getValue(elapsed).x;
        v.y+= Transform.translation.getValue(elapsed).y;

        
    }


    constructor(x=0,y=0)
    {
        this.x=x;
        this.y=y;

    }

    get width() {

		return this.x;

	}

	set width( value ) {

		this.x = value;

	}

	get height() {

		return this.y;

	}

	set height( value ) {

		this.y = value;

	}

	set( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	}

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
    }
    addXY(x,y)
    {
        this.x += x;
        this.y += y;
    }

    addInto(v,w)
    {
        this.x = v.x + w.x;
        this.y = v.y + w.y;

    }
    copy()
    {
        return new Vector(this.x, this.y);

    }

    copyInto(v)
    {
        this.x = v.x;
        this.y = v.y;
    }
    static getRandom(min, max)
    {
        if(!min || !max)
        {
            console.error("min or max are not defined please correct your inputs");
            return new Vector(0,0);

        }

        if(min.x >max.x || min.y > max.y)
        {
            console.error("Trying to generate a random number with the wrong parameters, min is greater than max for example\n a Default vector has been created please correct the inputs")
            return new Vector(0,0)
        }

        return new Vector(
            MathUtils.getRandom(min.x, max.x),
            MathUtils.getRandom(min.y, max.y)
             );

    }

    lerpInto(v, w , a)
    {
        this.x = MathUtils.lerp (v.x , w.x , a);
        this.y = MathUtils.lerp (v.y , w.y ,a );
        //return x * (1 - a) + y * a;
    }
    
}
Vector.Zero = new Vector(0,0);


;// CONCATENATED MODULE: ./src/Color.js
class Color
{
	
	constructor(r,g,b)
	{
		//var fromHex = Color.hexToRGB(hex);	
		
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
	getRGB()
	{
		return "rgb("+ +this.r + "," + +this.g + "," + +this.b + ")";

	}
	

    static  hexToRGB(h) {
        let r = 0, g = 0, b = 0;
      
        // 3 digits
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
      
        // 6 digits
        } else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        
        return new Color(parseInt(r), parseInt(g), parseInt(b));
    
	}

}


;// CONCATENATED MODULE: ./src/Generators/VectorGenerator.js



class VectorGenerator
{
    constructor()
    {
  
    }

    generate()
    {
        console.error("Please override me called from vector generator");
    }
}

class VectorRange extends VectorGenerator
{
    constructor(min, max)
    {
        
        super();
        this.min = min;
        this.max = max;

    }

    generate()
    {
        return Vector.getRandom(this.min, this.max);

    }


}

class VectorArcRange extends VectorGenerator
{
    constructor(arcStart, arcEnd, vStart, vEnd)
    {
        super();
        this.arcStart = arcStart ;
        this.arcEnd = arcEnd ;
        this.vStart = vStart;
        this.vEnd = vEnd;


    }

    generate()
    {
        var angle = MathUtils.getRandom(this.arcStart, this.arcEnd);
        var speed =MathUtils.getRandom(this.vStart, this.vEnd);
        return new Vector(speed*Math.cos(angle) , speed*Math.sin(angle));
    }

}

class VectorFunction
{
    constructor(f, param)
    {
        this.f = f;
        this.param = param;
    }

}



;// CONCATENATED MODULE: ./src/Generators/ColorGenerator.js



class ColorGenerator 
{
	constructor()
    {
  
    }

    generate()
    {
        console.error("Please override me called from Color Generator");
    }
		
	
	
}

class ColorRange extends ColorGenerator
{
    constructor(min, max)//GET AS HEX STRING
    {
		super();
        this.min = Color.hexToRGB(min);//gets new color
        this.max = Color.hexToRGB(max);//gets new color
    }
    
    generate()
    {
        var result = new Color(MathUtils.getRandom(this.min.r, this.max.r) , MathUtils.getRandom(this.min.g, this.max.g),  MathUtils.getRandom(this.min.b, this.max.b) );
        return result.getRGB();
    }

}

class ColorFunction
{
    constructor(f,param)
    {
        this.f=f;
        this.param = param;
    }

}



;// CONCATENATED MODULE: ./src/Generators/ScalarGenerator.js



class ScalarGenerator
{
    constructor()
    {
  
    }

    generate()
    {
        console.error("Please override me called from Scalar Generator");
    }
}

class ScalarRange extends ScalarGenerator
{
    constructor(min,max)
    {
        super();
        this.min = min;
        this.max = max;
    }

    generate()
    {
        return MathUtils.getRandom(this.min, this.max);
    }

}
class ScalarFunction
{
    constructor(f,param)
    {
        this.f=f;
        this.param = param;
    }

}


;// CONCATENATED MODULE: ./src/Particle.js


//import {Particle} from './Particle.js'


class Particle
{

    constructor( parameters, particleSystem )
    {
        this._PS = particleSystem;
        this._delta = 0;
        this.TTL    =           parameters.TTL;
        this.elapsed=           parameters.elapsed || 0;
        this.velocity = parameters.velocity || new Vector(0,0);
        this.angularSpeed =  parameters.angularSpeed;
        this.scaleVelocity = parameters.scaleVelocity;
        this.trace = parameters.trace || null;
        this.creationTime = performance.now();
        this.currTime = performance.now();
        this.strokeStyle = parameters.strokeStyle || "#000000FF";
        this.fillStyle = parameters.fillStyle;

        this.timelineOffset = parameters.timelineOffset || 0;
        
        this.timeLineElapsed = 0;
        this.isPlaying = parameters.autoplay || true;
        


        this.Transform = parameters.Transform;
        
        /*{
            translation : parameters.translation || new Vector(0,0),
            rotation : parameters.rotation||0,
            scale : parameters.scale || new Vector(1,1)
        }*/

        
    }

    timelinePlay()
    {
        this.isPlaying = true;
    }
    timelineStop()
    {
        this.isPlaying = false;
    }

    timelineRewind()
    {
        this.timeLineElapsed =0;
    }
    timeLineSetTime(t)
    {
        this.timeLineElapsed = t;
    }


    updateTranslation()
    {

        this.Transform.translation.dynamic.addXY(this.velocity.x*this._delta/1000, this.velocity.y*this._delta/1000);
        
               
    }

    updateRotation()
    {
        this.Transform.rotation.dynamic +=(this.angularSpeed*this._delta/1000);

    }
    updateScale()
    {
        this.Transform.scale.dynamic.addXY(this.scaleVelocity.x*this._delta/1000, this.scaleVelocity.y*this._delta/1000);
    }

    updateTransforms()
    {
        this.updateTranslation();
        this.updateRotation();
        this.updateScale();


    }

    tick()
    {
        this._delta = performance.now() - this.currTime;

        this._delta = MathUtils.watchDelta(this._delta);

        this.elapsed += this._delta; 

        if(this.isPlaying)
        {
            this.timeLineElapsed+= this._delta;
        }

        this.currTime = performance.now();

        this._PS.context.lineWidth = 10;


        if(this._PS.hasCanvas() && this._PS.hasContext())
        {

            this.updateTransforms();
        
      
            /*DO THE DRAWING*/
			this.trace.tick(this);

            

            //FILL TEST
            if(typeof (this.fillStyle) == 'function')
            {
                this._PS.context.fillStyle = this.fillStyle(this.elapsed);
                
            }
            else{
                    this._PS.context.fillStyle   = this.fillStyle;                
            }
            this._PS.context.fill();
            //END FILL


           //STROKE TEST            
            if(typeof (this.strokeStyle) == 'function')
            {
                this._PS.context.strokeStyle = this.strokeStyle(this.elapsed);
            }
            else{
                    this._PS.context.strokeStyle   = this.strokeStyle;                
            }

            this._PS.context.stroke();
            //END STROKE
             
           

        }

    }
    //type

}


;// CONCATENATED MODULE: ./src/Sprites/Sprite.js
class Sprite
{
    constructor(){}

}

class TraceList extends Sprite
{
    constructor(traces)
    {
        super();
        this.traces = traces;
    }

    tick(particle)
    {
        for(var i=0;i<this.traces.length;i++)
        {

            this.traces[i].tick(particle._PS.context, particle.Transform, particle);
        }
    }
}
class SpriteSheet extends Sprite
{
    //constructor(img,  ncols = 1 , nrows = 1, maxSprites = 1,  frameWidth, frameHeight, timePerFrame=200, rotateFromCenter = true, autoplay = true )
    constructor(par)
    {
        super();
        this.img = par.img;
        this.maxSprites = par.maxSprites || 1;
        
        
        if(!par.frameWidth)
        {    console.error("set the frame width correctly");
            this.frameWidth = 0;
        }
        else
            this.frameWidth = par.frameWidth;
        

        if(!par.frameHeight)
        {    
            console.error("set the frame height correctly");
            this.frameHeight = 0;
        }
        else
            this.frameHeight = par.frameHeight;
            
        
        this.ncols = par.ncols || 1;
        this.nrows = par.nrows || 1;
        

        this.rotateFromCenter = par.rotateFromCenter || true;
        this.autoplay = par.autoplay || true;
        this.loop = true;
        this.frameTime = par.frameTime || 200;
        this.currentSprite = par.curFrame || 0;
        this.maxTime = 1800;
        this.elapsed = 0;
    }

    setFrame(n)
    {
        this.currentSprite = n;
    }

    tick(particle)
    {
        if(this.autoplay)
            this.elapsed = particle.elapsed;
        
        
        
        var ctx = particle._PS.context;

        ctx.translate(particle.Transform.translation.getValue(particle.elapsed).x  , particle.Transform.translation.getValue(particle.elapsed).y);
        ctx.scale(particle.Transform.scale.getValue(particle.elapsed).x, particle.Transform.scale.getValue(particle.elapsed).y);
        ctx.rotate(particle.Transform.rotation.getValue(particle.elapsed));

        if(this.loop)
            this.currentSprite =  ( Math.floor( this.elapsed / this.frameTime )) % this.maxSprites;  
        else    
            this.currentSprite = Math.floor( this.elapsed / this.frameTime );

        
        ctx.drawImage(this.img,
            (this.currentSprite % this.ncols)*this.frameWidth,
            Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
            this.frameWidth, this.frameHeight  ,  this.rotateFromCenter?-this.frameWidth / 2:0, this.rotateFromCenter?-this.frameHeight / 2:0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
  
   
        
        //RESET
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

}
class TraceSheet extends Sprite {}


;// CONCATENATED MODULE: ./src/VariableWatcher/VariableWatcher.js
class VariableWithTimeline
{
    constructor(val, dynamic, timeline)//both references if objects
    {
        this.val = val;
        this.dynamic = dynamic;
        this.timeline = timeline;
        

    }

    getValue(t)
    {
        //returns the sum of base and timeline.
        console.error("has to be implemented");
    }
    getbase()
    {
        //returns the base
        console.error("has to be implemented");
    }
    getTimelineValue(t)
    {
        //returns the timeline
        console.error("has to be implemented")
    }

}

class ScalarValue extends VariableWithTimeline
{
    constructor(val,dynamic, timeline=null)
    {
        super(val, dynamic, timeline);
    }

    getValue(t = 0)
    {
        if(this.timeline)
        {
            this.val = this.dynamic + this.timeline.getValue(t);
        }
        else
        {
            this.val = this.dynamic;
        }
        return this.val;
    }
}

class VectorValue extends VariableWithTimeline
{
    //VECTOR, VECTOR, TIMELINE
    constructor( val, dynamic, timeline = null)
    {
        super(val, dynamic, timeline);
    }

    getValue(t = 0)
    {
        if(this.timeline)
        {
            this.val.addInto(this.dynamic, this.timeline.getValue(t));
        }
        else
        {
            this.val.copyInto(this.dynamic);
        }

        return this.val;
    }

} 

class ColorValue extends (/* unused pure expression or super */ null && (VariableWithTimeline))
{


}



;// CONCATENATED MODULE: ./src/ParticleSystem.js










class ParticleSystem
{
    constructor(parameters)
    {
        this._delta=0;
        this.elapsed=0;
        this.currTime = performance.now();
        this.parameters = parameters;
        this.maxParticles = parameters.maxParticles || 5;
     
        this.canvas     =       parameters.canvas || null;
        this.context = this.canvas.getContext('2d') || null;

        this.generationSpeed= parameters.generationSpeed || 5;
        this.generationAllowance = this.generationSpeed;

        this.particles = [];
        this.particleGlobalIndex = 0;
        
       
    }


    hasCanvas()
    {
        return (this.canvas != null);
    }
    hasContext()
    {
        return(this.context != null);
    }

    tick()
    {
        this._delta = performance.now() - this.currTime;

        this._delta = MathUtils.watchDelta(this._delta);

        this.elapsed +=this._delta; 
        this.currTime = performance.now();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  

        for(var i = 0 ; i < this.particles.length;i++)
        {
            //TODO
            this.particles[i].tick();
            
                
            if( this.particles[i].TTL != 0 && this.particles[i].elapsed >= this.particles[i].TTL)
            {

                this.particles[i]._PS = null;
                this.particles.splice(i, 1);
                
            }
        }


        while(this.particles.length < this.maxParticles && this.generationAllowance >1)
        {

            this.particleGlobalIndex++;
            this.particles.push( this._generateParticle(this.parameters, this.particles.length) );
            this.generationAllowance--;

         
        }

        this.generationAllowance+=this.generationSpeed*this._delta/1000;


    }

    _handleVectorValue(val, def, error="")
    {
        if(val)
        {
            
            if(val instanceof(Vector))
            {
                return val.copy(); 
            }
            else if(val instanceof(VectorGenerator))
            {
                return val.generate();
            }
            else if(val instanceof(VectorFunction))
            {
                val.param.context = this;

                return val.f(val.param);
        
            }
            else{
                console.error(error);

            }
           
        }
        else{
            return def.copy();
        }


    }

    _handleScalarValue(val, def, error="")
    {
        if(val)
        {
            if(typeof(val) == 'number' )
            {
                return val;
            }
            else if(val instanceof ScalarGenerator)
            {
                return val.generate();
            }
            else if(val instanceof ScalarFunction)
            {
                console.error("not implemented yet");
                return def;
            }
            else{
                console.error(error);
            }

        }
        else {
          
            return def;
        }

    }
    _handleColorValue(val, def="#000000", error)
    {
        if(val)
        {
            if(typeof(val) == 'string' )
            {
                //requires a well formed color
                return val;
            }
            else if(val instanceof ColorGenerator)
            {
                return val.generate();
            }
            else if(val instanceof ColorFunction)
            {
                return def;
            }
            else{
                console.error(error);
            }

        }
        else {
          
            return def;
        }

    }



  

    _generateParticle(parameters, arrayIndex)
    {            
        //
        var parametersParticle = {

        TTL :  this._handleScalarValue(parameters.TTL, 0),
         
        elapsed: parameters.elapsed||0,
        
        velocity: this._handleVectorValue( parameters.initialVelocity , new Vector(0,0)),           
        
        angularSpeed : this._handleScalarValue(parameters.angularSpeed, 0 ,"ERROR WITH ANGULAR SPEED"),
        
        scaleVelocity: this._handleVectorValue( parameters.scaleVelocity , new Vector(0,0)),
        
        trace:parameters.trace,


        Transform:{
            translation :
            new VectorValue(new Vector(0,0), this._handleVectorValue( parameters.initialPosition , new Vector(0,0)), parameters.translationTimeline || null  ),
            rotation :
             new ScalarValue(0 ,  this._handleScalarValue(parameters.initialRotation, 0) , parameters.rotationTimeline || null ), //this._handleScalarValue(this.parameters.initialRotation, 0),
            scale :
             new VectorValue(new Vector(0,0),this._handleVectorValue( parameters.initialScale , new Vector(1,1)) , parameters.scaleTimeline || null)
            
        },
        
        
        strokeStyle :parameters.strokeStyle || "#000000FF",

        fillStyle : this._handleColorValue(parameters.fillStyle,"#000000")


        };
        

        return new Particle(parametersParticle, this);
    }

}


;// CONCATENATED MODULE: ./src/index.js













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
/******/ 	return __webpack_exports__;
/******/ })()
;
});