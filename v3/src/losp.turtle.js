(() => {
    'use strict';

    var losp = this.losp;
    var environment = this.environment;
    
    var turtle = {};

    turtle.sdraw = (points) => {
        var length = points.length;
        for(var i = 0; i < length; i++){
            this.appendscript(() => {
                if(document.getElementById(environment.activeflag) == null){
                    var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                    polyline.style.fill = 'none';
                    polyline.style.stroke = environment.color;
                    polyline.style['stroke-width'] = environment.width;
                    polyline.setAttribute('id', environment.activeflag);
                    polyline.setAttribute('points', '');
                    environment.global.appendChild(polyline);
                };
                var cor = points.shift();
                document.getElementById(environment.activeflag).setAttribute('points', document.getElementById(environment.activeflag).getAttribute('points') + ' ' + cor.x0 + ',' + cor.y0 + ' ' + cor.x1 + ',' + cor.y1);
            });
        };
    };

    losp.extend({
        name : 'forward',
        test : (w) => { return /^\((forward|fd) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'number'){
                var origin_x = environment.x;
                var origin_y = environment.y;
                environment.x = environment.x + a.content * Math.cos(environment.angle);
                environment.y = environment.y + a.content * Math.sin(environment.angle);

                if(environment.active === true){
                    var framecount = Math.floor(a.content / environment.speed);
                    var pointsqueue = [];
                    for (var i = 1; i <= framecount; i++){
                        pointsqueue.push({
                            x0 : origin_x + (i - 1) * environment.speed * Math.cos(environment.angle),
                            y0 : origin_y + (i - 1) * environment.speed * Math.sin(environment.angle),
                            x1 : origin_x + (i) * environment.speed * Math.cos(environment.angle),
                            y1 : origin_y + (i) * environment.speed * Math.sin(environment.angle)
                        });
                    }
                    pointsqueue.push({
                            x0 : origin_x + (framecount) * environment.speed * Math.cos(environment.angle),
                            y0 : origin_y + (framecount) * environment.speed * Math.sin(environment.angle),
                            x1 : origin_x + a.content * Math.cos(environment.angle),
                            y1 : origin_y + a.content * Math.sin(environment.angle)
                    });

                    turtle.sdraw(pointsqueue);
                };
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
                var origin_x = environment.x;
                var origin_y = environment.y;
                environment.x = environment.x - a.content * Math.cos(environment.angle);
                environment.y = environment.y - a.content * Math.sin(environment.angle);
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
            
            losp.func.penup.method();
            environment.x = environment.global.clientWidth / 2;
            environment.y = environment.global.clientHeight / 2;
            environment.angle = Math.PI * 3 / 2;
            losp.func.pendown.method();

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