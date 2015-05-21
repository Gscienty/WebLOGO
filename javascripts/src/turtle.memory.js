(function(){
    Turtle.Action({
        name : 'remember',
        functional : function(){
            this.mstack.push(this.stateClone());
		}
    });
}).call(this);

(function () {
	Turtle.Action({
		name : 'recall',
		functional : function(){
			if(this.mstack.length == 0) return;
			var buf = this.mstack.pop();
        	for(var item in this.state){
        		this.state[item] = buf[item];
        	};
		}
	});
}).call(this);