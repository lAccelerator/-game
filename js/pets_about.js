function pet_about(name){
  name = game.add.sprite(game.world.randomX,game.world.randomY,name);
  //开启宠物物理属性
  //console.log(pet)
  game.physics.arcade.enable(name);
  //设置运动速度
  name.body.velocity.y = Math.random()*300;
  name.body.velocity.x = Math.random()*235;
  //边缘检测
  name.body.collideWorldBounds = true;
  name.body.bounce.y=1;
  name.body.bounce.x=1;
  //宠物的动画
  name.animations.add('moving_right', Phaser.Animation.generateFrameNames('right', 0,3, '', 2), 5, true);
  name.animations.add('moving_left', Phaser.Animation.generateFrameNames('left', 0,3, '', 2), 5, true);

return name;
}

