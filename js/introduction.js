var animal;//动物图片
var minuteBack;
var rare;
var evolut;
var introName;//动物名
//简介中动物的图片
function imageBack(x,y,name){
	iBack = game.add.graphics(x,y);
	iBack.beginFill(0xffffff,0);
	iBack.drawRoundedRect(10, 100, 231,240, 30);
	iBack.endFill();
	animal = game.add.sprite(-10,70,name)
	iBack.addChild(animal);
	animal.scale.setTo(2,2);
}
//简介的详情介绍
function minute(descrip){
	minuteBack = game.add.graphics(10,640);
	minuteBack.beginFill(0xffffff,0.1);
	minuteBack.drawRoundedRect(10, 100, 511,160, 30);
	minuteBack.endFill();
	mainSpriteBack.addChild(minuteBack);
	minuteBack.addChild(game.add.text(26,110,'详细介绍：',style));
	minuteBack.addChild(game.add.text(26,150,descrip,style));
}
//简介的稀有度 进化等级
function introduce_squ(x,y,z){
	style={ font: "25px Arial", fill: "#ffffff", align: "right" }
	introSqu = game.add.graphics(x, y);
	introSqu.beginFill(0xffffff,0.1);
	introSqu.drawRoundedRect(10, 100, 186, 51, 30);
	introSqu.endFill();
	introSqu.addChild(game.add.text(26,110,z,style))
	
	return introSqu;
}
var petsData = new Array();
var ID;
function clicked(i) {
	//介绍页面-名字
	masking.visible = true;
	masking.inputEnabled = true;
	masking.input.priorityID = 2;
	ID=i.name;
	petsData.length = 0;//清空数组
	idB=petsId.indexOf(ID);
	petsData.push({
		'name':introJson[0].data[idB].name,//名字
		'description':introJson[0].data[idB].description,//介绍
		'rarity':introJson[0].data[idB].rarity,//稀有度
		'resource_name':introJson[0].data[idB].resource_name,//资源名
		'is_display':introJson[0].data[idB].is_display//是否展示
	})
	// console.log(petsData[0].name);//名字
	introName = game.add.text(300,30,petsData[0].name,name_style);
	mainSpriteBack.addChild(introName);
	
	rare=introduce_squ(15,20,'稀有度:   '+petsData[0].rarity);
	mainSpriteBack.addChild(introSqu);
	evolut=introduce_squ(15,80,'进化等级:');
	mainSpriteBack.addChild(introSqu);

	imageBack(250,250,petsData[0].resource_name);
	mainSpriteBack.addChild(iBack);

	minute(petsData[0].description);
	if(petsData[0].is_display == 0){
		console.log(petsData[0].is_display);
		OutButton.visible=true;
	}else{WareButton.visible=true;}
}

