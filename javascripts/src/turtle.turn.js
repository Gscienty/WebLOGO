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