BasicGame.Over = function (game) {
    // 重来
    this.onReplayClick = function () {
        this.normalback.stop();
        MainGame.state.start('game');
    };
    // 分享
    this.onShareClick = function () {
        //document.title = makeTitle(score);
        //document.getElementById('share').style.display = 'block';
    };
}

BasicGame.Over.prototype = {
    create: function () {
        // 背景
        var bg = MainGame.add.tileSprite(0, 0, MainGame.width, MainGame.height, 'background');
        // 我的飞机
        this.myplane = MainGame.add.sprite(100, 100, 'myplane');
        this.myplane.animations.add('fly');
        this.myplane.animations.play('fly', 12, true);
        // 分数
        var style = { font: "bold 32px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle" };
        this.text = MainGame.add.text(0, 0, "Score: " + score, style);
        this.text.setTextBounds(0, 0, MainGame.width, MainGame.height);
        // 重来按钮
        this.replaybutton = MainGame.add.button(80, 300, 'replaybutton', this.onReplayClick, this, 0, 0, 1);
        // 分享按钮
        //this.sharebutton = MainGame.add.button(130, 300, 'sharebutton', this.onShareClick, this, 0, 0, 1);
        // 背景音乐
        this.normalback = MainGame.add.audio('normalback', 0.2, true);
        this.normalback.play();
    },
};