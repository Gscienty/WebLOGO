(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;

    //不要循环指引
    function get_variable_value(a) { while(a.name === 'variable'){ a = variables[a.content]; }; return a; }

    commands.extend({
        name : 'print',
        test : (a) => { return a.match(/^(print|pr) /); },
        method : (a) => { 
            return get_variable_value(a);
        },
        param : 1
    });

    commands.extend({
        name : 'int',
        test : (a) => { return a.match(/^int /); },
        method : (a) => { 
            var result = {};
            result.name = 'number';
            a = get_variable_value(a);
            if(a.name === 'number'){ result.content = Math.floor(parseFloat(a.content)); }
            else{ result.content = 0; };

            return result;
        },
        param : 1
    });

    commands.extend({
        name : 'round',
        test : (a) => { return a.match(/^round /); },
        method : (a) => { 
            var result = {};
            result.name = 'number';

            //不要循环指引
            a = get_variable_value(a);
            if(a.name === 'number'){ result.content = Math.round(parseFloat(a.content)); }
            else{ result.content = 0; };

            return result;    
        },
        param : 1
    });

    commands.extend({
        name : 'div',
        test : (a) => { return a.match(/^div /); },
        method : (a, b) => {
            var result = {};
            result.name = 'number';
            
            a = get_variable_value(a);
            b = get_variable_value(b);
            
            if(a.name === 'number' && b.name === 'number') { result.content = parseFloat(a.content) / parseFloat(b.content); }
            else { result.content = 0; }

            return result;
        },
        param : 2
    });

    commands.extend({
        name : 'remainder',
        test : (a) => { return a.match(/^remainder /); },
        method : (a, b) => {
            var result = {};
            result.name = 'number';
            
            a = get_variable_value(a);
            b = get_variable_value(b);
            
            if(a.name === 'number' && b.name === 'number') { result.content = a.content % b.content; }
            else { result.content = 0; }

            return result;
        },
        param : 2
    });

    commands.extend({
        name : 'random',
        test : (a) => { return a.match(/^random /); },
        method : (a) => { 
            a = get_variable_value(a);
            return { name : 'number', content : Math.floor(Math.random() * a.content) };
        },
        param : 1 
    });

    commands.extend({
        name : 'sqrt',
        test : (a) => { return a.match(/^sqrt /); },
        method : (a) => {
            a = get_variable_value(a);
            return { name : 'number', content : Math.sqrt(a.content) };
        },
        param : 1
    });

    commands.extend({
        name : 'abs',
        test : (a) => { return a.match(/^abs /); },
        method : (a) => {
            a = get_variable_value(a);
            return { name : 'number', content : Math.abs(a) };
        },
        param : 1
    });

    commands.extend({
        name : 'make',
        test : (a) => { return a.match(/^make /); },
        method : (a, b) => {
            if(a.name === 'variable'){
                variables[a.content] = get_variable_value(b);
            };
            return { name : 'null' };
        },
        param : 2
    });

    commands.extend({
        name : 'add',
        test : (a) => { return a.match(/^add /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(a.name === 'number' && b.name === 'number'){
                return { name : 'number', content : parseFloat(a.content) + parseFloat(b.content) };
            }
            return { name : 'number', content : 0 }
        }
    });

    commands.extend({
        name : 'sub',
        test : (a) => { return a.match(/^sub /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(a.name === 'number' && b.name === 'number'){
                return { name : 'number', content : parseFloat(a.content) - parseFloat(b.content) };
            }
            return { name : 'number', content : 0 }
        }
    });
    

    commands.extend({
        name : 'mul',
        test : (a) => { return a.match(/^mul /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);
            if(a.name === 'number' && b.name === 'number'){
                return { name : 'number', content : parseFloat(a.content) * parseFloat(b.content) };
            }
            return { name : 'number', content : 0 }
        }
    });

    commands.extend({
        name : 'list',
        test : (a) => { return a.match(/^list /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);
            if(a.name === 'array'){
                return { name : 'array', content : a.content };
            };
            return { name : 'null' };
        }
    })
}).call(this);