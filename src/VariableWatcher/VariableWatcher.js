class VariableWithTimeline
{
    constructor(val, dynamic, timeline)//both references if objects
    {
        this.val = val;
        this.dynamic = dynamic;
        this.timeline = timeline;
        

    }

    getValue(t)
    {
        //returns the sum of base and timeline.
        console.error("has to be implemented");
    }
    getbase()
    {
        //returns the base
        console.error("has to be implemented");
    }
    getTimelineValue(t)
    {
        //returns the timeline
        console.error("has to be implemented")
    }

}

class ScalarValue extends VariableWithTimeline
{
    constructor(val,dynamic, timeline=null)
    {
        super(val, dynamic, timeline);
    }

    getValue(t = 0)
    {
        if(this.timeline)
        {
            this.val = this.dynamic + this.timeline.getValue(t);
        }
        else
        {
            this.val = this.dynamic;
        }
        return this.val;
    }
}

class VectorValue extends VariableWithTimeline
{
    //VECTOR, VECTOR, TIMELINE
    constructor( val, dynamic, timeline = null)
    {
        super(val, dynamic, timeline);
    }

    getValue(t = 0)
    {
        if(this.timeline)
        {
            this.val.addInto(this.dynamic, this.timeline.getValue(t));
        }
        else
        {
            this.val.copyInto(this.dynamic);
        }

        return this.val;
    }

} 

class ColorValue extends VariableWithTimeline
{


}


export {VariableWithTimeline, ScalarValue, VectorValue, ColorValue}