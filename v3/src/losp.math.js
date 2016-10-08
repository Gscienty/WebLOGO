(function(){
    'use strict';

    var losp = this.losp;
    var heap = this.heap;

    losp.extend({
        name : 'get',
        test : (w) => { return /^\(get /.test(w); },
        method : (w) => { return losp.func.variable.method(w); },
        param : 1
    });
    
    losp.extend({
        name : 'int',
        test : (w) => { return /^\(int /.test(w); },
        method : (w) => { return { name : 'number', content : Math.floor(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'round',
        test : (w) => { return /^\(round /.test(w); },
        method : (w) => { return { name : 'number', content : Math.round(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'div',
        test : (w) => { return /^\(div /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content / b.content }; };

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
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content % b.content }; };

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
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content + b.content }; };

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
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content * b.content }; };

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
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content - b.content }; };

            return {name : 'null'};
        },
        param : 2
    });

    losp.extend({
        name : 'pow',
        test : (w) => { return /^\(pow /.test(w); },
        method : (a, b) => {
            a = losp.func.variable.method(a);
            b = losp.func.variable.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : Math.pow(a.content, b.content) }; };

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
        method : (w) => { return { name : 'number', content : Math.sqrt(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'abs',
        test : (w) => { return /^\(abs /.test(w); },
        method : (w) => { return { name : 'number', content : Math.abs(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'sin',
        test : (w) => { return /^\(sin /.test(w); },
        method : (w) => { return { name : 'number', content : Math.sin(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'cos',
        test : (w) => { return /^\(cos /.test(w); },
        method : (w) => { return { name : 'number', content : Math.cos(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'tan',
        test : (w) => { return /^\(tan /.test(w); },
        method : (w) => { return { name : 'number', content : Math.tan(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'asin',
        test : (w) => { return /^\(asin /.test(w); },
        method : (w) => { return { name : 'number', content : Math.asin(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'acos',
        test : (w) => { return /^\(acos /.test(w); },
        method : (w) => { return { name : 'number', content : Math.acos(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'atan',
        test : (w) => { return /^\(atan /.test(w); },
        method : (w) => { return { name : 'number', content : Math.atan(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'exp',
        test : (w) => { return /^\(exp /.test(w); },
        method : (w) => { return { name : 'number', content : Math.exp(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'log',
        test : (w) => { return /^\(log /.test(w); },
        method : (w) => { return { name : 'number', content : Math.log(losp.func.variable.method(w).content) }; },
        param : 1
    });

    losp.extend({
        name : 'make',
        test : (w) => { return /^\(make /.test(w); },
        method : (a, b) => {
            if(a.name == 'variable'){
                heap[a.content] = losp.func.variable.method(b);
                return heap[a.content];
            };
            return { name : 'null'};
        },
        param : 2
    });
}).call(this);