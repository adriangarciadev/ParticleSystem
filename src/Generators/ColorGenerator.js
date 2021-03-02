import { Color } from '../Color.js';
import {MathUtils} from '../MathUtils.js'

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


export {ColorGenerator, ColorRange, ColorFunction};