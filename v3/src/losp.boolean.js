(() => {
    var losp = this.losp;
    
    losp.extend({
        name : 'equal',
        test : (w) => { return /^\((equal|eq) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content === b.content) { return true; }
                    else { return false; };
                }
                else if(a.name === 'string' && b.name === 'string'){
                    if(a.content === b.content) { return true; }
                    else { return false; };
                }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'notequal',
        test : (w) => { return /^\((notequal|neq) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content != b.content) { return true; }
                    else { return false; };
                }
                else if(a.name === 'string' && b.name === 'string'){
                    if(a.content != b.content) { return true; }
                    else { return false; };
                }
                else { return false; };
            })() };
        }
    });
    
    losp.extend({
        name : 'great',
        test : (w) => { return /^\((great|gt) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content > b.content) { return true; }
                    else { return false; };
                }
                else { return false; };
            })() };
        }
    });
    
    losp.extend({
        name : 'greatequal',
        test : (w) => { return /^\((greatequal|gteq) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content >= b.content) { return true; }
                    else { return false; };
                }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'less',
        test : (w) => { return /^\((less|lt) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content < b.content) { return true; }
                    else { return false; }
                }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'lessequal',
        test : (w) => { return /^\((lessequal|lteq) /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content <= b.content) { return true; }
                    else { return false; }
                }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'and',
        test : (w) => { return /^\(and /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'boolean' && b.name === 'boolean'){ return a.content && b.content; }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'or',
        test : (w) => { return /^\(or /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'boolean' && b.name === 'boolean'){ return a.content || b.content; }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'xor',
        test : (w) => { return /^\(xor /.test(w); },
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                b = losp.func.get.method(b);
                if(a.name === 'boolean' && b.name === 'boolean'){ return (a.content === false && b.content) || (a.content && b.content === false); }
                else { return false; };
            })() };
        }
    });

    losp.extend({
        name : 'not',
        test : (w) => { return /^\(not /.test(w); },
        method : (a) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.get.method(a);
                if(a.name === 'boolean'){ return a.content === false; }
                else { return false; };
            })() };
        }
    });


}).call(this);