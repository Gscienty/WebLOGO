(() => {
    'use strict';

    var losp = this.losp;

    losp.extend({
        name : 'if',
        test : (w) => { return /^\(if /.test(w); },
        /**a:判断表达式 b:then c:else */
        method : (a, b, c) => {
            a = losp.func.get.method(a);
            if(a.name === 'boolean' && b.name === 'block' && c.name === 'block'){
                if(a.content === true){ return losp.func.get.method(b); }
                else { return losp.func.get.method(c); };
            };
            return { name : 'null' };
        }
    });

    losp.extend({
        name : 'loop',
        test : (w) => { return /^\(loop /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            var result = { name : 'null' }; 
            if(a.name === 'number' && b.name === 'block') {
                for(var i = 0; i < a.content; i++){
                    var temp = losp.func.get.method(b);
                    if(temp.name != 'null') { result = temp; };
                };
            };
            return result;
        }
    })
}).call(this);