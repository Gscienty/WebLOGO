(function(){
    'use strict';

    var heap = {};
    this.heap = heap;

    var losp = {};
    losp.func = {};
    losp.extend = function(ex){
        losp.func[ex.name] = {};
        losp.func[ex.name].test = ex.test;
        losp.func[ex.name].build = ex.build;
        losp.func[ex.name].method = ex.method;
        losp.func[ex.name].param = ex.param;
    };

    losp.execfunc = function(block){
        for(var funcname in losp.func){
            if(losp.func[funcname].test(block)){
                var blockinfo = losp.block(block);
                var paramcount = losp.func[funcname].param;
                if(paramcount === 0) {
                    if(funcname === 'number') return { name : 'number', content : losp.func.number.method(losp.func.number.build(block)[0]) };
                    if(funcname === 'variable') return { name : 'variable', content : losp.func.variable.build(block)[0] };
                    if(funcname === 'boolean') return { name : 'boolean', content : losp.func.boolean.method(losp.func.boolean.build(block)[0]) };
                    if(funcname === 'array') return { name : 'array', content : losp.func.array.method(losp.func.array.build(block)[0]) };
                    if(funcname === 'string') return { name : 'string', content : losp.func.string.method(losp.func.string.build(block)[0]) };
                    return losp.func[funcname].method(); 
                }
                else if(paramcount === 1) { return losp.func[funcname].method(blockinfo[1]); }
                else if(paramcount === 2) { return losp.func[funcname].method(blockinfo[1], blockinfo[2]); };
            };
        };
        block = block.substr(1, block.length - 2);
        var blocklist = [];
        while(block != ''){
            if(block[0] === ' ') { block = block.substring(1); };
            var length = losp.blocklength(block);
            blocklist.push(block.substr(0, length));
            block = block.substring(length);
        };
        var result = { name : 'null' };
        for(var i = 0; i < blocklist.length; i++){
            result = losp.execfunc(blocklist[i]);
        };

        return result;
    };

    losp.blocklength = function(w){
        var stack = [];
        var length = 0;
        for(var i = 0; i < w.length; i++){
            length = length + 1;
            if(w[i] === '(') stack.push('(');
            else if(w[i] === ')') {
                stack.pop();
                if(stack.length === 0) { break; }
            };
        };
        return length;
    };

    losp.block = function(w){
        var length = losp.blocklength(w);
        var inner = w.substr(1, length - 2);
    
        inner = inner.substring((function(){
            for(var i = 0; i < inner.length; i++){
                if(inner[i] === ' ') { return i + 1; };
            };
            return inner.length;
        })());

        var result = [];
        result.push(length);
        while(inner != ''){
            while(inner[0] === ' ') { inner = inner.substring(1); };
            if(losp.func.number.test(inner)){
                var numbergroup = losp.func.number.build(inner);
                inner = numbergroup[1];
                result.push({ name : 'number', content : losp.func.number.method(numbergroup[0]) });
            }
            else if(losp.func.variable.test(inner)){
                var variablegroup = losp.func.variable.build(inner);
                inner = variablegroup[1];
                result.push({ name : 'variable', content : variablegroup[0] });
            }
            else if(losp.func.string.test(inner)){
                var stringgroup = losp.func.string.build(inner);
                inner = stringgroup[1];
                result.push({ name : 'string', content : losp.func.string.method(stringgroup[0]) });
            }
            else if(losp.func.boolean.test(inner)){
                var booleangroup = losp.func.boolean.build(inner);
                inner = booleangroup[1];
                result.push({ name : 'boolean', content : losp.func.boolean.method(booleangroup[0]) });
            }
            else if(losp.func.array.test(inner)){
                var arraygroup = losp.func.array.build(inner);
                inner = arraygroup[1];
                result.push({ name : 'array', content : losp.func.array.method(arraygroup[0]) });
            }
            else if(/^\(/.test(inner)){
                var blocklength = losp.blocklength(inner);
                result.push({ name : 'block', content : inner.substr(0, blocklength) });
                
                inner = inner.substring(blocklength);
            }
        }
        return result;
    };

    losp.extend({
        name : 'number',
        test : (w) => { return /^(-)?\d+(\.\d+)?/.test(w); },
        build : (w) => {
            var group = w.match(/^(-)?\d+(\.\d+)?/)[0];
            return [group, w.substring(group.length)];
        },
        method : (w) => { return parseFloat(w); },
        param : 0
    });

    losp.extend({
        name : 'variable',
        test : (w) => { return /^\$(_|[a-zA-Z])(\w+)?/.test(w); },
        build : (w) => {
            var group = w.match(/^\$(_|[a-zA-Z])(\w+)?/)[0];
            return [group, w.substring(group.length)];
        },
        method : (a) => {
            if(a.name === 'block') {
                return losp.execfunc(a.content); 
            };
            while(a.name === 'variable') { 
                a = heap[a.content]; 
            }; 
            return a; 
        },
        param : 0
    });

    losp.extend({
        name : 'string',
        test : (w) => { return /^'.*?'/.test(w); },
        build : (w) => {
            var group = w.match(/^'.*?'/)[0];
            return [group, w.substring(group.length)];
        },
        method : (w) => { return w.substr(1, w.length - 2); },
        param : 0
    });

    losp.extend({
        name : 'boolean',
        test : (w) => { return /^true|^false/.test(w); },
        build : (w) => {
            var group = w.match(/^true|^false/)[0];
            return [group, w.substring(group.length)];
        },
        method : (w) => { return w === 'true'; },
        param : 0
    });

    losp.extend({
        name : 'array',
        test : (w) => { return /^\[/.test(w); },
        build : (w) => {
            var stack = [];
            var length = 0;
            for(var i = 0; i < w.length; i++){
                length = length + 1;
                if(w[i] === '[') { stack.push('['); }
                else if(w[i] === ']') { 
                    stack.pop();
                    if(stack.length === 0) { break; };
                };
            };

            return [w.substr(0, length), w.substring(length)];
        },
        method : (a) => {
            var result = [];
            var values = a.content.substr(1, a.content.length - 2);
            while(values.length != 0){
                while(values[0] === ' ') { values = values.substring(1); };
                var current_ptr = commands.list['array'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'array', content : losp.func.array.method(current_ptr[0]) });
                    values = values.substring(current_ptr[0].length);
                    continue;
                };
                current_ptr = commands.list['boolean'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'boolean', content : losp.func.boolean.method(current_ptr[0]) });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['string'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'string', content : losp.func.string.method(current_ptr[0]) });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['variable'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'variable', content : current_ptr[0] });
                    values = values.substring(current_ptr[0].length);
                };
                current_ptr = commands.list['number'].test(values);
                if(current_ptr != null){
                    result.push({ name : 'number', content : losp.func.number.method(current_ptr[0]) });
                    values = values.substring(current_ptr[0].length);
                };
            };

            return result;
        },
        param : 0
    });

    this.losp = losp;
}).call(this);