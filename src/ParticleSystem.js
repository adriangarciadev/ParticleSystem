import { Vector } from './Vector.js';
import {MathUtils} from './MathUtils.js'
import {Particle} from './Particle.js'
import {Color} from './Color.js'

import * as ScalarGenerators from './Generators/ScalarGenerator.js'
import * as VectorGenerators from './Generators/VectorGenerator.js'
//import * as ColorGenerators from './Generators/ColorGenerator.js'
import {ColorGenerator, ColorList, ColorFunction,  } from './Generators/ColorGenerator.js'

import {ScalarValue, VectorValue, ColorValue} from './VariableWatcher/VariableWatcher.js'
import {ScalarTimeline , VectorTimeline, ColorTimeline} from './Timeline/Timeline.js'

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
            else if(val instanceof(VectorGenerators.VectorGenerator))
            {
                return val.generate();
            }
            else if(val instanceof(VectorGenerators.VectorFunction))
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
            else if(val instanceof ScalarGenerators.ScalarGenerator)
            {
                return val.generate();
            }
            else if(val instanceof ScalarGenerators.ScalarFunction)
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

export {ParticleSystem};