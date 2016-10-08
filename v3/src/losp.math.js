(() => {
    'use strict';

    var losp = this.losp;
    var heap = this.heap;

    losp.extend({
        name : 'get',
        test : (w) => { return /^\(get /.test(w); },
        method : (w) => {
            while(w.name === 'block' || w.name === 'variable'){
                if(w.name === 'block') { w = losp.func.exec.method(w); }
                else { w = losp.func.variable.method(w); };
            };
            return w;
         }
    });

    losp.extend({
        name : 'exec',
        test : (w) => { return /^\(exec /.test(w); },
        method : (w) => {
            while(w.name === 'block') {
                w = losp.execfunc(w.content);
                if(w === undefined) w = { name : 'null' };
            };
            return w;
        }
    });
    
    losp.extend({
        name : 'int',
        test : (w) => { return /^\(int /.test(w); },
        method : (w) => { return { name : 'number', content : Math.floor(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'round',
        test : (w) => { return /^\(round /.test(w); },
        method : (w) => { return { name : 'number', content : Math.round(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'div',
        test : (w) => { return /^\(div /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content / b.content }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'remainder',
        test : (w) => { return /^\(remainder /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content % b.content }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'add',
        test : (w) => { return /^\(add /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content + b.content }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'mul',
        test : (w) => { return /^\(mul /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content * b.content }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'sub',
        test : (w) => { return /^\(sub /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : a.content - b.content }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'pow',
        test : (w) => { return /^\(pow /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number'&& b.name === 'number') { return { name : "number", content : Math.pow(a.content, b.content) }; };

            return {name : 'null'};
        }
    });

    losp.extend({
        name : 'random',
        test : (w) => { return /^\(random /.test(w); },
        method : (w) => { return { name : 'number', content : Math.floor(Math.random() * losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'sqrt',
        test : (w) => { return /^\(sqrt /.test(w); },
        method : (w) => { return { name : 'number', content : Math.sqrt(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'abs',
        test : (w) => { return /^\(abs /.test(w); },
        method : (w) => { return { name : 'number', content : Math.abs(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'sin',
        test : (w) => { return /^\(sin /.test(w); },
        method : (w) => { return { name : 'number', content : Math.sin(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'cos',
        test : (w) => { return /^\(cos /.test(w); },
        method : (w) => { return { name : 'number', content : Math.cos(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'tan',
        test : (w) => { return /^\(tan /.test(w); },
        method : (w) => { return { name : 'number', content : Math.tan(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'asin',
        test : (w) => { return /^\(asin /.test(w); },
        method : (w) => { return { name : 'number', content : Math.asin(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'acos',
        test : (w) => { return /^\(acos /.test(w); },
        method : (w) => { return { name : 'number', content : Math.acos(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'atan',
        test : (w) => { return /^\(atan /.test(w); },
        method : (w) => { return { name : 'number', content : Math.atan(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'exp',
        test : (w) => { return /^\(exp /.test(w); },
        method : (w) => { return { name : 'number', content : Math.exp(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'log',
        test : (w) => { return /^\(log /.test(w); },
        method : (w) => { return { name : 'number', content : Math.log(losp.func.get.method(w).content) }; }
    });

    losp.extend({
        name : 'make',
        test : (w) => { return /^\(make /.test(w); },
        method : (a, b) => {
            a = losp.func.exec.method(a);
            if(a.name == 'variable'){
                heap[a.content] = b;
                return heap[a.content];
            };
            return { name : 'null'};
        }
    });
}).call(this);