(function(){
    var losp = this.losp;
    
    losp.extend({
        name : 'equal',
        test : (w) => { return /^\(equal /.test(w); },
        param : 2,
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.variable.method(a);
                b = losp.func.variable.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content === b.content) { return true; }
                    else { return false; };
                }
                else { return false; };
            })() };
        }
    });
    
    losp.extend({
        name : 'great',
        test : (w) => { return /^\(great /.test(w); },
        param : 2,
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.variable.method(a);
                b = losp.func.variable.method(b);
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
        test : (w) => { return /^\(greatequal /.test(w); },
        param : 2,
        method : (a, b) => {
            return { name : 'boolean', content : (() => {
                a = losp.func.variable.method(a);
                b = losp.func.variable.method(b);
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
        test : (w) => { return /^\(less /.test(w); },
        param : 2,
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.variable.method(a);
                b = losp.func.variable.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content < b.content) { return true; }
                    else { return false; }
                }
                else { return false; }
            })() };
        }
    });

    losp.extend({
        name : 'lessequal',
        test : (w) => { return /^\(lessequal /.test(w); },
        param : 2,
        method : (a, b) => {
            return { name : 'boolean', content : (()=>{
                a = losp.func.variable.method(a);
                b = losp.func.variable.method(b);
                if(a.name === 'number' && b.name === 'number'){
                    if(a.content <= b.content) { return true; }
                    else { return false; }
                }
                else { return false; }
            })() };
        }
    });
}).call(this);