var typeNum=[1,1,1,1,1,1,1,1]; //合成 左上角的数字
//造小方块
function compoundSquare(i,j,name){
	squareBackground = game.add.graphics(7, 7);
	squareBackground.beginFill(0x000000,0.2);
	squareBackground.drawRoundedRect(0, 0, 180, 190, 10);
	squareBackground.endFill();
	squareBackground.reset(transX(i)+10,transY(j)+80);
	//squareGroup[i].addChild(petsStore[i*3+j]);
	name.addChild(squareBackground);	
}

//仓库主背景 
function poundBack(){
	poundSpriteBack=game.add.sprite(90,160,'storeBG');
	poundBackGraphics = game.add.graphics(95, 710);
	poundBackGraphics.beginFill(0xffffff, 0);
	poundBackGraphics.drawRoundedRect(0, 0,780, transY(a/4), 10);
	poundBackGraphics.endFill();
	poundSprite.addChild(poundSpriteBack);
	poundSprite.addChild(poundBackGraphics);
	poundSpriteBack.addChild(miniBoxTop);
	poundSpriteBack.addChild(miniBoxBottom);
	poundSpriteBack.addChild(compositeButton);
	maskingPound.addChild(poundSprite);
}

//详细介绍背景
function minutePound(descrip){
	minuteBack = game.add.graphics(10,500);
	minuteBack.beginFill(0xffffff,0.1);
	minuteBack.drawRoundedRect(10, 100, 680,160, 30);
	minuteBack.endFill();
	sucSpriteBack.addChild(minuteBack);
	minuteBack.addChild(game.add.text(26,110,'详细介绍：',style));
	minuteBack.addChild(game.add.text(26,150,descrip,style));
}

//i滑动
function poundSlider(){
	BackY = 1650-(Math.ceil(a/4)*180+7*Math.ceil(a/4+2));
	Y=poundBackGraphics.y; 
	if(Y<BackY){
		Y=Y-10;
		poundBackGraphics.y=BackY;
	}
	if(Y>710){
		poundBackGraphics.y=710;
	}
}

function joinPound(i){
	n=n+1;
	idB=petsId.indexOf(i.name);
	// console.log(i);
	resource_name=introJson[0].data[idB].resource_name;//资源名
	creatId=introJson[0].data[idB].id;
	index=(petsId.indexOf(i.name));
	// console.log(introJson[0].data[idB]);
	// i.getByName(poundNum.name); 
	if(petsNumber[index]>0){
		startNum = typeNum[n-1];
		overNum = petsNumber[index]-1;
		petsNumber[index]=overNum;
			//第一个
			if (poundSquareTop[0].children.length==0){
				poundSquareTop[n-1].addChild(game.add.sprite(15,40,resource_name));
				// console.log(startNum);
				poundSquareTop[n-1].addChild(game.add.text(10,5,startNum,num_style));
				poundGroup.push(String(creatId));
			}
			//非第一
			else{
				hasPet=false;
				for(x=0;x<n-1;x++){
					if(poundSquareTop[x].getChildAt(0).key == i.getChildAt(0).key){
						poundSquareTop[x].getChildAt(1).setText(typeNum[x]+1);
						typeNum[x]=typeNum[x]+1;
						poundGroup.push(String(creatId));
						hasPet = true;
						break;
					}
				}
				//如果与前面的不重复
				if(! hasPet){
					poundSquareTop[n-1].addChild(game.add.sprite(15,40,resource_name));
					poundSquareTop[n-1].addChild(game.add.text(10,5,1,num_style));
					poundGroup.push(String(creatId));
					// console.log(i)
				//如果重复
				}else{					
					n=n-1;
				}
			}
	}
	// console.log(i);
	i.getChildAt(1).setText(overNum);
}
function delPound(i){
	indexTop=(poundSquareTop.indexOf(i));
	//如果右上角数字等于1
	if(typeNum[indexTop]==1){
		Aname=poundSquareTop[indexTop].getChildAt(0).key; //查找精灵名字
		console.log(Aname);
		for(z=0;z<introJson[0].data.length;z++){
			if(Aname==introJson[0].data[z].resource_name){
				Bindex=poundGroup.indexOf(introJson[0].data[z].id);
				poundGroup.splice(Bindex,1);
				console.log(poundGroup);
				break;
			}
		}
		poundSquareTop[indexTop].getChildAt(0).destroy();
		poundSquareTop[indexTop].getChildAt(0).destroy();
		poundSquareBottom[indexTop].getChildAt(1).setText(typeNum[indexTop]);
	}else{
		typeNum[indexTop]=typeNum[indexTop]-1;
		poundSquareTop[indexTop].getChildAt(1).setText(typeNum[indexTop]+1);
	}
	// console.log(i);
}