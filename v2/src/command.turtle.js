(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;
    var turtle = this.turtle_machine;
    var ctx = this.draw_panel.getContext('2d');

    turtle.s_state({ x : this.draw_panel.width / 2, y : this.draw_panel.height / 2 });

    //不要循环指引
    function get_variable_value(a) { while(a.name === 'variable'){ a = variables[a.content]; }; return a; }

    commands.extend({
        name : 'forward',
        test : (a) => { return a.match(/^(forward|fd) /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'number'){
                ctx.fillStyle = turtle.g_state().color;
                ctx.lineWidth = turtle.g_state().width;
                ctx.moveTo(turtle.g_state().x, turtle.g_state().y);
                turtle.s_state({
                    x : turtle.g_state().x + a.content * turtle.g_state().dx,
                    y : turtle.g_state().y + a.content * turtle.g_state().dy
                });
                ctx.lineTo(turtle.g_state().x, turtle.g_state().y);

                ctx.stroke();
            };

            return { name : 'null' };
        }
    });

    commands.extend({
        name : 'back',
        test : (a) => { return a.match(/^(back|bk) /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'number'){
                ctx.fillStyle = turtle.g_state().color;
                ctx.lineWidth = turtle.g_state().width;
                ctx.moveTo(turtle.g_state().x, turtle.g_state().y);
                turtle.s_state({
                    x : turtle.g_state().x - a.content * turtle.g_state().dx,
                    y : turtle.g_state().y - a.content * turtle.g_state().dy
                });
                ctx.lineTo(turtle.g_state().x, turtle.g_state().y);

                ctx.stroke();
            };

            return { name : 'null' };
        }
    });

    commands.extend({
        name : 'right',
        test : (a) => { return a.match(/^(right|rt) /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'number'){
                var current_angle;

                if(turtle.g_state().dx >= 0 && turtle.g_state().dy < 0) {
                    current_angle = Math.asin(-turtle.g_state().dy);
                }
                else if(turtle.g_state().dx <= 0 && turtle.g_state().dy < 0){
                    current_angle = Math.acos(turtle.g_state.dx);
                }
                else if(turtle.g_state().dx < 0 && turtle.g_state().dy > 0){
                    current_angle = Math.PI + Math.asin(turtle.g_state().dy);
                }
                else if(turtle.g_state().dx > 0 && this.g_state().dy >= 0){
                    current_angle = Math.asin(-turtle.g_state().dy);
                }

                current_angle = current_angle + a.content * Math.PI / 180;


                while(current_angle < 0) { current_angle = current_angle + 2 * Math.PI; };
                while(current_angle > 2 * Math.PI) { current_angle = current_angle - 2 * Math.PI; };

                turtle.s_state({
                    dx : Math.cos(current_angle),
                    dy : -Math.sin(current_angle)
                });
            };

            return { name : 'null' };
        }
    });

    commands.extend({
        name : 'left',
        test : (a) => { return a.match(/^(left|lt) /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'number'){
                var current_angle;

                if(turtle.g_state().dx >= 0 && turtle.g_state().dy < 0) {
                    current_angle = Math.asin(-turtle.g_state().dy);
                }
                else if(turtle.g_state().dx <= 0 && turtle.g_state().dy < 0){
                    current_angle = Math.acos(turtle.g_state.dx);
                }
                else if(turtle.g_state().dx < 0 && turtle.g_state().dy > 0){
                    current_angle = Math.PI + Math.asin(turtle.g_state().dy);
                }
                else if(turtle.g_state().dx > 0 && this.g_state().dy >= 0){
                    current_angle = Math.asin(-turtle.g_state().dy);
                }

                current_angle = current_angle - a.content * Math.PI / 180;


                while(current_angle < 0) { current_angle = current_angle + 2 * Math.PI; };
                while(current_angle > 2 * Math.PI) { current_angle = current_angle - 2 * Math.PI; };

                turtle.s_state({
                    dx : Math.cos(current_angle),
                    dy : -Math.sin(current_angle)
                });
            };

            return { name : 'null' };
        }
    });

    
}).call(this);