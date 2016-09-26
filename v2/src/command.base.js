(function(){
    'use strict';

    var commands = function(){};
    commands.list = {};
    commands.extend = function(ex){
        commands.list[ex.name] = {};
        commands.list[ex.name].test = ex.test;
        commands.list[ex.name].method = ex.method;
        commands.list[ex.name].params = ex.params;
    };

    this.commands = commands;
}).call(this);

