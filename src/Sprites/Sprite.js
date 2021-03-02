class Sprite
{
    constructor(){}

}

class TraceList extends Sprite
{
    constructor(traces)
    {
        super();
        this.traces = traces;
    }

    tick(particle)
    {
        for(var i=0;i<this.traces.length;i++)
        {

            this.traces[i].tick(particle._PS.context, particle.Transform, particle);
        }
    }
}
class SpriteSheet extends Sprite
{
    //constructor(img,  ncols = 1 , nrows = 1, maxSprites = 1,  frameWidth, frameHeight, timePerFrame=200, rotateFromCenter = true, autoplay = true )
    constructor(par)
    {
        super();
        this.img = par.img;
        this.maxSprites = par.maxSprites || 1;
        
        
        if(!par.frameWidth)
        {    console.error("set the frame width correctly");
            this.frameWidth = 0;
        }
        else
            this.frameWidth = par.frameWidth;
        

        if(!par.frameHeight)
        {    
            console.error("set the frame height correctly");
            this.frameHeight = 0;
        }
        else
            this.frameHeight = par.frameHeight;
            
        
        this.ncols = par.ncols || 1;
        this.nrows = par.nrows || 1;
        

        this.rotateFromCenter = par.rotateFromCenter || true;
        this.autoplay = par.autoplay || true;
        this.loop = true;
        this.frameTime = par.frameTime || 200;
        this.currentSprite = par.curFrame || 0;
        this.maxTime = 1800;
        this.elapsed = 0;
    }

    setFrame(n)
    {
        this.currentSprite = n;
    }

    tick(particle)
    {
        if(this.autoplay)
            this.elapsed = particle.elapsed;
        
        
        
        var ctx = particle._PS.context;

        ctx.translate(particle.Transform.translation.getValue(particle.elapsed).x  , particle.Transform.translation.getValue(particle.elapsed).y);
        ctx.scale(particle.Transform.scale.getValue(particle.elapsed).x, particle.Transform.scale.getValue(particle.elapsed).y);
        ctx.rotate(particle.Transform.rotation.getValue(particle.elapsed));

        if(this.loop)
            this.currentSprite =  ( Math.floor( this.elapsed / this.frameTime )) % this.maxSprites;  
        else    
            this.currentSprite = Math.floor( this.elapsed / this.frameTime );

        
        ctx.drawImage(this.img,
            (this.currentSprite % this.ncols)*this.frameWidth,
            Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
            this.frameWidth, this.frameHeight  ,  this.rotateFromCenter?-this.frameWidth / 2:0, this.rotateFromCenter?-this.frameHeight / 2:0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
  
   
        
        //RESET
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

}
class TraceSheet extends Sprite {}

export {Sprite, TraceList, SpriteSheet, TraceSheet};