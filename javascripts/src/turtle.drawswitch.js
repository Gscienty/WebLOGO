(function(){
    Turtle.Action({
        name : 'drawswitch',
        functional : function(isdraw){
            this.state.draw = isdraw;
		}
    });
}).call(this);