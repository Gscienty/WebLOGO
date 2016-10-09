(() => {
    'use strict';

    var environment = this.environment;

    var scripts = [];

    var frame = () => {
        if(scripts.length === 0) { endinganimation(); return; };
        scripts.shift()();
    };

    var begininganimation = () => { if(environment.animationhandler === null) { environment.animationhandler = setInterval(frame, environment.frameinterval); } };

    var endinganimation = () => { if(environment.animationhandler != null) { clearInterval(environment.animationhandler); environment.animationhandler = null; }; };

    this.appendscript = (script) => { scripts.push(script); begininganimation(); };

}).call(this);
