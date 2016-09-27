(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;


    commands.extend({
        name : 'first',
        test : (a) => { return a.match(/^first /); },
        method : (a) => {
            if(a.name === 'string' && a.content.length > 2){
                return { name : 'string', content : '\'' + a.content[1] + '\'' };
            };
            return { name : 'string', content : '\'\'' };
        },
        param : 1
    });

    commands.extend({
        name : 'last',
        test : (a) => { return a.match(/^last /); },
        method : (a) => {
            if(a.name === 'string' && a.content.length > 2){
                return { name : 'string', content : '\'' + a.content[a.content.length - 2] + '\'' };
            };
            return { name : 'string', content : '\'\'' }
        },
        param : 1
    });

    commands.extend({
        name : 'butfirst',
        test : (a) => { return a.match(/^(butfirst|bf) /); },
        param : 1,
        method : (a) => {
            if(a.name === 'string' && a.content.length > 2){
                return { name : 'string', content : '\'' + a.content.substr(2, a.content.length - 3) + '\'' };
            };
            return { name : 'string', content : '\'\'' }
        }
    });

    commands.extend({
        name : 'butlast',
        test : (a) => { return a.match(/^(butlast|bl) /); },
        param : 1,
        method : (a) => {
            if(a.name === 'string' && a.content.length > 2){
                return { name : 'string', content : '\'' + a.content.substr(1, a.content.length - 3) + '\'' };
            };
            return { name : 'string', content : '\'\'' }
        }
    });

    command.extend({
        name : 'isempty',
        test : (a) => { return a.match(/^empty\? /); },
        param : 1,
        method : (a) => {

        }
    })
}).call(this);