(()=>{
    'use strict';

    var losp = this.losp;
    var heap = this.heap;

    losp.extend({
        name : 'first',
        test : (w) => { return /^\(first /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') { return { name : 'string', content : a.content[0] }; };
            if(a.name === 'array') { return a.content[0]; };
        }
    });

    losp.extend({
        name : 'last',
        test : (w) => { return /^\(last /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') { return { name : 'string', content : a.content[a.content.length - 1] }; };
            if(a.name === 'array') { return a.content[a.content.length - 1]; };
        }
    });

    losp.extend({
        name : 'butfirst',
        test : (w) => { return /^\((butfirst|bf) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') { return { name : 'string', content : a.content.substr(1, a.content.length - 1) }; };
            if(a.name === 'array') {
                a.content.shift();
                return a;
            };
        }
    });

    losp.extend({
        name : 'butlast',
        test : (w) => { return /^\((butlast|bl) /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') { return { name : 'string', content : a.content.substr(0, a.content.length - 1) }; };
            if(a.name === 'array') {
                a.content.pop();
                return a;
            };
        }
    });

    losp.extend({
        name : 'isempty',
        test : (w) => { return /^\(isempty /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            return { name : 'boolean', content : (() => {
                if(a.name === 'string') { return a.content === ''; }
                else if(a.name === 'array') { return a.content.length === 0; }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'count',
        test : (w) => { return /^\(count /.test(w); },
        method : (a) => {
            a = losp.func.get.method(a);
            return { name : 'number', content : (() => {
                if(a.name === 'string') { return a.content.length; }
                else if(a.name === 'array') { return a.content.length; }
                else { return 0; };
            })() };
        }
    });

    losp.extend({
        name : 'item',
        test : (w) => { return /^\(item /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'number') {
                if(b.name === 'string') { return { name : 'string', content : b.content[a.content - 1] }; }
                else if(b.name === 'array') { return b.content[a.content - 1]; }
                else { return { name : 'null'}; };
            }
            else { return { name : 'null' }; };
        }
    });

    losp.extend({
        name : 'fput',
        test : (w) => { return /^\(fput /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') {
                b = losp.func.get.method(b);
                if(b.name === 'string') { return { name : 'string', content : b.content + a.content }; };
                return a;
            }
            else if(a.name === 'array') { a.content.splice(0, 0, b); };
            return a;
        }
    });

    losp.extend({
        name : 'lput',
        test : (w) => { return /^\(lput /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            if(a.name === 'string') {
                b = losp.func.get.method(b);
                if(b.name === 'string') { return { name : 'string', content : a.content + b.content }; };
                return a;
            }
            else if(a.name === 'array') {
                b = losp.func.exec.method(b);
                a.content.push(b); 
            };
            return a;
        }
    });

    

    losp.extend({
        name : 'fjoin',
        test : (w) => { return /^\(fjoin /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'string' && b.name === 'string') { a.content = b.content + a.content; }
            else if(a.name === 'array') {
                for(var i = b.content.length - 1; i >= 0; i--){
                    a.splice(0, 0, b.content[i]);
                };
            };
            return a;
        }
    });

    losp.extend({
        name : 'ljoin',
        test : (w) => { return /^\(ljoin /.test(w); },
        method : (a, b) => {
            a = losp.func.get.method(a);
            b = losp.func.get.method(b);
            if(a.name === 'string' && b.name === 'string') { a.content = a.content + b.content }
            else if(a.name === 'array' && b.name === 'array') {
                for(var i = 0; i < b.content.length; i++){ a.content.push(b.content[i]); };
            };
            return a;
        }
    });

    losp.extend({
        name : 'retrival',
        test : (w) => { return /^\(retrival /.test(w); },
        /** a:数组(array) b:代表(variable) c:Retrieval函数(block) */
        method : (a, b, c) => {
            a = losp.func.get.method(a);
            c = losp.func.variable.method(c);
            if(a.name === 'array' && b.name == 'variable' && c.name === 'block'){
            
                return { name : 'array', content : (() => {
                    var result = [];
                    for(var i = 0; i < a.content.length; i++){
                        heap[b.content] = a.content[i];
                        var judge = losp.func.exec.method(c);
                        if(judge.name === 'boolean' && judge.content === true) { result.push(a.content[i]); };
                    };
                    return result;
                })() };
            };
            return { name : 'null' };
        }
    });

}).call(this);