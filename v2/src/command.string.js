(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;

    //不要循环指引
    function get_variable_value(a) { while(a.name === 'variable'){ a = variables[a.content]; }; return a; }

    commands.extend({
        name : 'first',
        test : (a) => { return a.match(/^first /); },
        method : (a) => {
            a = get_variable_value(a);
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
            a = get_variable_value(a);
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
            a = get_variable_value(a);
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
            a = get_variable_value(a);
            if(a.name === 'string' && a.content.length > 2){
                return { name : 'string', content : '\'' + a.content.substr(1, a.content.length - 3) + '\'' };
            };
            return { name : 'string', content : '\'\'' }
        }
    });

    commands.extend({
        name : 'isempty',
        test : (a) => { return a.match(/^isempty\? /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'string'){
                return { name : 'boolean', content : (function(c){
                    if(c.length === 2) { return 'true'; }
                    else { return 'false'; };
                })(a.content) };
            }
            return { name : 'boolean', content : 'false' }
        }
    });

    commands.extend({
        name : 'count',
        test : (a) => { return a.match(/^count /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'string'){
                return { name : 'number', content : a.content.length - 2 };
            }
            return { name : 'number', content : -1 };
        }
    })
}).call(this);