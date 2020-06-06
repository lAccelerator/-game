var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLmhhYml0ZXZvbHZlLmNvbVwvYXBpXC92MVwvYXV0aG9yaXphdGlvbnMiLCJpYXQiOjE1OTAwNzA4MTgsImV4cCI6MTU5MTI4MDQxOCwibmJmIjoxNTkwMDcwODE4LCJqdGkiOiJFWTNHUTU5U2ZHN090a0puIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.zpkI_TeK4O6SW_poXyRYOYgTNcdNVI8xNoNbrjrSHT4"
var game = new Phaser.Game(1080, 1920, Phaser.CANVAS, 'game');

game.FirstStates={};

//加载资源时的进度条+手机适配
game.FirstStates.boot=function(){

	this.preload=Boot.preload;
	this.create=Boot.create;
}
//加载所有资源
game.FirstStates.load=function(){

	this.preload = Load.preload;
	this.create = Load.create;
}

var mainBackGraphics;
var mainSprite;
//方块里的精灵
var squareSprite;
//小方块背景
var squareBackground;
//方块数组
var squareGroup=new Array();
var shopSquare = new Array();
var poundSquareBottom = new Array();
var poundSquareTop = new Array();
var text;
var mainSpriteBack;
var rareEvolutGroup0;
var display;
var n=0;//记录函数被调用几次；
var poundGroup = new Array(); //存放
//宠物展示界面
game.FirstStates.start = {
  
    create:function(){
		rareEvolutGroup = game.add.group();
		back=game.add.sprite(0,0,'back');
		storehouse=game.add.button(900,700,'storehouse',this.storeHOnclick,this);
		shop=game.add.button(900,300,'shop',this.shopOnclick,this);
		compound = game.add.button(900,500,'compound',this.compoundOnclick,this);
		turnApp = game.add.button(50,50,'turnApp',this.turnAppOnclick,this);
		moneySelf = game.add.sprite(130,200,'moneySelf');
		petSum = game.add.sprite(50,190,'sum');
		turn=game.add.button(950,370,'shut',this.turnOnclick,this);//关闭仓库按钮
		
		numStyle={ font: "28px Arial", fill: "#ffffff",align: "center" };
		moneySelf.addChild(game.add.text(55, 7, currency,numStyle));
		//对宠物进行设置
		pets=game.add.group();
		pets.addChild(pet_about('AminoAcid'));
		pets.addChild(pet_about('Archaea'));
		pets.addChild(pet_about('DNA'));
		pets.addChild(pet_about('EukaryoticCell'));
		pets.addChild(pet_about('ProkaryoticCell'));
		
		head=game.add.sprite(90,160,'head');
		foot=game.add.sprite(100,1300,'foot');
		
		ShopSprite = game.add.sprite(64, 200);
		mainSprite = game.add.sprite(64, 200);
		poundSprite = game.add.sprite(64, 200);
		

		//文字 - 总数量，物种数
		var text_style = { font: "32px Arial", fill: "#ffffff", wordWrap: false, wordWrapWidth: head.width, align: "center" };
		text = game.add.text(20, 30, "总数量:  "+b*petNumber+"   物种数:  "+b, text_style);
		head.addChild(text);
		//文字 - 仓库
		style = { font: "60px Arial", fill: "#ffffff", align: "center" };
		text_store = game.add.text(game.world.centerX-50, 270, "仓库", style);
		text_shop = game.add.text(game.world.centerX-50, 270, "商店", style);
		//文字 - 单个宠物数量
		num_style = {font:"35px Arial",fill:"#ffffff",align:"left"};
		name_style = {font:"50px Arial",fill:"#ffffff",align:"center"};
		//文字 - 合成
		text_pound = game.add.text(game.world.centerX-50, 270, "合成", style);
		textTPount = game.add.text(40, 30, "合成:  ", text_style);
		textBPount = game.add.text(40, 30, "仓库:  ", text_style);


		//text_num = game.add.text(10,5,petNumber,num_style);
		masking_SH=game.add.sprite(0,0,'LBox');//仓库背景蒙版
		maskingShop=game.add.sprite(0,0,'LBox');//商店背景蒙版
		maskingPound=game.add.sprite(0,0,'LBox');//合成背景蒙版
		masking_SH.addChild(turn);
		masking_SH.visible = false;
		//仓库主背景 
		mainBack();
		//描边
		//graphics.lineStyle(lineWidth, color, alpha)
		var petNum;	
		if(a<24){a=24;petNum=6}else{petNum=a}
		for(let i=0;i<petNum;i++){
			for(let j=0; j<4; j++){
				square(j,i);
				
			}
		}
		for(let i=0;i<introJson[0].data.length;i++){
			squareGroup[i].inputEnabled = true;
			squareGroup[i].name=introJson[0].data[i].id;
			squareGroup[i].events.onInputUp.add(clicked, this);
			pet = game.add.sprite(15,40,petsStore[i],2);
			squareGroup[i].addChild(pet);
			squareGroup[i].addChild(game.add.text(10,5,petsNumber[i],num_style));
			if(petsDisplay[i] == 1){
				squareGroup[i].addChild(display= game.add.sprite(130,10,'is_display'));
			}else{continue;}
		}
		// 开启交互
		mainBackGraphics.inputEnabled = true;
		// 允许拖动精灵
		mainBackGraphics.input.enableDrag();
		// 不允许水平方向运动
		mainBackGraphics.input.allowHorizontalDrag = false;
		//文字-仓库,不可视
		text.visible=false;
		text_store.visible=false;
		//两个仓库精灵不可视
		mainBackGraphics.visible=false;
		mainSprite.visible=false;
		//仓库遮罩层
		mask = game.add.graphics(150, 350);
		mask.beginFill(0xffffff);
		mask.drawRoundedRect(0,130,780,1020,5);
		mainBackGraphics.mask = mask;
		//背景框优先级提高
		mainBackGraphics.input.priorityID = 0;
		//动物详细介绍-背景
		masking=game.add.sprite(0,0,'LBox');
		mainSpriteBack=game.add.sprite(180,500,'synopsis');
		masking.visible=false;
		WareButton = game.add.button(560,740,'Warehouse',this.WareOnclick,this);
		OutButton = game.add.button(560,740,'outbound',this.OutOnclick,this);
		ShutButton = game.add.button(685,-10,'shut',this.ShutOnclick,this);
		BuyButton = game.add.button(560,740,'buy',this.BuyOnclick,this);
		WareButton.inputEnabled = true;
		WareButton.input.priorityID = 3;
		OutButton.inputEnabled = true;
		OutButton.input.priorityID = 3;
		ShutButton.inputEnabled = true;
		ShutButton.input.priorityID = 3;
		WareButton.visible=false;
		OutButton.visible=false;
		BuyButton.visible=false;
		mainSpriteBack.addChild(WareButton);//点击放出宠物
		mainSpriteBack.addChild(OutButton);//点击收回宠物
		mainSpriteBack.addChild(ShutButton);//关闭简介
		mainSpriteBack.addChild(BuyButton);//购买宠物
		masking.addChild(mainSpriteBack);
		// outbound.visible=false;
		//商店遮罩
		shopMask = game.add.graphics(150, 250);
		shopMask.beginFill(0xffffff);
		shopMask.drawRoundedRect(0,130,780,1180,5);
		text_shop.visible = false;
		//商店背景板
		var goods;//几行格子 goodNum控制几个格子
		ShopBack();
		if(goodNum<24){goodNum=24;goods=6}else{goods=goodNum}
		for(let i=0;i<goods;i++){
			for(let j=0; j<4; j++){
				ShopSquare(j,i);
			}
		}
		// console.log(shopInfor[0].data);		
		// console.log(goodsID.length);
		for(let i=0;i<goodsID.length;i++){
			shopSquare[i].inputEnabled = true;
			shopSquare[i].name = goodsID[i];
			shopSquare[i].events.onInputUp.add(detail, this);
			shopSquare[i].addChild(game.add.sprite(15,40,shopPic[i],2));
			// if(shopInfor[0].data[i].count == 1){
				shopSquare[i].addChild(game.add.sprite(5,190,'money'));
				shopSquare[i].addChild(game.add.text(70,190,shopInfor[0].data[i].money,num_style));
			// }else{continue;}
		}
		// 开启交互--滑动
		ShopBackGraphics.inputEnabled = true;
		ShopBackGraphics.input.enableDrag();
		ShopBackGraphics.input.allowHorizontalDrag = false;
		//遮罩层
		ShopBackGraphics.mask = shopMask;
		ShopShut = game.add.button(950,370,'shut',this.turnClick,this);//关闭商店按钮
		maskingShop.addChild(ShopShut);
		maskingShop.visible=false;

		//合成
		poundShut = game.add.button(950,370,'shut',this.poundSClick,this);//关闭合成按钮
		maskingPound.addChild(poundShut);
		maskingPound.visible=false;
		text_pound.visible = false;

		miniBoxTop=game.add.sprite(0,20,'miniBox');
		miniBoxBottom=game.add.sprite(0,540,'miniBox');
		compositeButton = game.add.button(350,1050,'composite',this.compositeOnclick,this);

		poundBack();
		miniBoxTop.addChild(textTPount);
		miniBoxBottom.addChild(textBPount);
		for(let i=0;i<2;i++){
			for(let j=0; j<4; j++){
				compoundSquare(j,i,miniBoxTop);	
				poundSquareTop.push(squareBackground);
			}
		}

		if(b<12){b=12;petNum=3}else{petNum=b}
		for(let i=0;i<petNum;i++){
			for(let j=0; j<4; j++){
				compoundSquare(j,i,poundBackGraphics);
				poundSquareBottom.push(squareBackground);
			}
		}
		for(let y=0;y<poundSquareTop.length;y++){
			poundSquareTop[y].inputEnabled = true;
			poundSquareTop[y].events.onInputUp.add(delPound, this);
		}
		// console.log(poundSquareTop.length);
		for(let i=0;i<introJson[0].data.length;i++){
			poundSquareBottom[i].inputEnabled = true;
			poundSquareBottom[i].name=introJson[0].data[i].id;
			poundSquareBottom[i].events.onInputUp.add(joinPound, this);
			pet = game.add.sprite(15,40,petsStore[i],2);
			poundSquareBottom[i].addChild(pet);
			poundNum = game.add.text(10,5,petsNumber[i],num_style);
			// console.log(poundNum.name);
			poundSquareBottom[i].addChild(poundNum);
			// console.log(petsNumber[i]-1);
		}
		//合成遮罩
		poundMask = game.add.graphics(150, 250);
		poundMask.beginFill(0xffffff);
		poundMask.drawRoundedRect(10,730,770,400,5);
		poundBackGraphics.mask=poundMask;
		//滑动设置
		poundBackGraphics.inputEnabled = true;
		poundBackGraphics.input.enableDrag();
		poundBackGraphics.input.allowHorizontalDrag = false;
		//成功界面
		masking2=game.add.sprite(0,0,'LBox');
		sucSpriteBack=game.add.sprite(180,500,'synopsis');
		defineButton=game.add.button(280,800,'define',this.defineOnclick,this);
		
		sucSpriteBack.addChild(defineButton);
		masking2.addChild(sucSpriteBack);
		masking2.visible = false;
	},
	turnOnclick:function(){
		masking_SH.visible = false;
		text_store.visible = false;
		shop.inputEnabled=true;
		compound.inputEnabled=true;
	},
    WareOnclick:function(){	  //点击收回
		$.ajax({
			headers: {
				"Authorization":token,
			},
			url:'https://api.habitevolve.com/api/v1/creature/'+ID+'/is-display/0',
			type:"PATCH",
			success:function(){
				// console.log(1);
				WareButton.visible = false;
				OutButton.visible=true;
				introJson[0].data[idB].is_display=0;
				for(let i=0;i<introJson[0].data.length;i++){
					if(squareGroup[i].name==ID){
						display.destroy();
					}
				}
			}
		})
	},
	OutOnclick:function() {    //点击放出 
		$.ajax({
			headers: {
				"Authorization": token,
			},
			url:'https://api.habitevolve.com/api/v1/creature/+'+ID+'/is-display/1',
			type:"PATCH",
			success:function(){
				// console.log(2);
				WareButton.visible = true;
				OutButton.visible=false;
				console.log(b);
				introJson[0].data[idB].is_display=1;
				for(let i=0;i<introJson[0].data.length;i++){
					if(squareGroup[i].name==ID){
						squareGroup[i].addChild(display= game.add.sprite(130,10,'is_display'));
					}
				}
			}
		})
		
	},
	ShutOnclick:function(){
		masking.input.priorityID = 0;
		animal.pendingDestroy=true;
		minuteBack.pendingDestroy=true;
		rare.pendingDestroy=true;
		// evolut.destroy=true;
		evolut.pendingDestroy=true;
		introName.pendingDestroy=true;
		masking.visible = false;
	},
	//打开仓库
    storeHOnclick:function(){
		masking_SH.visible=true;
		mainSprite.visible=true;	
		mainBackGraphics.visible=true;
		text.visible=true;
		text_store.visible=true;
		shop.inputEnabled=false;
		compound.inputEnabled=false;
	},
	//点击打开合成
	compoundOnclick:function(){ 
		maskingPound.visible=true;
		text_pound.visible = true;
		storehouse.inputEnabled=false;
		shop.inputEnabled=false;
		compositeButton.inputEnabled = true;
		compositeButton.input.priorityID = 1;
	},
	//关闭合成
	poundSClick:function(){
		maskingPound.visible=false;
		text_pound.visible = false;
		storehouse.inputEnabled=true;
		shop.inputEnabled=true;
		compositeButton.input.priorityID = 0;
	},

	//商店部分
	//打开商店
	shopOnclick:function(){
		maskingShop.visible=true;
		storehouse.inputEnabled=false;
		compound.inputEnabled=false;
		text_shop.visible = true;
	},
	//关闭商店
	turnClick:function(){
		maskingShop.visible=false;
		storehouse.inputEnabled=true;
		compound.inputEnabled=true;
		text_shop.visible = false;
	},
	BuyOnclick:function(){           //点击购买
		$.ajax({
			headers: {
				"Authorization": token,
			},
			url:'https://api.habitevolve.com/api/v1/commodity/'+cargoID+'/creature',
			type:"POST",
			success:function(){
				mainSpriteBack.visible=false;
				BuyButton.inputEnabled = false;
				masking.visible = false;
				BuyButton.input.priorityID = 0;
				// console.log(123);
			}
		})
	},
	compositeOnclick:function(){
		console.log(123456);
		$.ajax({
			headers:{
				"Authorization": token,
			},
			url:'https://api.habitevolve.com/api/v1/composition',
			type:"POST",
			data:{
				"creature_ids": poundGroup,
			  },
			success:function(inform){
				console.log(inform.data);
				successName = game.add.text(330,30,inform.data.name,name_style);
				rare=introduce_squ(15,20,'稀有度:   '+inform.data.rarity);
				sucSpriteBack.addChild(introSqu);
				evolut=introduce_squ(15,80,'进化等级:'+inform.data.rarity);
				sucSpriteBack.addChild(introSqu);
				sucSpriteBack.addChild(successName);
				imageBack(225,180,inform.data.resource_name);
				sucSpriteBack.addChild(iBack);
				minutePound(inform.data.description);
				masking2.visible = true;
			}
		})
	},
	defineOnclick:function(){
		masking2.visible=false;


	},
    update:function(){
      //pet.animations.play('moving_top');
      for (var i=0;i<pets.length;i++) {
        //game.physics.arcade.collide(rail_group,i);
         if(pets.getChildAt(i).body.velocity.x > 0)
            pets.getChildAt(i).animations.play('moving_right');
         if(pets.getChildAt(i).body.velocity.x < 0) pets.getChildAt(i).animations.play('moving_left');
		 }
		mainBackGraphics.events.onDragUpdate.add(slider);
		ShopBackGraphics.events.onDragUpdate.add(shopSlider);
		poundBackGraphics.events.onDragUpdate.add(poundSlider);
		//  mainBackGraphics.events.onDragUpdate.add(cliORsli);
    },
}




game.state.add('boot',game.FirstStates.boot);
game.state.add('load',game.FirstStates.load);
game.state.add('start',game.FirstStates.start);
game.state.start('boot');