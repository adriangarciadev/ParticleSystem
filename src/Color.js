import {MathUtils} from './MathUtils.js'

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

export {Color};