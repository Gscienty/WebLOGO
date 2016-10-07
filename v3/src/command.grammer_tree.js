(function(){
    'use strict';

    var commands = this.commands;

    this.build_grammer_tree = function(command_line){
        var node = {};

        for(var name in commands.list){
            var commands_match = commands.list[name].test(command_line);
            var result = null;
            if(commands_match != null){
                node.name = name;
                node.content = commands_match[0];
                var param_count = commands.list[name].param;
                if(param_count === 0) { result = [node, command_line.substring(node.content.length)]; }
                else if(param_count === 1) {
                    var left_tree = build_grammer_tree(command_line.substring(node.content.length));
                    node.left = left_tree[0];
                    result = [node, left_tree[1]];
                }
                else if(param_count === 2) {
                    var left_tree = build_grammer_tree(command_line.substring(node.content.length));
                    node.left = left_tree[0];
                    var right_tree = build_grammer_tree(left_tree[1].substring(1));
                    node.right = right_tree[0];
                    result = [node, right_tree[1]];
                };
                break;
            };
        };

        return result;
    };

    function replace_all(word, ori_word, new_word){
        var result = word;
        while(result.indexOf(ori_word) != -1) { result = result.replace(ori_word, new_word); };
        return result;
    };
    
    this.pre_build_machine_command = function(cmd){
        var pre_cmd = '';
        var has_spacing = false;
        for(var i = 0; i < cmd.length; i++){
            if(cmd[i] === ' ' && has_spacing === true){ continue; }
            else if (cmd[i] === ' ') { has_spacing = true; }
            else { has_spacing = false; }
            pre_cmd = pre_cmd + cmd[i];
        };

        return pre_cmd;
    };

    var execute_grammer_tree = function(node){
        if(node.left === undefined && node.right === undefined) {
            if(node.name === 'number') { return node; }
            else if(node.name === 'variable'){ return node; }
            else if(node.name === 'string') { return node; }
            else if(node.name === 'boolean') { return node; }
            else if(node.name === 'array') { return node; }
            else { return commands.list[node.name].method(); } 
        };
        if(node.left != undefined && node.right === undefined) {
            var result_left = execute_grammer_tree(node.left);
            return commands.list[node.name].method(result_left);
        };
        if(node.left != undefined && node.right != undefined) {
            var result_left = execute_grammer_tree(node.left);
            var result_right = execute_grammer_tree(node.right);
            return commands.list[node.name].method(result_left, result_right);
        };
    };

    this.execute_grammer_tree = execute_grammer_tree;
}).call(this);