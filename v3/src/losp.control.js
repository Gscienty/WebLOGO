(() => {
    'use strict';

    var losp = this.losp;

    losp.extend({
        name : 'if',
        test : (w) => { return /^\(if /.test(w); },
        /**a:判断表达式 b:then c:else */
        method : (a, b, c) => {
            
        }
    });
}).call(this);