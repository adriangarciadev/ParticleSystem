import { Color } from '../Color.js';
import {MathUtils} from '../MathUtils.js'

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

export {ScalarGenerator, ScalarRange, ScalarFunction};