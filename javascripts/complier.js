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
			iteratornumber : 0,
			ResetComplier : function () {
				prifuns.iteratornumber = 0;
				d3.select(plotname).style('display','none');
				d3.select(plotname).selectAll('svg').remove();
				instructionset.text('');
				stateblock.selectAll('li').remove();
			},
			//添加状态
			AddState : function (info) {
				stateblock.append('li').text(info);
			},
			//放置海龟
			PutTurtle : function () {
				return 'var t=new Turtle({name:"'+plotname+'",width:"100%",height:"420"});t.place(300,50);';
			},
			//瞬移海龟
			Place : function (x, y) {
				return 't.place('+x+','+y+');';
			},
			//move
			MoveTurtle : function (step) {
				return 't.move('+step+');';
			},
			//显示画布
			DisplayPlot : function () {
				d3.select(plotname).style('display','block');
			},
			//设置颜色
			SetColor : function (color) {
				return 't.setcolor("'+color+'");';
			},
			//旋转
			Turn : function (angle) {
				return 't.turn('+angle+');';
			},
			//绘图开关
			DrawSwitch : function (isDraw) {
				return 't.drawswitch('+isDraw+');';
			},
			//清除所有笔迹
			EraseDraw : function () {
				return 'd3.select("'+plotname+'").selectAll("line").remove();';
			},
			//重复执行
			Repeater : function (loop) {
				prifuns.iteratornumber = prifuns.iteratornumber + 1;
				return 'for(var i_'+prifuns.iteratornumber+'=0;i_'+prifuns.iteratornumber+'<'+loop+';i_'+prifuns.iteratornumber+'++)';
			},
			Remember : function () {
				return 't.remember();';
			},
			Recall : function () {
				return 't.recall()';
			},
			//参数个数
			InsParamCount : function (ins) {
				switch(ins.toUpperCase()){
					case 'PL':
						return 2;
					//forward
					case 'FD':
					//back
					case 'BK':
					//turn right
					case 'RT':
					//turn left
					case 'LT':
					//set color
					case "SETPC":
					//reapter
					case 'REPEAT':
					//console log
					case 'LOG':
						return 1;
					//pen up
					case 'PU':
					//pen down
					case 'PD':
					//pen erase
					case 'PE':
					//remember
					case 'RM':
					//recall
					case 'RC':

					case '{':
					case '}':
						return 0;
				};
			},
			//执行指令
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
					case 'SETPC':
						return prifuns.SetColor(ins[1]);
					case 'PU':
						return prifuns.DrawSwitch(false);
					case 'PD':
						return prifuns.DrawSwitch(true);
					case 'PE':
						return prifuns.EraseDraw();
					case 'REPEAT':
						return prifuns.Repeater(ins[1]);
					case 'LOG':
						prifuns.AddState('log:' + eval(ins[1]));
						return '';
					case 'RM':
						return prifuns.Remember();
					case 'RC':
						return prifuns.Recall();
					case '{':
						return '{';
					case '}':
						return '};';
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
				var blocks = line.replace('{', ' { ').replace('}', ' } ').replace('(', ' ').replace(')', ' ').split(' ').map(function (block) {
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

			prifuns.AddState('complied success.');
			instructionset.text(insSet);
	
			//#test
			prifuns.DisplayPlot();
			eval(insSet);
			//#endtest
		};
	};

	root.Complier = Complier;
}).call(this);