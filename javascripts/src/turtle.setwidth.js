(function(){
    Turtle.Action({
        name : 'setwidth',
        functional : function(width){
            this.state.width = width;
		}
    });
}).call(this);
