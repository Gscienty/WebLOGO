(function () {
	 Turtle.Action({
        name : 'turn',
        functional : function(angle){
        	var currentAngle;
        	if(this.state.dx > 0 && this.state.dy >= 0){
        		currentAngle = Math.asin(this.state.dy / Math.sqrt(Math.pow(this.state.dx,2)+Math.pow(this.state.dy,2)));
        	}
        	else if(this.state.dx <= 0 && this.state.dy > 0){
        		currentAngle = Math.acos(this.state.dx / Math.sqrt(Math.pow(this.state.dx,2)+Math.pow(this.state.dy,2)));
        	}
        	else if(this.state.dx < 0 && this.state.dy <= 0){
        		currentAngle = -Math.atan(this.state.dy / this.state.dx);
        	}
        	else if(this.state.dx >= 0 && this.state.dy < 0){
        		currentAngle = Math.asin(this.state.dy / Math.sqrt(Math.pow(this.state.dx,2)+Math.pow(this.state.dy,2)));
        	}

        	currentAngle = currentAngle + angle * Math.PI / 180;

        	this.state.dx = Math.cos(currentAngle);
        	this.state.dy = Math.sin(currentAngle);
		}
    });
}).call(this);