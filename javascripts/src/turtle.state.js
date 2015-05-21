(function (){

	"use strict";

	var root = this;

	var Turtle = function (options) {
		this.state = {
			//turtle's direciton axis x.
			dx : 0,
			//turtle's direction axis y.
			dy : 1,
			//turtle's position axis x.
			x : 0,
			//turtle's position axis y.
			y : 0,
			//turtle's color (defalut black).
			color : '#000',
			//turtle's width(defualt 1)
			width : 1,
			//draw switch
			draw : true
		};
		this.stateClone = function(){
			var copy = {};
			for(var k in this.state){
				copy[k] = this.state[k];
			};
			return copy;
		};
		//svg
		this.svg = d3.select(options.name).append('svg').style('width',options.width).style('height',options.height);
		//memory stack
		this.mstack = new Array();

		return this;
	};

	Turtle.Action = function (extensions) {
		var parent = this;
		parent.prototype[extensions.name] = extensions.functional;
	};

	root.Turtle = Turtle;

}).call(this);