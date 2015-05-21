(function () {
	var root = this;
	//编译器 编辑器，状态块，指令块，画布ID
	var Complier = function (textarea, instruction, state, plot) {
		//编辑器部分
		var editorid = textarea;
		//状态块
		var stateblock = d3.select(state);
		//指令块
		var instructionset = d3.select(instruction);
		//画布
		var plotname = plot;

		//private functions
		var prifuns = {
			ResetComplier : function () {
				d3.select(plotname).style('display','none');
				d3.select(plotname).selectAll('svg').remove();
				instructionset.text('');
				stateblock.selectAll('li').remove();
			},
			AddState : function (info) {
				stateblock.append('li').text(info);
			},
			PutTurtle : function () {
				return 'var t=new Turtle({name:"'+plotname+'",width:"100%",height:"100%"});t.place(300,300);';
			},
			MoveTurtle : function (step) {
				return 't.move('+step+');';
			},
			DisplayPlot : function () {
				d3.select(plotname).style('display','block');
			}
		};

		this.complie = function () {
			prifuns.AddState('compling...');
			prifuns.ResetComplier();
			var insSet = prifuns.PutTurtle();
			prifuns.AddState('put turtle success.');

			var txtSet = document.getElementById(editorid).value.split('\n').map(function (line) {
				var blocks = line.split(' ');
				switch(blocks[0].toUpperCase()){
					case 'FD':
						insSet = insSet + prifuns.MoveTurtle(blocks[1]);
						break;
				}
			});

			prifuns.DisplayPlot();
			//#test
			eval(insSet);
			//#endtest

			instructionset.text(insSet);
		};
	};

	root.Complier = Complier;
}).call(this);