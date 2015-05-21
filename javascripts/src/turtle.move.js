(function () {
	Turtle.Action({
		name : 'move',
		functional : function (length) {
			var nx = this.state.x + length * this.state.dx;
				ny = this.state.y + length * this.state.dy;
		}
	})
}).call(this);