(function(){
    'use strict';

    this.build_grammer_tree = function(command_line){
        var node = {};
        for(var name in commands.list){
            var commands_match = commands.list[name].test(command_line);
            if(commands_match != null){
                node.name = name;
                node.content = commands_match[0];
                var param_count = commands.list[name].param;
                if(param_count === 0) { return [node, command_line.substring(node.content.length)]; }
                else if(param_count === 1) {
                    var left_tree = build_grammer_tree(command_line.substring(node.content.length));
                    node.left = left_tree[0];
                    return [node, left_tree[1]];
                }
                else if(param_count === 2) {
                    var left_tree = build_grammer_tree(command_line.substring(node.content.length));
                    node.left = left_tree[0];
                    var right_tree = build_grammer_tree(left_tree[1].substring(1));
                    node.right = right_tree[0];
                    return [node, right_tree[1]];
                };
            };
        };
    };

    var commands = this.commands;

    var execute_grammer_tree = function(node){
        if(node.left === undefined && node.right === undefined) {
            if(node.name === 'number') { return node; }
            else if(node.name === 'variable'){ return node; }
            else if(node.name === 'string') { return node; }
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