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
				return 'var t=new Turtle({name:"'+plotname+'",width:"100%",height:"100%"});t.place(300,50);';
			},
			Place : function (x, y) {
				return 't.place('+x+','+y+');';
			},
			MoveTurtle : function (step) {
				return 't.move('+step+');';
			},
			DisplayPlot : function () {
				d3.select(plotname).style('display','block');
			},
			SetColor : function (color) {
				return 't.setcolor('+color+');';
			},
			Turn : function (angle) {
				return 't.turn('+angle+');';
			},
			InsParamCount : function (ins) {
				switch(ins.toUpperCase()){
					case 'PL': return 2;
					//forward
					case 'FD':
					//back
					case 'BK':
					//turn right
					case 'RT':
					//turn left
					case 'LT':
					//set color
					case "SETPC": return 1;
				};
			},
			ExecIns : function (ins) {
				switch(ins[0].toUpperCase()){
					case 'PL':
						return prifuns.Place(ins[1], ins[2]);
					//forward
					case 'FD':
						return prifuns.MoveTurtle(ins[1]);
					//back
					case 'BK':
						return prifuns.MoveTurtle('-'+ins[1]);
					//turn right
					case 'RT':
						return prifuns.Turn(ins[1]);
					//turn left
					case 'LT':
						return prifuns.Turn('-'+ins[1]);
					//set color
					case "SETPC":
						return SetColor(ins[1]);
					default:
						return '';
				};
			}
		};

		this.complie = function () {
			prifuns.AddState('compling...');
			prifuns.ResetComplier();
			var insSet = prifuns.PutTurtle();
			prifuns.AddState('put turtle success.');

			var insary = [];
			var currentParams = 0;
			var txtSet = document.getElementById(editorid).value.split('\n').map(function (line) {
				var blocks = line.replace('(', ' ').replace(')', ' ').split(' ').map(function (block) {
					if(block!=''){
						if(!insary.length){
							currentParams = prifuns.InsParamCount(block);
						}
						else{
							currentParams = currentParams - 1;
						}
						insary.push(block);
						if(!currentParams){
							insSet = insSet + prifuns.ExecIns(insary);
							insary = [];
						}
					}
				})
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