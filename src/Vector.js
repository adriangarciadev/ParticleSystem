import {MathUtils} from './MathUtils.js'


class Vector
{   
    static rotateVector(v, angle)
    {
        v.x = v.x*Math.cos(angle) - v.y*Math.sin(angle);
        v.y = v.x*Math.sin(angle) + v.y*Math.cos(angle);
    }
    static scaleVector(v, s)
    {
        v.x=v.x*s;
        v.y=v.y*s;

    }
	equals(v)
	{
		return this.x == v.x && this.y == v.y;
	}

    isZero()
    {
        return( this.x== 0 && this.y==0);
    }

    translateInto(v,w)
    {
        v.x=this.x + w.x;
        v.y=this.y + w.y;
    }

    rotateInto(v, angle)
    {
        v.x = this.x*Math.cos(angle) - this.y*Math.sin(angle);
        v.y = this.x*Math.sin(angle) + this.y*Math.cos(angle);

    }
    scaleInto(v, s)
    {
        v.x=this.x*s;
        v.y=this.y*s;
 

    }
    transformInto(v, Transform)
    {

        v.x = this.x*Math.cos(Transform.rotation) - this.y*Math.sin(Transform.rotation);
        v.y = this.x*Math.sin(Transform.rotation) + this.y*Math.cos(Transform.rotation);

        v.x=v.x*Transform.scale.x;
        v.y=v.y*Transform.scale.y;

       
        //v.x+= Transform.translation.getValue(0).x;
        //v.y+= Transform.translation.getValue(0).y;

        //console.log("test: " + Transform.translation.getValue().y );

        v.x+= Transform.translation.x;
        v.y+= Transform.translation.y;

    }

    transformIntoValues(v, Transform, elapsed)
    {
        //console.log("rotation value:" +Transform.rotation.getValue())

  

        v.x = this.x*Math.cos(Transform.rotation.getValue(elapsed)) - this.y*Math.sin(Transform.rotation.getValue(elapsed));
        v.y = this.x*Math.sin(Transform.rotation.getValue(elapsed)) + this.y*Math.cos(Transform.rotation.getValue(elapsed));

  
        v.x=v.x*Transform.scale.getValue(elapsed).x;
        v.y=v.y*Transform.scale.getValue(elapsed).y;
        


       
        //v.x+= Transform.translation.getValue(0).x;
        //v.y+= Transform.translation.getValue(0).y;

        //console.log("test: " + Transform.translation.getValue().y );

        v.x+= Transform.translation.getValue(elapsed).x;
        v.y+= Transform.translation.getValue(elapsed).y;

        
    }


    constructor(x=0,y=0)
    {
        this.x=x;
        this.y=y;

    }

    get width() {

		return this.x;

	}

	set width( value ) {

		this.x = value;

	}

	get height() {

		return this.y;

	}

	set height( value ) {

		this.y = value;

	}

	set( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	}

    add(v)
    {
        this.x += v.x;
        this.y += v.y;
    }
    addXY(x,y)
    {
        this.x += x;
        this.y += y;
    }

    addInto(v,w)
    {
        this.x = v.x + w.x;
        this.y = v.y + w.y;

    }
    copy()
    {
        return new Vector(this.x, this.y);

    }

    copyInto(v)
    {
        this.x = v.x;
        this.y = v.y;
    }
    static getRandom(min, max)
    {
        if(!min || !max)
        {
            console.error("min or max are not defined please correct your inputs");
            return new Vector(0,0);

        }

        if(min.x >max.x || min.y > max.y)
        {
            console.error("Trying to generate a random number with the wrong parameters, min is greater than max for example\n a Default vector has been created please correct the inputs")
            return new Vector(0,0)
        }

        return new Vector(
            MathUtils.getRandom(min.x, max.x),
            MathUtils.getRandom(min.y, max.y)
             );

    }

    lerpInto(v, w , a)
    {
        this.x = MathUtils.lerp (v.x , w.x , a);
        this.y = MathUtils.lerp (v.y , w.y ,a );
        //return x * (1 - a) + y * a;
    }
    
}
Vector.Zero = new Vector(0,0);

export {Vector};