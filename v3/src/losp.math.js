(function(){
    'use strict';

    var losp = this.losp;
    
    losp.extend({
        name : 'int',
        test : (w) => { return /^\(int /.test(w); },
        build : (w) => { 
            var length = losp.blocklength(w);
            return [w.substr(0, w), w.substring(w)]; 
        },
        method : (a) => {
            return { name : 'number', content : Math.floor(parseFloat(losp.func.variable.method(a).content)) };
        },
        param : 1
    });
}).call(this);