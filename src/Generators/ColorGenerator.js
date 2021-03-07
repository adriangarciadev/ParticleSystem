import { Color } from '../Color.js';
import {MathUtils} from '../MathUtils.js'

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


export {ColorGenerator, ColorRange, ColorFunction, ColorList};