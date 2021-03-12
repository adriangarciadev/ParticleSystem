import { Vector } from '../Vector.js';
import {MathUtils} from '../MathUtils.js'

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

export {VectorGenerator, VectorRange, VectorArcRange, VectorFunction}
