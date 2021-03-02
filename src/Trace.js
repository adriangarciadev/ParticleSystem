class Trace 
{
    constructor()
    {
        this.base=[];
       // this.transformed=[];
        
    }

    _push(v)
    {
        this.base.push(v);
     //   this.transformed.push(v.copy());
    }
    
    
    recalculateAll(Transform, particle)
    {
        for(var i = 0 ; i < this.base.length;i++)
        {
            this.base[i].transformIntoValues(this.transformed[i], Transform , particle.timeLineElapsed + particle.timelineOffset);
            
        }
    }

    tick(ctx , Transform , particle)
    {
        //this.recalculateAll(Transform, particle);

        //ctx.scale(2, 2);

        ctx.translate(Transform.translation.getValue(particle.elapsed).x, Transform.translation.getValue(particle.elapsed).y);
        ctx.scale(Transform.scale.getValue(particle.elapsed).x, Transform.scale.getValue(particle.elapsed).y);
        ctx.rotate(Transform.rotation.getValue(particle.elapsed));
    
        this.draw(ctx);
    
        //RESET
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        
    }
    

}

class beginPath extends Trace
{
    constructor()
    {
        super();
    }

    draw(ctx)
    {
        ctx.beginPath();
    }
}
class closePath extends Trace
{
    constructor()
    {
        super();
    }

    draw(ctx)
    {
        ctx.closePath();
    }
}
class fill extends Trace
{
    constructor()
    {
        super();
    }
    
    draw(ctx)
    {
        ctx.fill();
    }
}
class stroke extends Trace
{
    constructor()
    {
        super();
    }

    draw(ctx)
    {
        ctx.stroke();
    }
}

class moveTo extends Trace
{
    constructor(x,y)
    {
        super();
        this._push(new Vector(x,y));

    }
    draw(ctx)
    {

        ctx.moveTo( this.base[0].x ,  this.base[0].y);
    }

}
class lineTo extends Trace
{
    constructor(x,y)
    {
        super();
        this._push(new Vector(x,y));

    }
    draw(ctx)
    {

        ctx.lineTo( this.base[0].x ,  this.base[0].y);
    }

}
class bezierCurveTrace extends Trace{}
class ArcTrace extends Trace{}

class quadraticCurveTrace extends Trace{}

class arc extends Trace
{
    constructor (x=0, y=0, radio=Math.PI/2, startAngle=0, endAngle=2*Math.PI, anticlockwise=false)
    {
        super();

        this._push(new Vector(x,y));
        this._push(radio);
        this._push(new Vector(startAngle,endAngle));
        this._push(anticlockwise);

    }
    draw(ctx)
    {
        ctx.arc (this.base[0].x, this.base[0].y, this.base[1], this.base[2].x, this.base[2].y, this.base[3]);

    }

}
class ellipse extends Trace
{
    constructor(x, y, radiusX, radiusY, rotation, startAngle, endAngle , anticlockwise = false)
    {
        super();
        this._push(new Vector(x,y));
        this._push(new Vector(radiusX, radiusY));
        this._push(rotation);
        this._push(new Vector(startAngle, endAngle));
        this._push(anticlockwise);
    }

    draw(ctx)
    {
        ctx.ellipse(this.base[0].x, this.base[0].y, this.base[1].x, this.base[1].y, this.base[2], this.base[3].x, this.base[3].y ,this.base[4]);

    }
}