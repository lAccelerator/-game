//判断滑动还是点击
// function cliORsli(){
// 	let y1;
// 	let y2;
// 	if(mainBackGraphics.visible=true){
// 		game.input.onDown.add(function(pointer){
// 			console.log(pointer.y); 
// 		})
// 	}
// }
// 监听滑动事件
// game.input.addMoveCallback(function(pointer,x,y,isTap){
//     if(!isTap && touching){
//         x = mid(x, playerW/2, gWidth - playerW/2);
//         player.x = x;
//     }
// });
//滑动
function slider(){
	BackY = 1300-(Math.ceil(a/4)*190+7*Math.ceil(a/4+2));
	Y=mainBackGraphics.y; 
	if(Y<BackY){
		Y=Y-10;
		mainBackGraphics.y=BackY;
	}
	if(Y>280){
		mainBackGraphics.y=280;
	}
}
//造小方块
function square(i,j){
	squareBackground = game.add.graphics(7, 7);
	squareBackground.beginFill(0x000000,0.2);
	squareBackground.drawRoundedRect(0, 0, 180, 190, 5);
	squareBackground.endFill();
	squareBackground.reset(transX(i),transY(j));
	squareGroup.push(squareBackground);
	//squareGroup[i].addChild(petsStore[i*3+j]);
	mainBackGraphics.addChild(squareBackground);
	
}

//仓库主背景 
function mainBack(){
	mainSpriteBack=game.add.sprite(90,160,'storeBG');
	mainBackGraphics = game.add.graphics(100, 280);
	mainBackGraphics.beginFill(0xffffff, 0);
	mainBackGraphics.drawRoundedRect(0, 0,757, transY(a/4), 10);
	mainBackGraphics.endFill();
	mainSprite.addChild(head);
	mainSprite.addChild(mainSpriteBack);
	mainSprite.addChild(mainBackGraphics);
	mainSprite.addChild(foot);
	masking_SH.addChild(mainSprite);
}

//把后台接收的宠物导入数组

//var petsStore = new Array();
//坐标转换
function transX(i){
	return 7*(i+1)+180*i;	
}
function transY(j){
	return 7*(j+1)+190*j;
}