import {Color} from '../Color.js'
import {MathUtils} from '../MathUtils.js'
import {ColorRange, ColorList} from '../Generators/ColorGenerator.js'

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
    constructor(par)//parameters
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
        

        this.rotateFromCenter = (typeof par.rotateFromCenter  !== 'undefined') ? par.rotateFromCenter : true;
        this.autoplay = par.autoplay || true;
        this.loop = par.loop || true;
        this.frameTime = par.frameTime || 200;
        this.currentSprite = par.curFrame || 0;
        this.maxTime = 1800;
        this.elapsed = 0;
		
		this.privateCanvas = document.createElement("canvas");
			this.privateCanvas.width =  this.frameWidth;
			this.privateCanvas.height = this.frameHeight;
			this.privateCanvas.style.display ='none';
			document.querySelector("body").prepend(this.privateCanvas);
		
		this.optElements = par.prerenderNum || 16;
		this.isOptimized = false;
		this.prerenderMode = par.prerenderMode || false;
		
		this.privateCtx = this.privateCanvas.getContext('2d');
		
		this.color = par.color  || new ColorRange(new Color(0,0,0,0.75) , new Color(255,255,255, 0.75)) ;
		
		this.compositeOperation ='source-over';// par.compositeOperation || 'source-over';
		
		this.atlasMode = par.atlasMode || null;
		this.atlasIndex = 0;
		
	
		
	
					
     /*canvas.width = 1600;
		  canvas.height = 1200;*/
		
	
	}

    setFrame(n)
    {
        this.currentSprite = n;
    }
	
	getColors(){}
	
	getOptElements()
	{
		
		if( this.color instanceof Color )
		{
			return 1;
		}
		else if (this.color instanceof ColorRange)
		{
			
			return this.optElements;
		}
		else if(this.color instanceof ColorList)
		{
			return this.color.list.length;
		}
		else
		{
			console.error("pick the correct color class for your sprite");
		
		}
	}
	
	optimize()
	{
		
		this.optElements  = this.getOptElements();
				
		this.privateCanvas.width = this.frameWidth*this.maxSprites;	
		this.privateCanvas.height = this.frameHeight*this.optElements;	
	
		
		for(var j = 0; j < this.optElements; j++)
		{
			
			var tempRand = this.color.random;
			this.color.random = false;
			var currentColor = this.color instanceof (Color) ? this.color.getRGBA() : this.color.generate().getRGBA();
			this.color.random = tempRand;
			
			
			for(var i = 0 ; i < this.maxSprites ; i ++)
			{
				
									  
				this.privateCtx.drawImage(this.img,
					(i % this.ncols)*this.frameWidth,  //La coordenada X de la esquina superior izquierda del sub-rectangulo de la imagen origen 
					Math.floor(i / this.ncols)*this.frameHeight, //La coordenada Y de la esquina superior izquierda del sub-rectangulo de la imagen origen a dibujar en el contexto de destino.
					this.frameWidth,    //El ancho para dibujar la imagen en el canvas destino.
					this.frameHeight,   //El alto para dibujar la imagen en el canvas destino
					this.frameWidth*i,  //La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
					this.frameHeight*j, //La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
					this.frameWidth,
					this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
					
					
				this.privateCtx.globalCompositeOperation = "source-atop";
				
				this.privateCtx.fillStyle = currentColor;
				this.privateCtx .fillRect(this.frameWidth*i, this.frameHeight*j, this.frameWidth, this.frameHeight);
				
				this.privateCtx.globalCompositeOperation = "source-over";
			

			}
		}
		this.isOptimized = true;
		
		//console.log("optimize: ");
		
	}

    tick(particle)
    {
        if(this.autoplay)
            this.elapsed = particle.elapsed;
        
        
        
        var ctx = particle._PS.context;

        ctx.translate( Math.floor(particle.Transform.translation.getValue(particle.elapsed).x  ),  Math.floor(particle.Transform.translation.getValue(particle.elapsed).y));
        ctx.scale( particle.Transform.scale.getValue(particle.elapsed).x, particle.Transform.scale.getValue(particle.elapsed).y);
        ctx.rotate(particle.Transform.rotation.getValue(particle.elapsed));
		
		
		let shear = particle.shear.getValue(particle.elapsed);
		ctx.transform(1, shear.x, shear.y, 1, 0, 0);//shear test

		
		let perspective = particle.perspective.getValue(particle.elapsed);

		
		let scale = 1;
		let angle1 = perspective.x, angle2 = perspective.y;
		let cs = Math.cos(angle1), sn = Math.sin(angle1);
		let h = Math.cos(angle2);
		let a = scale*cs, b = -scale*sn, c = 0;
		let d = h*scale*sn, e = h*scale*cs, f = 0;
		ctx.transform(a, d, b, e, c, f);


		/*PERSPECTIVE TRANSFORM FOR FUTURE VERSIONS 
		
		var cs = Math.cos(angle1), sn = Math.sin(angle1);
		var h = Math.cos(angle2);
		var a = 100*cs, b = -100*sn, c = 200;
		var d = h*100*sn, e = h*100*cs, f = 200;
		ctx.setTransform(a, d, b, e, c, f);
		*/
	
        if(this.loop)
            this.currentSprite =  ( Math.floor( particle.elapsed / this.frameTime )) % this.maxSprites;  
        else    
            this.currentSprite = Math.floor( particle.elapsed / this.frameTime );

        
		//particle.color = null;
		
		ctx.globalCompositeOperation = this.compositeOperation;

		//source-over
		
		if(this.atlasMode)
		{
			if(typeof particle.atlasIndex === 'undefined')
			{
					if(this.atlasMode ='sequential')
					{
						particle.atlasIndex = this.atlasIndex;
						this.atlasIndex++;
						
					}
					else
						particle.atlasIndex = Math.floor(MathUtils.getRandom(0,maxSprites+1));
						
			}			
			
		}
		
		if(this.prerenderMode)
		{
			if(!this.isOptimized)
				this.optimize();		
			
			//prerender mode not working on chrome
						
			if(typeof particle.prerenderIndex === 'undefined')
			{
				
				//bad practice just fast to code right now.
				if(this.color && this.color instanceof ColorList && !this.color.random)
				{
					particle.prerenderIndex = this.color.getSequence();
				
				}
				else 
				{
					particle.prerenderIndex = Math.floor(MathUtils.getRandom(0, this.optElements ))
				}
			}
			
			
			ctx.drawImage(this.privateCanvas,
				this.frameWidth*this.currentSprite,//this.frameWidth*particle.prerenderIndex,
				this.frameHeight*(particle.prerenderIndex),
				//0,
				this.frameWidth,
				this.frameHeight,
				this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0,
				this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);

		}
		else if(particle.color)//color not null
		{

				  
			this.privateCtx.drawImage(this.img,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth,
				this.frameHeight,
				0,
				0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			
			this.privateCtx.globalCompositeOperation = "source-atop";
			
			this.privateCtx.fillStyle = particle.color.getValue(particle.elapsed);
			this.privateCtx .fillRect(0, 0, this.frameWidth, this.frameHeight);
			
			// set composite mode
		
			/*ctx.drawImage(this.privateCanvas,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth, this.frameHeight  ,  this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0, this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			*/

			ctx.drawImage(this.privateCanvas,
				0,
				0,
				this.frameWidth,
				this.frameHeight,
				this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0,
				this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0,
				this.frameWidth,
				this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
			

				
			this.privateCtx.globalCompositeOperation = "source-over";
			this.privateCtx.clearRect(0, 0, this.privateCanvas.width, this.privateCanvas.height);
					
			  
			//color is set
		}
		else{
						
			ctx.drawImage(this.img,
				(this.currentSprite % this.ncols)*this.frameWidth,
				Math.floor(this.currentSprite / this.ncols)*this.frameHeight ,
				this.frameWidth, this.frameHeight  ,  this.rotateFromCenter? -Math.floor(this.frameWidth / 2):0, this.rotateFromCenter?-Math.floor(this.frameHeight / 2):0, this.frameWidth, this.frameHeight);//, 0, 0, this.frameWidth, this.frameHeight);
		}
   
        
        //RESET
        ctx.setTransform(1, 0, 0, 1, 0, 0);
		//ctx.resetTransform();
    }

}
class TraceSheet extends Sprite {}

export {Sprite, TraceList, SpriteSheet, TraceSheet};