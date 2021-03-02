import { Vector } from './Vector.js';
import {MathUtils} from './MathUtils.js'
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

export {Particle};