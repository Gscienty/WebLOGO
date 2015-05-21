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

(function (){
	"use strict";

	Turtle.Action({
		name : "testprototype",
		functional : function (a) {
			alert(this.state.x);
		}
	});
}).call(this);