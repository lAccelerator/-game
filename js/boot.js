var ax=300;
var Boot ={
//加载资源时的进度条+手机适配
   preload:function(){ 
      //进度条动态图
      //game.load.image('preload','asset/xxx.gif')
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
   },
   create:function(){
      game.state.start('load');
   }
};