(function(){
    var turtle = function(){};
    turtle.extend = function(ex){
        turtle.prototype[ex.name] = ex.method;
    };

    this.turtle = turtle;
}).call(this);

(function(){
    'use strict';
    var private_state = {
        x : 0,
        y : 0,
        dx : 0,
        dy : -1,
        color : '#000',
        width : 1,
        draw : true
    };
    this.extend({
        name : 'g_state',
        method : function() { return private_state; }
    });
    this.extend({
        name : 's_state',
        method : function(value){
            for(var i in value){
                private_state[i] = value[i];
            };
        }
    });
}).call(this.turtle);

(function(){
    this.turtle_machine = new turtle();
}).call(this);