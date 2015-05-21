(function(){
    Turtle.Action({
        name : 'setcolor',
        functional : function(color){
            this.state.color = color;
		}
    });
}).call(this);
