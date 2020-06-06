//造小方块
function ShopSquare(i,j){
	squareBackground = game.add.graphics(7, 7);
	squareBackground.beginFill(0x000000,0.2);
	squareBackground.drawRoundedRect(0, 0, 180, 180, 10);
	squareBackground.endFill();
	squareBackground.reset(ShopX(i),ShopY(j));
	shopSquare.push(squareBackground);
	//squareGroup[i].addChild(petsStore[i*3+j]);
	ShopBackGraphics.addChild(squareBackground);	
}

//商店主背景 
function ShopBack(){
	ShopSpriteBack=game.add.sprite(90,160,'storeBG');
	ShopBackGraphics = game.add.graphics(100, 140);
	ShopBackGraphics.beginFill(0xffffff, 0);
	ShopBackGraphics.drawRoundedRect(0, 0,780, transY(a/4), 10);
	ShopBackGraphics.endFill();
	ShopSprite.addChild(ShopSpriteBack);
	ShopSprite.addChild(ShopBackGraphics);
	maskingShop.addChild(ShopSprite);
}
var cargoID;
var shopData = new Array();
function detail(i){
	console.log(i);
	//介绍页面-名字
	masking.visible = true;
	masking.inputEnabled = true;
	masking.input.priorityID = 2;
	cargoID=i.name;
	shopData.length = 0;//清空数组
	b=goodsID.indexOf(cargoID);
	shopData.push({
		'name':shopInfor[0].data[b].name,//名字
		'description':shopInfor[0].data[b].description,//介绍
		'rarity':shopInfor[0].data[b].rarity,//稀有度
		'resource_name':shopInfor[0].data[b].resource_name,//资源名
		'is_display':shopInfor[0].data[b].is_display//是否展示
	})
	// console.log(petsData[0].name);//名字
	introName = game.add.text(300,30,shopData[0].name,name_style);
	mainSpriteBack.addChild(introName);

	rare=introduce_squ(15,20,'稀有度:   '+shopData[0].rarity);
	mainSpriteBack.addChild(introSqu);

	evolut=introduce_squ(15,80,'进化等级:');
	mainSpriteBack.addChild(introSqu);

	imageBack(250,250,shopData[0].resource_name);
	mainSpriteBack.addChild(iBack);

	minute(shopData[0].description);

	BuyButton.inputEnabled = true;
	BuyButton.input.priorityID = 3;
	BuyButton.visible=true;
}
//坐标转换
function ShopX(i){
	return 9*(i+1)+180*i;	
}
function ShopY(j){
	return 50*(j+1)+190*j;
}
//滑动
function shopSlider(){
	BackY = 1400-(Math.ceil(a/4)*180+50*Math.ceil(a/4+2));
	Y=ShopBackGraphics.y; 
	if(Y<BackY){
		Y=Y-10;
		ShopBackGraphics.y=BackY;
	}
	if(Y>145){
		ShopBackGraphics.y=145;
	}
}

