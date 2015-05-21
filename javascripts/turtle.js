(function (){

	"use strict";

	var root = this;

	var Turtle = function (options) {
		this.state = {
			//turtle's direciton axis x.
			dx : 0,
			//turtle's direction axis y.
			dy : -1,
			//turtle's position axis x.
			x : 0,
			//turtle's position axis y.
			y : 0,
			//turtle's color (defalut black).
			color : '#000',
			//turtle's width(defualt 1)
			width : 1,
			//canvas
			svg : d3.select(options.name).append('svg').style('width',options.width).style('height',options.height)
		};

		return this;
	};

	Turtle.Action = function (extensions) {
		var parent = this;
		parent.prototype[extensions.name] = extensions.functional;
	};

	root.Turtle = Turtle;

}).call(this);


//extend move
(function () {
	Turtle.Action({
		name : 'move',
		functional : function (length) {
			var nx = this.state.x + length * this.state.dx;
				ny = this.state.y + length * this.state.dy;
			this.state.svg.append('line')
				.attr({
					x1 : this.state.x,
					y1 : this.state.y,
					x2 : nx,
					y2 : ny,
					stroke : this.state.color,
					'stroke-width' : this.state.width
				});


			this.state.x = nx;
			this.state.y = ny;
		}
	});
}).call(this);

//extend setcolor
(function(){
    Turtle.Action({
        name : 'setcolor',
        functional : function(color){
            this.state.color = color;
		}
    });
}).call(this);

//extend setwidth
(function(){
    Turtle.Action({
        name : 'setwidth',
        functional : function(width){
            this.state.width = width;
		}
    });
}).call(this);

//extend turn
(function () {
	 Turtle.Action({
        name : 'turn',
        functional : function(angle){
        	var currentAngle;

        	if(this.state.dx >=0 && this.state.dy > 0){
        		currentAngle = Math.asin(this.state.dy);
        	}
        	else if(this.state.dx <=0 && this.state.dy > 0){
        		currentAngle = Math.acos(this.state.dx);
        	}
        	else if(this.state.dx < 0 && this.state.dy <0){
        		currentAngle = Math.PI + Math.asin(-this.state.dy);
        	}
        	else if(this.state.dx >=0 && this.state.dy <= 0){
        		currentAngle = Math.asin(this.state.dy);
        	}

        	currentAngle = currentAngle + angle * Math.PI / 180;

        	while(currentAngle < 0){
        		currentAngle = currentAngle + 2 * Math.PI;
        	};
        	while(currentAngle > 2 * Math.PI){
        		currentAngle = currentAngle - 2 * Math.PI;
        	}


        	this.state.dx = Math.cos(currentAngle);
        	this.state.dy = Math.sin(currentAngle);
		}
    });
}).call(this);

