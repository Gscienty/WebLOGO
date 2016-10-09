(() => {
    'use strict';
    this.environment = {
        global : document.getElementById('cvs'),
        activeflag : 'turtle-active-flag',
        active : true,
        x : document.getElementById('cvs').clientWidth / 2,
        y : document.getElementById('cvs').clientHeight / 2,
        angle : Math.PI * 3 / 2,
        color : '#000',
        width : 2,
        animationhandler : null,
        frameinterval : 10,
        speed : 40
    };
}).call(this);