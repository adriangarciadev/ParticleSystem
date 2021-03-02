import { Vector } from './Vector.js';
import {MathUtils} from './MathUtils.js'
import {Particle} from './Particle.js'

import * as ScalarGenerators from './Generators/ScalarGenerator.js'
import * as VectorGenerators from './Generators/VectorGenerator.js'
import * as ColorGenerators from './Generators/ColorGenerator.js'

import {ScalarValue, VectorValue, ColorValue} from './VariableWatcher/VariableWatcher.js'

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
    _handleColorValue(val, def="#000000", error)
    {
        if(val)
        {
            if(typeof(val) == 'string' )
            {
                //requires a well formed color
                return val;
            }
            else if(val instanceof ColorGenerators.ColorGenerator)
            {
                return val.generate();
            }
            else if(val instanceof ColorGenerators.ColorFunction)
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

export {ParticleSystem};