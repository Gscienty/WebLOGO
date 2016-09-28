(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;

    //不要循环指引
    function get_variable_value(a) { while(a.name === 'variable'){ a = variables[a.content]; }; return a; }

    commands.extend({
        name : 'great',
        test : (a) => { return a.match(/^great /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'number' && b.name === 'number') { return { name : 'boolean', content : ((a, b) => {
                if(a > b) { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'less',
        test : (a) => { return a.match(/^less /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'number' && b.name === 'number') { return { name : 'boolean', content : ((a, b) => {
                if(a < b) { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'greatequal',
        test : (a) => { return a.match(/^greatequal /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'number' && b.name === 'number') { return { name : 'boolean', content : ((a, b) => {
                if(a >= b) { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'lessequal',
        test : (a) => { return a.match(/^lessequal /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'number' && b.name === 'number') { return { name : 'boolean', content : ((a, b) => {
                if(a <= b) { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'and',
        test : (a) => { return a.match(/^and /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'boolean' && b.name === 'boolean') { return { name : 'boolean', content : ((a, b) => {
                if(a === 'true' && b === 'true') { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'or',
        test : (a) => { return a.match(/^or /); },
        param : 2,
        method : (a, b) => {
            a = get_variable_value(a);
            b = get_variable_value(b);

            if(a.name === 'boolean' && b.name === 'boolean') { return { name : 'boolean', content : ((a, b) => {
                if(a === 'true' || b === 'true') { return 'true'; } else { return 'false'; }
            })(a.content, b.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });

    commands.extend({
        name : 'not',
        test : (a) => { return a.match(/^not /); },
        param : 1,
        method : (a) => {
            a = get_variable_value(a);

            if(a.name === 'boolean' && b.name === 'boolean') { return { name : 'boolean', content : ((a) => {
                if(a === 'true') { return 'false'; } else { return 'true'; }
            })(a.content) }; };

            return { name : 'boolean', content : 'false' };
        }
    });
}).call(this);