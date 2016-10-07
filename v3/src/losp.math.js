(function(){
    'use strict';

    var losp = this.losp;
    
    losp.extend({
        name : 'int',
        test : (w) => { return /^\(int /.test(w); },
        method : (w) => { return { name : 'number', content : Math.floor(parseFloat(losp.func.variable.method(w).content)) }; },
        param : 1
    });

    losp.extend({
        name : 'round',
        test : (w) => { return /^\(round /.test(w); },
        method : (w) => { return { name : 'number', content : Math.round(parseFloat(losp.func.variable.method(w).content)) }; },
        param : 1
    });

    losp.extend({
        name : 'div',
        test : (w) => { return /^\(div /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : parseFloat(a.content) / parseFloat(b.content) }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'remainder',
        test : (w) => { return /^\(remainder /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : parseFloat(a.content) % parseFloat(b.content) }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'add',
        test : (w) => { return /^\(add /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : parseFloat(a.content) + parseFloat(b.content) }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'mul',
        test : (w) => { return /^\(mul /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : parseFloat(a.content) * parseFloat(b.content) }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'sub',
        test : (w) => { return /^\(sub /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : parseFloat(a.content) - parseFloat(b.content) }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'random',
        test : (w) => { return /^\(random /.test(w); },
        method : (w) => { return { name : 'number', content : Math.floor(Math.random() * losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'sqrt',
        test : (w) => { return /^\(sqrt /.test(w); },
        method : (w) => { return { name : 'number', content : Math.sqrt(osp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'abs',
        test : (w) => { return /^\(abs /.test(w); },
        method : (w) => { return { name : 'number', content : Math.abs(osp.func.variable.method(w).content) }; },
        param : 1
    });
}).call(this);