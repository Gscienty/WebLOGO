(function (){

	"use strict";

	var root = this;

	var Turtle = function (context) {
		this.state = {
			//turtle's position axis x.
			x : 0,
			//turtle's position axis y.
			y : 0,
			//turtle's color (defalut black).
			color : '#000'
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