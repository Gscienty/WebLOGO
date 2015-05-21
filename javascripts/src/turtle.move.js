(function () {
	Turtle.Action({
		name : 'move',
		functional : function (length) {
			var nx = this.state.x + length * this.state.dx;
				ny = this.state.y + length * this.state.dy;
			this.svg.append('line')
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