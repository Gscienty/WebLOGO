(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;

    commands.extend({
        name : 'print',
        test : (a)=> { return /^(print|pr) .*$/.test(a); },
        method : (a) => { return a; },
        param : (a) => { return a.match(/^(print|pr) (.*)$/)[2]; }
    });

    commands.extend({
        name : 'output',
        test : (a) => { return /^(output|op) .*$/.test(a); },
        method : (a) => { return variables[a]; },
        param : (a) => { return a.match(/^(output|op) (.*)$/)[2]; } 
    });

    commands.extend({
        name : 'int',
        test : (a) => { return /^int .*$/.test(a); },
        method : (a) => {
            if(/^(\d|\.)*$/.test(a)){
                return Math.floor(parseFloat(a));
            }
            else{
                return Math.floor(parseFloat(variables[a]));
            };
        },
        param : (a) => { return a.match(/^int (\w*|(\d|\.)*)$/)[1]; }
    });
}).call(this);