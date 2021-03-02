!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.PS=e():t.PS=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Color:()=>a,ColorFunction:()=>m,ColorGenerator:()=>h,ColorRange:()=>c,Particle:()=>y,ParticleSystem:()=>w,ScalarFunction:()=>p,ScalarGenerator:()=>d,ScalarRange:()=>u,Sprite:()=>x,SpriteSheet:()=>f,TraceList:()=>g,TraceSheet:()=>S,Vector:()=>i,VectorArcRange:()=>o,VectorFunction:()=>l,VectorGenerator:()=>r,VectorRange:()=>n});class s{static getRandom(t,e){return Math.random()*(e-t)+t}static randomTranslation(t,e){return i.getRandom(t,e)}static watchDelta(t){return t>30?17:t}static lerp(t,e,s){return t*(1-s)+e*s}}class i{static rotateVector(t,e){t.x=t.x*Math.cos(e)-t.y*Math.sin(e),t.y=t.x*Math.sin(e)+t.y*Math.cos(e)}static scaleVector(t,e){t.x=t.x*e,t.y=t.y*e}equals(t){return this.x==t.x&&this.y==t.y}isZero(){return 0==this.x&&0==this.y}translateInto(t,e){t.x=this.x+e.x,t.y=this.y+e.y}rotateInto(t,e){t.x=this.x*Math.cos(e)-this.y*Math.sin(e),t.y=this.x*Math.sin(e)+this.y*Math.cos(e)}scaleInto(t,e){t.x=this.x*e,t.y=this.y*e}transformInto(t,e){t.x=this.x*Math.cos(e.rotation)-this.y*Math.sin(e.rotation),t.y=this.x*Math.sin(e.rotation)+this.y*Math.cos(e.rotation),t.x=t.x*e.scale.x,t.y=t.y*e.scale.y,t.x+=e.translation.x,t.y+=e.translation.y}transformIntoValues(t,e,s){t.x=this.x*Math.cos(e.rotation.getValue(s))-this.y*Math.sin(e.rotation.getValue(s)),t.y=this.x*Math.sin(e.rotation.getValue(s))+this.y*Math.cos(e.rotation.getValue(s)),t.x=t.x*e.scale.getValue(s).x,t.y=t.y*e.scale.getValue(s).y,t.x+=e.translation.getValue(s).x,t.y+=e.translation.getValue(s).y}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}add(t){this.x+=t.x,this.y+=t.y}addXY(t,e){this.x+=t,this.y+=e}addInto(t,e){this.x=t.x+e.x,this.y=t.y+e.y}copy(){return new i(this.x,this.y)}copyInto(t){this.x=t.x,this.y=t.y}static getRandom(t,e){return t&&e?t.x>e.x||t.y>e.y?(console.error("Trying to generate a random number with the wrong parameters, min is greater than max for example\n a Default vector has been created please correct the inputs"),new i(0,0)):new i(s.getRandom(t.x,e.x),s.getRandom(t.y,e.y)):(console.error("min or max are not defined please correct your inputs"),new i(0,0))}lerpInto(t,e,i){this.x=s.lerp(t.x,e.x,i),this.y=s.lerp(t.y,e.y,i)}}i.Zero=new i(0,0);class a{constructor(t,e,s){this.r=t,this.g=e,this.b=s}getRGB(){return"rgb("+ +this.r+","+ +this.g+","+ +this.b+")"}static hexToRGB(t){let e=0,s=0,i=0;return 4==t.length?(e="0x"+t[1]+t[1],s="0x"+t[2]+t[2],i="0x"+t[3]+t[3]):7==t.length&&(e="0x"+t[1]+t[2],s="0x"+t[3]+t[4],i="0x"+t[5]+t[6]),new a(parseInt(e),parseInt(s),parseInt(i))}}class r{constructor(){}generate(){console.error("Please override me called from vector generator")}}class n extends r{constructor(t,e){super(),this.min=t,this.max=e}generate(){return i.getRandom(this.min,this.max)}}class o extends r{constructor(t,e,s,i){super(),this.arcStart=t,this.arcEnd=e,this.vStart=s,this.vEnd=i}generate(){var t=s.getRandom(this.arcStart,this.arcEnd),e=s.getRandom(this.vStart,this.vEnd);return new i(e*Math.cos(t),e*Math.sin(t))}}class l{constructor(t,e){this.f=t,this.param=e}}class h{constructor(){}generate(){console.error("Please override me called from Color Generator")}}class c extends h{constructor(t,e){super(),this.min=a.hexToRGB(t),this.max=a.hexToRGB(e)}generate(){return new a(s.getRandom(this.min.r,this.max.r),s.getRandom(this.min.g,this.max.g),s.getRandom(this.min.b,this.max.b)).getRGB()}}class m{constructor(t,e){this.f=t,this.param=e}}class d{constructor(){}generate(){console.error("Please override me called from Scalar Generator")}}class u extends d{constructor(t,e){super(),this.min=t,this.max=e}generate(){return s.getRandom(this.min,this.max)}}class p{constructor(t,e){this.f=t,this.param=e}}class y{constructor(t,e){this._PS=e,this._delta=0,this.TTL=t.TTL,this.elapsed=t.elapsed||0,this.velocity=t.velocity||new i(0,0),this.angularSpeed=t.angularSpeed,this.scaleVelocity=t.scaleVelocity,this.trace=t.trace||null,this.creationTime=performance.now(),this.currTime=performance.now(),this.strokeStyle=t.strokeStyle||"#000000FF",this.fillStyle=t.fillStyle,this.timelineOffset=t.timelineOffset||0,this.timeLineElapsed=0,this.isPlaying=t.autoplay||!0,this.Transform=t.Transform}timelinePlay(){this.isPlaying=!0}timelineStop(){this.isPlaying=!1}timelineRewind(){this.timeLineElapsed=0}timeLineSetTime(t){this.timeLineElapsed=t}updateTranslation(){this.Transform.translation.dynamic.addXY(this.velocity.x*this._delta/1e3,this.velocity.y*this._delta/1e3)}updateRotation(){this.Transform.rotation.dynamic+=this.angularSpeed*this._delta/1e3}updateScale(){this.Transform.scale.dynamic.addXY(this.scaleVelocity.x*this._delta/1e3,this.scaleVelocity.y*this._delta/1e3)}updateTransforms(){this.updateTranslation(),this.updateRotation(),this.updateScale()}tick(){this._delta=performance.now()-this.currTime,this._delta=s.watchDelta(this._delta),this.elapsed+=this._delta,this.isPlaying&&(this.timeLineElapsed+=this._delta),this.currTime=performance.now(),this._PS.context.lineWidth=10,this._PS.hasCanvas()&&this._PS.hasContext()&&(this.updateTransforms(),this.trace.tick(this),"function"==typeof this.fillStyle?this._PS.context.fillStyle=this.fillStyle(this.elapsed):this._PS.context.fillStyle=this.fillStyle,this._PS.context.fill(),"function"==typeof this.strokeStyle?this._PS.context.strokeStyle=this.strokeStyle(this.elapsed):this._PS.context.strokeStyle=this.strokeStyle,this._PS.context.stroke())}}class x{constructor(){}}class g extends x{constructor(t){super(),this.traces=t}tick(t){for(var e=0;e<this.traces.length;e++)this.traces[e].tick(t._PS.context,t.Transform,t)}}class f extends x{constructor(t){super(),this.img=t.img,this.maxSprites=t.maxSprites||1,t.frameWidth?this.frameWidth=t.frameWidth:(console.error("set the frame width correctly"),this.frameWidth=0),t.frameHeight?this.frameHeight=t.frameHeight:(console.error("set the frame height correctly"),this.frameHeight=0),this.ncols=t.ncols||1,this.nrows=t.nrows||1,this.rotateFromCenter=t.rotateFromCenter||!0,this.autoplay=t.autoplay||!0,this.loop=!0,this.frameTime=t.frameTime||200,this.currentSprite=t.curFrame||0,this.maxTime=1800,this.elapsed=0}setFrame(t){this.currentSprite=t}tick(t){this.autoplay&&(this.elapsed=t.elapsed);var e=t._PS.context;e.translate(t.Transform.translation.getValue(t.elapsed).x,t.Transform.translation.getValue(t.elapsed).y),e.scale(t.Transform.scale.getValue(t.elapsed).x,t.Transform.scale.getValue(t.elapsed).y),e.rotate(t.Transform.rotation.getValue(t.elapsed)),this.loop?this.currentSprite=Math.floor(this.elapsed/this.frameTime)%this.maxSprites:this.currentSprite=Math.floor(this.elapsed/this.frameTime),e.drawImage(this.img,this.currentSprite%this.ncols*this.frameWidth,Math.floor(this.currentSprite/this.ncols)*this.frameHeight,this.frameWidth,this.frameHeight,this.rotateFromCenter?-this.frameWidth/2:0,this.rotateFromCenter?-this.frameHeight/2:0,this.frameWidth,this.frameHeight),e.setTransform(1,0,0,1,0,0)}}class S extends x{}class T{constructor(t,e,s){this.val=t,this.dynamic=e,this.timeline=s}getValue(t){console.error("has to be implemented")}getbase(){console.error("has to be implemented")}getTimelineValue(t){console.error("has to be implemented")}}class V extends T{constructor(t,e,s=null){super(t,e,s)}getValue(t=0){return this.timeline?this.val=this.dynamic+this.timeline.getValue(t):this.val=this.dynamic,this.val}}class _ extends T{constructor(t,e,s=null){super(t,e,s)}getValue(t=0){return this.timeline?this.val.addInto(this.dynamic,this.timeline.getValue(t)):this.val.copyInto(this.dynamic),this.val}}class w{constructor(t){this._delta=0,this.elapsed=0,this.currTime=performance.now(),this.parameters=t,this.maxParticles=t.maxParticles||5,this.canvas=t.canvas||null,this.context=this.canvas.getContext("2d")||null,this.generationSpeed=t.generationSpeed||5,this.generationAllowance=this.generationSpeed,this.particles=[],this.particleGlobalIndex=0}hasCanvas(){return null!=this.canvas}hasContext(){return null!=this.context}tick(){this._delta=performance.now()-this.currTime,this._delta=s.watchDelta(this._delta),this.elapsed+=this._delta,this.currTime=performance.now(),this.context.clearRect(0,0,this.canvas.width,this.canvas.height);for(var t=0;t<this.particles.length;t++)this.particles[t].tick(),0!=this.particles[t].TTL&&this.particles[t].elapsed>=this.particles[t].TTL&&(this.particles[t]._PS=null,this.particles.splice(t,1));for(;this.particles.length<this.maxParticles&&this.generationAllowance>1;)this.particleGlobalIndex++,this.particles.push(this._generateParticle(this.parameters,this.particles.length)),this.generationAllowance--;this.generationAllowance+=this.generationSpeed*this._delta/1e3}_handleVectorValue(t,e,s=""){return t?t instanceof i?t.copy():t instanceof r?t.generate():t instanceof l?(t.param.context=this,t.f(t.param)):void console.error(s):e.copy()}_handleScalarValue(t,e,s=""){return t?"number"==typeof t?t:t instanceof d?t.generate():t instanceof p?(console.error("not implemented yet"),e):void console.error(s):e}_handleColorValue(t,e="#000000",s){return t?"string"==typeof t?t:t instanceof h?t.generate():t instanceof m?e:void console.error(s):e}_generateParticle(t,e){var s={TTL:this._handleScalarValue(t.TTL,0),elapsed:t.elapsed||0,velocity:this._handleVectorValue(t.initialVelocity,new i(0,0)),angularSpeed:this._handleScalarValue(t.angularSpeed,0,"ERROR WITH ANGULAR SPEED"),scaleVelocity:this._handleVectorValue(t.scaleVelocity,new i(0,0)),trace:t.trace,Transform:{translation:new _(new i(0,0),this._handleVectorValue(t.initialPosition,new i(0,0)),t.translationTimeline||null),rotation:new V(0,this._handleScalarValue(t.initialRotation,0),t.rotationTimeline||null),scale:new _(new i(0,0),this._handleVectorValue(t.initialScale,new i(1,1)),t.scaleTimeline||null)},strokeStyle:t.strokeStyle||"#000000FF",fillStyle:this._handleColorValue(t.fillStyle,"#000000")};return new y(s,this)}}return e})()}));