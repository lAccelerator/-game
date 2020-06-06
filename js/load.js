 var Load={
	preload:function(){
		//进度条设置
		//var preloadSprite = game.add.sprite(0,0,'preload');
		//game.load.setPreloadSprite(preloadSprite);
		//资源
		game.load.image('back','assets/back.png');
		game.load.image('LBox','assets/LightBox.png');
		game.load.image('close','assets/turn.png');
		game.load.atlasJSONHash('AminoAcid','assets/AminoAcid.png','assets/AminoAcid.json');
		game.load.atlasJSONHash('Archaea','assets/Archaea.png','assets/Archaea.json');
		game.load.atlasJSONHash('DNA','assets/DNA.png','assets/DNA.json');
		game.load.atlasJSONHash('EukaryoticCell','assets/EukaryoticCell.png','assets/EukaryoticCell.json');
		game.load.atlasJSONHash('ProkaryoticCell','assets/ProkaryoticCell.png','assets/ProkaryoticCell.json');
		game.load.spritesheet('storehouse','assets/storehouse.png');
		game.load.spritesheet('shop','assets/shop.png');
		game.load.image('head','assets/head.png');
		game.load.image('storeBG','assets/storeBG.png');
		game.load.image('synopsis','assets/synopsis.png');
		game.load.image('foot','assets/foot.png');
		game.load.image('is_display','assets/is_display.png');
		game.load.image('DNA_alone','assets/DNA_alone.png');
		game.load.image('Warehouse','assets/Warehouse.png');
		game.load.image('outbound','assets/outbound.png');
		game.load.image('shut','assets/shut.png');
		game.load.image('turn','assets/turn.png');
		game.load.image('money','assets/money.png');
		game.load.image('buy','assets/buy.png');
		game.load.image('composite','assets/composite.png');//合成按钮
		game.load.image('miniBox','assets/miniBox.png');
		game.load.image('compound','assets/compound.png');
		game.load.image('turnApp','assets/turnApp.png');
		game.load.image('moneySelf','assets/moneySelf.png');
		game.load.image('sum','assets/petSum.png');
		game.load.image('define','assets/define.png');
	 },
	 create:function(){
		game.state.start('start');
	 }
	 
  }
	var petsStore = new Array();
	function putInGroup(pageName){
		petsStore.push(pageName);
	}
	var petsNumber = new Array();
	function putInArray(petNumber){
		petsNumber.push(petNumber);
	}
	var petsDisplay = new Array();
	function putInDis(petDisplay){
		petsDisplay.push(petDisplay);
	};

	var introJson = new Array();
	function putInJson(petData){
		introJson.push(petData);
	};
	var petsId = new Array();//宠物ID
	function putInIds(petID){
		petsId.push(petID);
	}
	var shopInfor = new Array();  //商店所有信息
	function  goodsInform(inform){
		shopInfor.push(inform);
	}
	var shopPic=new Array();//商店图片名
	function goodsPicture(Picture){
		shopPic.push(Picture)
	}
	var goodsID=new Array();
	function goodsComID(commodyId){
		goodsID.push(commodyId);
		// console.log(goodsID.length);

	}
var a=0;
var b=0;
var goodNum=0;//商品 假 数量
var goodNumB=0;//商品 真 数量
var pageName;//资源图片名
var petID;//宠物ID
var petName;//宠物名
var petDesc;//宠物描述
var petRarity;//宠物稀有度
var petDisplay=0;//宠物是否展示
var petNumber=0;//拥有数量
var currency;//拥有货币数
//查询当前用户拥有生物
window.onload=function(){
	getShop();
	getMoney();
	$.ajax({
		async:false,
		headers: {
			"Authorization":token,
        },
		url:'https://api.habitevolve.com/api/v1/creatures',
		type:"GET",
		dataType:'json',
	success:function(petData){
		putInJson(petData);
		for(let i=0;i<petData.data.length;i++){
			petID=petData.data[i].id;//生物id
			pageName=petData.data[i].resource_name;//生物资源名
			petName=petData.data[i].name;//生物中文名
			petDesc=petData.data[i].description;//生物描述
			petRarity=petData.data[i].rarity;//生物稀有度
			petDisplay=petData.data[i].is_display;//是否展示
			petNumber=petData.data[i].count;//生物拥有数量
			
			a=a+1;
			b=b+1;
			putInIds(petID);
			putInDis(petDisplay);
			for(let j=0;Math.ceil(j<b/4);j++){
			putInArray(petNumber);
			putInGroup(pageName);
		}
		}
	}
	})
}
//查询当前用户商城生物
function getShop(){
	$.ajax({
		async:false,
		headers: {
			"Authorization":token,
        },
		url:'https://api.habitevolve.com/api/v1/commodity/creatures',
		type:"GET",
		dataType:'json',
	success:function(inform){
		// console.log(1);
		goodsInform(inform);
		goodNum=inform.data.length;
		goodNumB=inform.data.length;
		for(let i=0;i<goodNumB;i++){
			Picture = inform.data[i].resource_name;
			commodities_id = inform.data[i].commodities_id;
			count = inform.data[i].count;
			if(count==1){
				goodsPicture(Picture);
				goodsComID(commodities_id);
			}else{continue;}
		}
	}
	})
  }

  function getMoney(){
	$.ajax({
		async:false,
		headers: {
			"Authorization": token,
        },
		url:'https://api.habitevolve.com/api/v1/user/me',
		type:"GET",
		dataType:'json',
	success:function(inform){
		currency=inform.data.money;
	}
	  })
  }