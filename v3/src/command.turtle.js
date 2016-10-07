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
                    x : turtle.g_state().x + a.content * Math.cos(turtle.g_state().angle),
                    y : turtle.g_state().y + a.content * Math.sin(turtle.g_state().angle)
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
                    x : turtle.g_state().x - a.content * Math.cos(turtle.g_state().angle),
                    y : turtle.g_state().y - a.content * Math.sin(turtle.g_state().angle)
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
                var angle = turtle.g_state().angle + a.content * Math.PI / 180;

                while(angle >= 2 * Math.PI) { angle = angle - 2 * Math.PI; }
                while(angle < 0) { angle = angle + 2 * Math.PI; }

                turtle.s_state({ angle : angle });
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
                var angle = turtle.g_state() + a.content * Math.PI / 180;

                while(angle >= 2 * Math.PI) { angle = angle - 2 * Math.PI; }
                while(angle < 0) { angle = angle + 2 * Math.PI; }

                turtle.s_state({ angle : angle });
            };

            return { name : 'null' };
        }
    });

    
}).call(this);