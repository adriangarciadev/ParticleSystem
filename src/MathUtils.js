import { Vector } from './Vector.js';


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

export {MathUtils};