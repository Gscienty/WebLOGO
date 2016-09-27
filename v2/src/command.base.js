(function(){
    'use strict';

    this.variables = {};

    var commands = {};
    commands.list = {};
    commands.extend = function(ex){
        commands.list[ex.name] = {};
        commands.list[ex.name].test = ex.test;
        commands.list[ex.name].method = ex.method;
        commands.list[ex.name].param = ex.param;
    };

    commands.extend({
        name : 'number',
        test : (a) => { return a.match(/^(-)?\d+(\.\d+)?/); },
        method : (a) => {},
        param : 0
    });

    commands.extend({
        name : 'variable',
        test : (a) => { return a.match(/^\$(_|[a-zA-Z])(\w+)?/); },
        method : (a) => {},
        param : 0
    });

    commands.extend({
        name : 'string',
        test : (a) => { return a.match(/^'.*'/); },
        method : (a) => {},
        param : 0
    });

    commands.extend({
       name : 'boolean',
       test : (a) => { return a.match(/^true|false/); },
       method : (a) => {},
       param : 0 
    });

    this.commands = commands;
}).call(this);

