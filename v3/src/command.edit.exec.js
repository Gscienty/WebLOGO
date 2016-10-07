(function(){
    'use strict';

    function get_type(line){

    };

    this.exec_edit = function(cmds){
        var pc = 0;
        var is_loop = false;
        var stack = [];
        var current_block_info = {};
        current_block_info.type = 'normal';
        current_block_info.length = cmds[pc].match(/^(&nbsp;)*/)[0].length;
        while(pc < cmds_size){
            if(/^(&nbsp;)*if /.test(cmds[pc])){
                var judge_part = cmds[pc].substring(cmds[pc].match(/^(&nbsp;)*if /)[0].length + 1);
                var result = execute_grammer_tree(build_grammer_tree(pre_build_machine_command(judge_part))[0]).content;
                var if_tab_size = current_block_info.length;
                stack.push(current_block_info);
                pc = pc + 1;
                if(result === 'true'){
                    current_block_info = {};
                    current_block_info.type = 'if-true';
                    current_block_info.length = cmds[pc].match(/^(&nbsp;)*/)[0].length;
                }
                else{
                    current_block_info = {};
                    current_block_info.type = 'if-pre-false';
                    while(cmds[pc].match(/^(&nbsp;)*/)[0].length > if_tab_size) { pc = pc + 1; }
                    
                };
            };
        }
    };
}).call(this);