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
            }
            else if(a.name === 'array'){
                return commands.list['array'].method(a)[0];
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
            }
            else if(a.name === 'array'){
                var result = commands.list['array'].method(a);
                return result[result.length - 1];
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
    });

    commands.extend({
        name : 'item',
        test : (a) => { return a.match(/^item /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(b.name === 'number'){
                if(a.name === 'string') { return { name : 'string', content : '\'' + ((s, p)=>{ if(p > s.length - 2 || p < 1){ return ''}; return s[p]; })(a.content, b.content) + '\''}}
            };
            return { name : 'number', content : 0 };
        }
    });

    commands.extend({
        name : 'fput',
        test : (a) => { return a.match(/^fput /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(a.name === 'string' && b.name === 'string'){
                return {name : 'string', content : b.content.substr(0, b.content.length - 1) + a.content.substring(1)};
            };
            return a;
        }
    });

    commands.extend({
        name : 'lput',
        test : (a) => { return a.match(/^lput /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(a.name === 'string' && b.name === 'string'){
                return {name : 'string', content : a.content.substr(0, a.content.length - 1) + b.content.substring(1)};
            };
            return a;
        }
    });


}).call(this);