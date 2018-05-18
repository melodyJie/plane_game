BasicGame.Menu = function (game) {

}

BasicGame.Menu.prototype = {
    create: function () {
        // 背景
        var bg = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        // 版权
        this.copyright = this.add.image(12, this.world.height - 16, 'copyright');
        // 我的飞机
        this.myplane = this.add.sprite(100, 100, 'myplane');
        this.myplane.animations.add('fly');
        this.myplane.animations.play('fly', 12, true);
        // 开始按钮
        this.startbutton = this.add.button(70, 200, 'startbutton', this.onStartClick, this, 1, 1, 0);
        // 背景音乐
        this.normalback = this.add.audio('normalback', 0.2, true);
        this.normalback.play();
    },
    onStartClick: function(){
        this.state.start('game');
        this.normalback.stop();
    },
};