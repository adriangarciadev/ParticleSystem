class timeline
{
    constructor(parameters)//values: array 
    {
        this.values = parameters.values;
        //this.initialTime = parameters.initialTime || 0;
        this.loop = parameters.loop || false;
        this.leftBorder=0;
        this.rightBorder=0;
        this.IOC=0; // INDEX OF NUMBER TO COMPARE
        this.N =  this.values.length;
        this.maxTime = this.values[this.N-1][0]; 
        this.lastT=-50;
        this.value = null;
    }

    copy(val)
    {
        this.value = val;

    }
    doLerp(leftIndex, t)
    {

        var t0 = leftIndex<0 ? 0 :this.values[leftIndex][0];

        var a = (t- t0) /(this.values[leftIndex+1][0] - t0);
          
        this.value =  JSMath.lerp( ( leftIndex < 0? 0 :this.values[leftIndex][1]) , this.values[leftIndex+1][1] ,a);      

    }


    getValue(t)
    {
        

        if(this.loop)
            t= t%this.maxTime;
        
        if(this.lastT == t)
            return this.value;

        this.lastT = t;

        var leftIndex = this.findIntervalBorderIndex(t);

        
        if(leftIndex == this.N-1)
        {   
            this.copy(this.values[leftIndex][1]); 
           
            return this.value;//final value in the loop
            
        }
        else
        {
            
            this.doLerp(leftIndex, t);

            return this.value;
        }
    
        //function to return a value at a time.
    
    
    }

    findIntervalBorderIndex = function (point, useRightBorder = false) {
        //If point is beyond given intervals
        if (point <  this.values[0][0])
          return -1
        if (point >  this.values[ this.N - 1][0])
          return  this.N - 1
        //If point is inside interval
        //Start searching on a full range of intervals

        this.leftBorder= 0;
        this.rightBorder = this.N - 1;
          //, leftBorderIndex = 0
          //, rightBorderIndex = intervals.length - 1
        //Reduce searching range till it find an interval point belongs to using binary search
        while (this.rightBorder - this.leftBorder !== 1) {
          this.IOC = this.leftBorder + Math.floor((this.rightBorder - this.leftBorder)/2)
          point >= this.values[this.IOC][0]
            ? this.leftBorder = this.IOC
            : this.rightBorder = this.IOC
        }
        return useRightBorder ? this.rightBorder : this.leftBorder
      }


}