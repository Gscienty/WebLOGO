(() => {
    'use strict';

    var losp = this.losp;
    var environment = this.environment;
    
    var turtle = {};

    //是否添加动画？
    turtle.sdraw = (position) => {
        if(environment.active === false) { return ; };
        if(document.getElementById(environment.activeflag) == null){
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.style.fill = 'none';
            polyline.style.stroke = environment.color;
            polyline.style['stroke-width'] = environment.width;
            polyline.setAttribute('id', environment.activeflag);
            polyline.setAttribute('points', '');
            environment.global.appendChild(polyline);
        };
        var trace = document.getElementById(environment.activeflag);
        trace.setAttribute('points', trace.getAttribute('points') + ' ' + position[0] + ',' + position[1] + ' ' + position[2] + ',' + position[3]);
    };

    losp.extend({
        name : 'forward',
        test : (w) => { return /^\((forward|fd) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                var position = [];
                position.push(environment.x, environment.y);
                environment.x = environment.x + Math.cos(environment.angle) * a.content;
                environment.y = environment.y + Math.sin(environment.angle) * a.content;
                position.push(environment.x, environment.y);

                turtle.sdraw(position);
            };

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'right',
        test : (w) => { return /^\((right|rt) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                environment.angle = environment.angle + a.content * Math.PI / 180;
                while(environment.angle < 0) { environment.angle = environment.angle + Math.PI * 2; }
                while(environment.angle >= Math * 2) { environment.angle = environment.angle - Math.PI * 2; }
            };

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'left',
        test : (w) => { return /^\((left|lt) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                environment.angle = environment.angle - a.content * Math.PI / 180;
                while(environment.angle < 0) { environment.angle = environment.angle + Math.PI * 2; }
                while(environment.angle >= Math * 2) { environment.angle = environment.angle - Math.PI * 2; }
            };

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'back',
        test : (w) => { return /^\((back|bk) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                var position = [];
                position.push(environment.x, environment.y);
                environment.x = environment.x - Math.cos(environment.angle) * a.content;
                environment.y = environment.y - Math.sin(environment.angle) * a.content;
                position.push(environment.x, environment.y);

                turtle.sdraw(position);
            };

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'penup',
        test : (w) => { return /^\((penup|pu)/.test(w); },
        method : () => {
            environment.active = false;
            if(document.getElementById(environment.activeflag) != null) { document.getElementById(environment.activeflag).removeAttribute('id'); };

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'pendown',
        test : (w) => { return /^\((pendown|pd)/.test(w); },
        method : () => {
            environment.active = true;
            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'home',
        test : (w) => { return /^\(home/.test(w); },
        method : () => {
            environment.x = environment.global.clientWidth / 2;
            environment.y = environment.global.clientHeight / 2;
            environment.angle = Math.PI * 3 / 2;

            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'setx',
        test : (w) => { return /^\(setx /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                losp.func.penup.method();
                environment.x = a.content;
                losp.func.pendown.method();
            }
            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'sety',
        test : (w) => { return /^\(sety /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                losp.func.penup.method();
                environment.y = a.content;
                losp.func.pendown.method();
            }
            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'setxy',
        test : (w) => { return /^\(setxy /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number' && b.name === 'number'){
                losp.func.penup.method();
                environment.x = a.content;
                environment.y = b.content;
                losp.func.pendown.method();
            }
            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'xcor',
        test : (w) => { return /^\(xcor/.test(w); },
        method : () => {
            return { name : 'number', content : environment.x };
        }
    });

    losp.extend({
        name : 'ycor',
        test : (w) => { return /^\(ycor/.test(w); },
        method : () => {
            return { name : 'number', content : environment.y };
        }
    });
}).call(this);