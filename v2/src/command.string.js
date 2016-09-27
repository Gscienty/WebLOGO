(function(){
    'use strict';

    var commands = this.commands;
    var variables = this.variables;


    commands.extend({
        name : 'first',
        test : (a) => { return a.match(/^first /); },
        method : (a) => {
            if(a.name === 'string'){
                
            };
        },
        param : 1
    });
}).call(this);