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

export {VectorGenerator, VectorRange, VectorArcRange, VectorFunction}
