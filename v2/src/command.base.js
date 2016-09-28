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
        test : (a) => { return a.match(/^'.*?'/); },
        method : (a) => {},
        param : 0
    });

    commands.extend({
       name : 'boolean',
       test : (a) => { return a.match(/^true|^false/); },
       method : (a) => {},
       param : 0 
    });

    commands.extend({
        name : 'array',
        test : (a) => { return a.match(/^\[(true|false|'.*?'|\$(_|[a-zA-Z])(\w+)?|(-)?\d+(\.\d+)?)( (true|false|'.*?'|\$(_|[a-zA-Z])(\w+)?|(-)?\d+(\.\d+)?))*\]/); },
        method : (a) => {
            var result = [];
            var values = a.content.substr(1, a.content.length - 2);
            while(values.length != 0){
                while(values[0] === ' ') { values = values.substring(1); };
                var current_ptr = commands.list['array'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'array', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                    continue;
                };
                current_ptr = commands.list['boolean'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'boolean', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['string'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'string', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['variable'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'variable', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['number'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'number', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                };
            };

            return result;
        },
        param : 0
    });

    this.commands = commands;
}).call(this);

