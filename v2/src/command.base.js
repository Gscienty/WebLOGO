(function(){
    'use strict';

    var commands = {};
    commands.list = {};
    commands.extend = function(ex){
        commands.list[ex.name] = {};
        commands.list[ex.name].test = ex.test;
        commands.list[ex.name].method = ex.method;
        commands.list[ex.name].param = ex.param;
    };

    this.commands = commands;
}).call(this);

