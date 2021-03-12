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
  "ColorList": () => (/* reexport */ ColorList),
  "ColorRange": () => (/* reexport */ ColorRange),
  "ColorTimeline": () => (/* reexport */ ColorTimeline),
  "Particle": () => (/* reexport */ Particle),
  "ParticleSystem": () => (/* reexport */ ParticleSystem),
  "ScalarFunction": () => (/* reexport */ ScalarFunction),
  "ScalarGenerator": () => (/* reexport */ ScalarGenerator),
  "ScalarRange": () => (/* reexport */ ScalarRange),
  "ScalarTimeline": () => (/* reexport */ ScalarTimeline),
  "Sprite": () => (/* reexport */ Sprite),
  "SpriteSheet": () => (/* reexport */ SpriteSheet),
  "TraceList": () => (/* reexport */ TraceList),
  "TraceSheet": () => (/* reexport */ TraceSheet),
  "Vector": () => (/* reexport */ Vector),
  "VectorArcRange": () => (/* reexport */ VectorArcRange),
  "VectorFunction": () => (/* reexport */ VectorFunction),
  "VectorGenerator": () => (/* reexport */ VectorGenerator),
  "VectorRange": () => (/* reexport */ VectorRange),
  "VectorTimeline": () => (/* reexport */ VectorTimeline)
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
	
	getLength()
	{
		return Math.sqrt( this.x*this.x + this.y*this.y);
	}
	getUnit()
	{
		let length  = this.getLength();
		return new Vector(this.x/length, this.y/length);
	}
	
	multiplyScalar(s)
	{
		this.x = this.x*s;
		this.y = this.y*s;
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
	setXY(x,y)
	{
		this.x = x;
		this.y = y;

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
Vector.Gravity = new Vector(0,980);


;// CONCATENATED MODULE: ./src/Color.js


class Color
{
	constructor(r,g,b,a = 1)
	{
		//var fromHex = Color.hexToRGB(hex);	
		
		if(arguments.length == 1 && typeof r == 'string')
		{
			this.createFromHex(r);
			console.warning("created a color from a hex string");
		}
		else {
		
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;
		}
	}
	
	getRGB()
	{
		return "rgb("+ +this.r + "," + +this.g + "," + +this.b + ")";

	}
	getRGBA()
	{
		return "rgba("+ +this.r + "," + +this.g + "," + this.b + "," +this.a + ")";

	}
	
	addInto(a,b)
	{
		this.r = a.r +b.r;
		this.g = a.g +b.g;
		this.b = a.b +b.b;
		this.a = a.a +b.a;
	}
	
	copyInto(val)
	{
		this.r= val.r;
		this.g= val.g;
		this.b= val.b;
		this.a= val.a;
	}
	
	lerpInto(v, w , a)
    {
        this.r = MathUtils.lerp (v.r , w.r ,a );
        this.g = MathUtils.lerp (v.g , w.g ,a );
        this.b = MathUtils.lerp (v.b , w.b ,a );
        this.a = MathUtils.lerp (v.a , w.a ,a );
        //return x * (1 - a) + y * a;
    }
	
	createFromHex(h)
	{
		 let r = 0, g = 0, b = 0, a=1;
      
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
		else if (h.length == 9)
		{
		  r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
		  a = "0x" + h[7] + h[8];
		
		}
		this.r = parseInt(r);
		this.g = parseInt(g);
		this.b = parseInt(b);
		this.a = parseInt(a);
		
		
	}

    static  hexToRGB(h) {
        let r = 0, g = 0, b = 0, a=1;
      
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
		else if (h.length == 9)
		{
		  r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
		  a = "0x" + h[7] + h[8];
		
		}
        
        return new Color(parseInt(r), parseInt(g), parseInt(b), parseInt(a));
    
	}

}
Color.Zero = new Color(0,0,0,1);


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
    constructor(min, max, aspectRatio = false)
    {
        
        super();
        this.min = min;
        this.max = max;
		this.aspectRatio = aspectRatio;
    }

    generate()
    {
		if(this.aspectRatio == true)
		{
			var num = Math.random();
			return new Vector( num *(this.max.x - this.min.x) + this.min.x, num*(this.max.y - this.min.y) + this.min.y);
		}
		else
			return Vector.getRandom(this.min, this.max);

    }


}

class VectorArcRange extends VectorGenerator
{
    constructor(arcStart, arcEnd, vStart, vEnd, vOffset = Vector.Zero)
    {
        super();
        this.arcStart = arcStart ;
        this.arcEnd = arcEnd ;
        this.vStart = vStart;
        this.vEnd = vEnd;
		this.vOffset = vOffset;


    }

    generate()
    {
        var angle = MathUtils.getRandom(this.arcStart, this.arcEnd);
        var speed =MathUtils.getRandom(this.vStart, this.vEnd);
        return new Vector(this.vOffset.x + speed*Math.cos(angle) , this.vOffset.y + speed*Math.sin(angle));
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
        console.error("Please override me. Called from Color Generator");
    }
		
	
	
}

class ColorRange extends ColorGenerator
{
    constructor(min, max)//GET AS HEX STRING
    {
		super();
        this.min = min;//gets new color
        this.max = max;//gets new color
    }
    
    generate()
    {
        var result = new Color(MathUtils.getRandom(this.min.r, this.max.r) , MathUtils.getRandom(this.min.g, this.max.g),  MathUtils.getRandom(this.min.b, this.max.b) , MathUtils.getRandom(this.min.a, this.max.a));
        return result;
    }

}

class ColorList extends ColorGenerator
{
	constructor(list, random = false)
	{
		super();
		this.list = list;
		this.current = -1;
		this.random = random;
		
	}
	
	generate()
	{
		if(this.random)
		{
			return this.list[ Math.floor(MathUtils.getRandom (0, this.list.length))]
		}
		else
		{
			this.current++;
			return this.list[this.current % this.list.length];
		}
	}
	
	getSequence()
	{
		this.current++;
		return this.current % this.list.length;
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
        this.acceleration = parameters.acceleration;
		this.attractor  = parameters.attractor;
		this.angularSpeed =  parameters.angularSpeed;
        this.scaleVelocity = parameters.scaleVelocity;
		
        this.trace = parameters.trace || null;
        this.creationTime = performance.now();
        this.currTime = performance.now();
        this.strokeStyle = parameters.strokeStyle || "#000000FF";
        this.fillStyle = parameters.fillStyle;
		this.color = parameters.color;

        this.timelineOffset = parameters.timelineOffset || 0;
        
        this.timeLineElapsed = 0;
        this.isPlaying = parameters.autoplay || true;
        


        this.Transform = parameters.Transform;
		this.shear = parameters.shear;
		this.perspective = parameters.perspective;
        
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

		//this.Transform.translation.dynamic.addXY(this.velocity.x*this._delta/1000, this.velocity.y*this._delta/1000);
		
		let attractorAcceleration = Vector.Zero;
		let val = this.Transform.translation.getValue(this.elapsed);
		
		if(this.attractor)
		{
			let distance =  new Vector( this.attractor.translation.x - val.x,   this.attractor.translation.y-val.y  );
		
			if(this.attractor.radius == 0 || distance.getLength() < this.attractor.radius)
			{	
				
				attractorAcceleration = new Vector( this.attractor.translation.x - val.x,   this.attractor.translation.y-val.y  );
				attractorAcceleration = attractorAcceleration.getUnit();
				attractorAcceleration.multiplyScalar(this.attractor.strength);
			}
		}
		this.Transform.translation.dynamic.addXY((this.velocity.x + this._delta/1000 * (this.acceleration.x+attractorAcceleration.x)/2 )*this._delta/1000, (this.velocity.y+ this._delta/1000 * (this.acceleration.y+attractorAcceleration.y)/2)*this._delta/1000);
        
		this.velocity.addXY((this.acceleration.x+attractorAcceleration.x) * this._delta/1000 , (this.acceleration.y+attractorAcceleration.y) * this._delta/1000 ); 
		
		
		//timestep * (velocity + timestep * acceleration / 2);
               
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

		//TICK HERE TOO
		
		if(this.TTL >0 && this.elapsed >= this.TTL)
			return;

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
                    this._PS.context.fillStyle = this.fillStyle;                
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
    constructor(par)//parameters
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
        

        this.rotateFromCenter = (typeof par.rotateFromCenter  !== 'undefined') ? par.rotateFromCenter : true;
        this.autoplay = par.autoplay || true;
        this.loop = par.loop || true;
        this.frameTime = par.frameTime || 200;
        this.currentSprite = par.curFrame || 0;
        this.maxTime = 1800;
        this.elapsed = 0;
		
		this.privateCanvas = document.createElement("canvas");
			this.privateCanvas.width =  this.frameWidth;
			this.privateCanvas.height = this.frameHeight;
			this.privateCanvas.style.display ='none';
			document.querySelector("body").prepend(this.privateCanvas);
		
		this.optElements = par.prerenderNum || 16;
		this.isOptimized = false;
		this.prerenderMode = par.prerenderMode || false;
		
		this.privateCtx = this.privateCanvas.getContext('2d');
		
		this.color = par.color  || new ColorRange(new Color(0,0,0,0.75) , new Color(255,255,255, 0.75)) ;
		
		this.compositeOperation ='source-over';// par.compositeOperation || 'source-over';
		
		this.atlasMode = par.atlasMode || null;
		this.atlasIndex = 0;
		
	
		
	
					
     /*canvas.width = 1600;
		  canvas.height = 1200;*/
		
	
	}

    setFrame(n)
    {
        this.currentSprite = n;
    }
	
	getColors(){}
	
	getOptElements()
	{
		
		if( this.color instanceof Color )
		{
			return 1;
		}
		else if (this.color instanceof ColorRange)
		{
			
			return this.optElements;
		}
		else if(this.color instanceof ColorList)
		{
			return this.color.list.length;
		}
		else
		{
			console.error("pick the correct color class for your sprite");
		
		}
	}
	
	optimize()
	{
		
		this.optElements  = this.getOptElements();
				
		this.privateCanvas.width = this.frameWidth*this.maxSprites;	
		this.privateCanvas.height = this.frameHeight*this.optElements;	
	
		
		for(var j = 0; j < this.optElements; j++)
		{
			
			var tempRand = this.color.random;
			this.color.random = false;
			var currentColor = this.color instanceof (Color) ? this.color.getRGBA() : this.color.generate().getRGBA();
			this.color.random = tempRand;
			
			
			for(var i = 0 ; i < this.maxSprites ; i ++)
			{
				
									  
				this.privateCtx.drawImage(this.img,
					(i % this.ncols)*this.frameWidth,  //La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen 
					Math.floor(i / this.ncols)*this.frameHeight, //La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
					this.frameWidth,    //El ancho para dibujar la imagen en el canvas destino.
					this.frameHeight,   //El alto para dibujar la imagen en el canvas destino
					this.frameWidth*i,  //La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
					this.frameHeight*j, //La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
					this.frameWidth,
					this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
					
					
				this.privateCtx.globalCompositeOperation = "source-atop";
				
				this.privateCtx.fillStyle = currentColor;
				this.privateCtx .fillRect(this.frameWidth*i, this.frameHeight*j, this.frameWidth, this.frameHeight);
				
				this.privateCtx.globalCompositeOperation = "source-over";
			

			}
		}
		this.isOptimized = true;
		
		//console.log("optimize: ");
		
	}

    tick(particle)
    {
        if(this.autoplay)
            this.elapsed = particle.elapsed;
        
        
        
        var ctx = particle._PS.context;

        ctx.translate( Math.floor(particle.Transform.translation.getValue(particle.elapsed).x  ),  Math.floor(particle.Transform.translation.getValue(particle.elapsed).y));
        ctx.scale( particle.Transform.scale.getValue(particle.elapsed).x, particle.Transform.scale.getValue(particle.elapsed).y);
        ctx.rotate(particle.Transform.rotation.getValue(particle.elapsed));
		
		
		let shear = particle.shear.getValue(particle.elapsed);
		ctx.transform(1, shear.x, shear.y, 1, 0, 0);//shear test

		
		let perspective = particle.perspective.getValue(particle.elapsed);

		
		let scale = 1;
		let angle1 = perspective.x, angle2 = perspective.y;
		let cs = Math.cos(angle1), sn = Math.sin(angle1);
		let h = Math.cos(angle2);
		let a = scale*cs, b = -scale*sn, c = 0;
		let d = h*scale*sn, e = h*scale*cs, f = 0;
		ctx.transform(a, d, b, e, c, f);


		/*PERSPECTIVE TRANSFORM FOR FUTURE VERSIONS 
		
		var cs = Math.cos(angle1), sn = Math.sin(angle1);
		var h = Math.cos(angle2);
		var a = 100*cs, b = -100*sn, c = 200;
		var d = h*100*sn, e = h*100*cs, f = 200;
		ctx.setTransform(a, d, b, e, c, f);
		*/
	
        if(this.loop)
            this.currentSprite =  ( Math.floor( particle.elapsed / this.frameTime )) % this.maxSprites;  
        else    
            this.currentSprite = Math.floor( particle.elapsed / this.frameTime );

        
		//particle.color = null;
		
		ctx.globalCompositeOperation = this.compositeOperation;

		//source-over
		
		if(this.atlasMode)
		{
			if(typeof particle.atlasIndex === 'undefined')
			{
					if(this.atlasMode ='sequential')
					{
						particle.atlasIndex = this.atlasIndex;
						this.atlasIndex++;
						
					}
					else
						particle.atlasIndex = Math.floor(MathUtils.getRandom(0,maxSprites+1));
						
			}			
			
		}
		
		if(this.prerenderMode)
		{
			if(!this.isOptimized)
				this.optimize();		
			
			//prerender mode not working on chrome
						
			if(typeof particle.prerenderIndex === 'undefined')
			{
				
				//bad practice just fast to code right now.
				if(this.color && this.color instanceof ColorList && !this.color.random)
				{
					particle.prerenderIndex = this.color.getSequence();
				
				}
				else 
				{
					particle.prerenderIndex = Math.floor(MathUtils.getRandom(0, this.optElements ))
				}
			}
			
			
			ctx.drawImage(this.privateCanvas,
				this.frameWidth*this.currentSprite,//this.frameWidth*particle.prerenderIndex,
				this.frameHeight*(particle.prerenderIndex),
				//0,
				this.frameWidth,
				this.frameHeight,
				this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0,
				this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);

		}
		else if(particle.color)//color not null
		{

				  
			this.privateCtx.drawImage(this.img,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth,
				this.frameHeight,
				0,
				0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			
			this.privateCtx.globalCompositeOperation = "source-atop";
			
			this.privateCtx.fillStyle = particle.color.getValue(particle.elapsed);
			this.privateCtx .fillRect(0, 0, this.frameWidth, this.frameHeight);
			
			// set composite mode
		
			/*ctx.drawImage(this.privateCanvas,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth, this.frameHeight  ,  this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0, this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			*/

			ctx.drawImage(this.privateCanvas,
				0,
				0,
				this.frameWidth,
				this.frameHeight,
				this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0,
				this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			

				
			this.privateCtx.globalCompositeOperation = "source-over";
			this.privateCtx.clearRect(0, 0, this.privateCanvas.width, this.privateCanvas.height);
					
			  
			//color is set
		}
		else{
						
			ctx.drawImage(this.img,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth, this.frameHeight  ,  this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0, this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
		}
   
        
        //RESET
        ctx.setTransform(1, 0, 0, 1, 0, 0);
		//ctx.resetTransform();
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

class ColorValue extends VariableWithTimeline
{
	//val = Color, dynamic = Color , timeline = colorTimeline
    constructor( val, dynamic, timeline = null)
    {
        super(val, dynamic, timeline);
    }

    getValue(t = 0)
    {
        if(this.timeline)
        {
           this.val.addInto(this.dynamic, this.timeline.getValue(t));// this.val.addInto(this.dynamic, this.timeline.getValue(t));
        }
        else
        {
			this.val.copyInto(this.dynamic);
        }

        return this.val.getRGBA();
    }

}



;// CONCATENATED MODULE: ./src/Timeline/Timeline.js




class timeline
{
    constructor(parameters)//values: array 
    {
        this.values = parameters.values;
        //this.initialTime = parameters.initialTime || 0;
        this.loop = parameters.loop || false;
        this.leftBorder=0;
        this.rightBorder=0;
        this.IOC=0; // INDEX OF NUMBER TO COMPARE
        this.N =  this.values.length;
        this.maxTime = this.values[this.N-1][0]; 
        this.lastT=-50;
        this.value = null;
    }

    copy(val)
    {
        this.value = val;

    }
    doLerp(leftIndex, t)
    {

        var t0 = leftIndex<0 ? 0 :this.values[leftIndex][0];

        var a = (t- t0) /(this.values[leftIndex+1][0] - t0);
          
        this.value =  MathUtils.lerp( ( leftIndex < 0? 0 :this.values[leftIndex][1]) , this.values[leftIndex+1][1] ,a);      

    }


    getValue(t)
    {
        

        if(this.loop)
            t= t%this.maxTime;
        
        if(this.lastT == t)
            return this.value;

        this.lastT = t;

        var leftIndex = this.findIntervalBorderIndex(t);

        
        if(leftIndex == this.N-1)
        {   
            this.copy(this.values[leftIndex][1]); 
           
            return this.value;//final value in the loop
            
        }
        else
        {
            
            this.doLerp(leftIndex, t);

            return this.value;
        }
    
        //function to return a value at a time.
    
    
    }

    findIntervalBorderIndex (point, useRightBorder = false) {
        //If point is beyond given intervals
        if (point <  this.values[0][0])
          return -1
        if (point >  this.values[ this.N - 1][0])
          return  this.N - 1
        //If point is inside interval
        //Start searching on a full range of intervals

        this.leftBorder= 0;
        this.rightBorder = this.N - 1;
          //, leftBorderIndex = 0
          //, rightBorderIndex = intervals.length - 1
        //Reduce searching range till it find an interval point belongs to using binary search
        while (this.rightBorder - this.leftBorder !== 1) {
          this.IOC = this.leftBorder + Math.floor((this.rightBorder - this.leftBorder)/2)
          point >= this.values[this.IOC][0]
            ? this.leftBorder = this.IOC
            : this.rightBorder = this.IOC
        }
        return useRightBorder ? this.rightBorder : this.leftBorder
      }


}


class ScalarTimeline extends timeline
{
    constructor(parameters)
    {
        //values =  matrix
        // [ [tn , vn],[tn+1, vn+1] ]
        //time0 < time1 <time2
        //
        
        super(parameters);
        this.value = 0 ;

    }



}

class VectorTimeline extends timeline
{
    constructor(parameters)
    {
        super(parameters);
        this.value = new Vector(0,0);
    }

    copy(val)
    {
        this.value.copyInto(val);

    }

    doLerp(leftIndex, t)
    {

        var t0 = leftIndex<0 ? 0 :this.values[leftIndex][0];

        var a = (t- t0) /(this.values[leftIndex+1][0] - t0);
      
        this.value.lerpInto( ( leftIndex < 0? Vector.Zero :this.values[leftIndex][1]) , this.values[leftIndex+1][1] , a);
    }


}

class ColorTimeline extends timeline
{
    constructor(parameters)
    {
        super(parameters);
        this.value = new Color(0,0,0);
    }

    copy(val)
    {
        this.value.copyInto(val);

    }

    doLerp(leftIndex, t)
    {

        var t0 = leftIndex<0 ? 0 :this.values[leftIndex][0];

        var a = (t- t0) /(this.values[leftIndex+1][0] - t0);
      
        this.value.lerpInto( ( leftIndex < 0? Color.Zero :this.values[leftIndex][1]) , this.values[leftIndex+1][1] , a);
    }


}


;// CONCATENATED MODULE: ./src/ParticleSystem.js







//import * as ColorGenerators from './Generators/ColorGenerator.js'





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
		
		this.clear =( typeof parameters.clear !== 'undefined') ? parameters.clear : true;
        
       
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

		if(this.clear){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

        for(var i = 0 ; i < this.particles.length;i++)
        {
            //TODO
               
                
            if( this.particles[i].TTL > 0 && this.particles[i].elapsed >= this.particles[i].TTL)
            {

                this.particles[i]._PS = null;
                this.particles.splice(i, 1);
				i--;
                
            }
			else	
				this.particles[i].tick();
         
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
    _handleColorValue(val, def= new Color(0,0,0), error)
    {
        if(val)
        {
            if(typeof(val) == 'string' )
            {
                //requires a well formed color
                return Color.hexToRGB(val);
            }
			else if(val instanceof Color )
			{
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

		acceleration : parameters.acceleration || new Vector(0,0),
		
		attractor: parameters.attractor || null,
        
        angularSpeed : this._handleScalarValue(parameters.angularSpeed, 0 ,"ERROR WITH ANGULAR SPEED"),
        
        scaleVelocity: this._handleVectorValue( parameters.scaleVelocity , new Vector(0,0)),
        
        trace:parameters.trace,


        Transform:{
            translation :
            new VectorValue(new Vector(0,0), this._handleVectorValue( parameters.initialPosition , new Vector(0,0)), parameters.translationTimeline || null  ),
            rotation :
             new ScalarValue(0 ,  this._handleScalarValue(parameters.initialRotation, 0) , parameters.rotationTimeline || null ), //this._handleScalarValue(this.parameters.initialRotation, 0),
            scale :
             new VectorValue(new Vector(1,1),this._handleVectorValue( parameters.initialScale , new Vector(1,1)) , parameters.scaleTimeline || null)
            
        },
		
		shear :  new VectorValue(new Vector(0,0), this._handleVectorValue( parameters.shear , new Vector(0,0)), parameters.shearTimeline || null  ),
		
		perspective :  new VectorValue(new Vector(0,0), this._handleVectorValue( parameters.perspective , new Vector(0,0)), parameters.perspectiveTimeline || null  ),
                
        strokeStyle :parameters.strokeStyle || "#000000FF",

        fillStyle : this._handleColorValue(parameters.fillStyle,"#000000"),
		
		color : 	
		( typeof parameters.color !== 'undefined' || typeof parameters.colorTimeline !== 'undefined' )?
		  new ColorValue( new Color(0,0,0,0) ,   this._handleColorValue(parameters.color, new Color(0,0,0,0)) , parameters.colorTimeline || null  )
		:null
				
		
		};
		
		//console.log("another color test:" + JSON.stringify(parametersParticle.color))
		 

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