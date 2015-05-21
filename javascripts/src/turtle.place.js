(function () {
	Turtle.Action({
		name : "place",
		functional : function (x, y) {
			this.state.x = x;
			this.state.y = y;
		}
	});
}).call(this);