(()=>{
    'use strict';

    var losp = this.losp;

    losp.extend({
        name : 'first',
        test : (w) => { return /^\(first /.test(w); },
        param : 1,
        method : (a) => {
            a = losp.func.variable.method(a);
            if(a.name === 'string') { return { name : 'string', content : a[0] }; };
            if(a.name === 'array') { return a.content[0]; };
        }
    });

    
}).call(this);