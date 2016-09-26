(function(){
    this.extend({
        name : 'print',
        test : function(a) { return /^(print|pr) .*$/.test(a); },
        method : function(a) { return a; },
        param : function(a) { return a.match(/^(print|pr) (.*)$/)[2]; }
    });
}).call(this.commands);