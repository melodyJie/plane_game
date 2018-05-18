BasicGame.Preload = function (game) {
    
}

BasicGame.Preload.prototype = {
    create:function () {
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
        this.text = this.add.text(this.world.width / 2, this.world.height / 2 - 50, '', { fill: '#fff' });
        this.text.anchor.set(0.5); //文字相对于原点居中
        this.start();
    },
    start: function () {
        var preloadSprite = this.add.sprite((this.world.width-220)/2, this.world.height / 2, 'loading');
        this.load.setPreloadSprite(preloadSprite);
        this.load.image('background', 'assets/bg.jpg');
        //spritesheet 精灵表
        this.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
        this.load.spritesheet('startbutton', 'assets/startbutton.png', 100, 40, 2);
        this.load.spritesheet('replaybutton', 'assets/replaybutton.png', 80, 30, 2);
        this.load.spritesheet('sharebutton', 'assets/sharebutton.png', 80, 30, 2);
        this.load.image('mybullet', 'assets/mybullet.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('enemy2', 'assets/enemy2.png');
        this.load.image('enemy3', 'assets/enemy3.png');
        this.load.spritesheet('explode1', 'assets/explode1.png', 20, 20, 3);
        this.load.spritesheet('explode2', 'assets/explode2.png', 30, 30, 3);
        this.load.spritesheet('explode3', 'assets/explode3.png', 50, 50, 3);
        this.load.spritesheet('myexplode', 'assets/myexplode.png', 40, 40, 3);
        this.load.image('award', 'assets/award.png');

        this.load.audio('normalback', 'assets/iamalive.mp3');
        this.load.audio('playback', 'assets/iamalive.mp3');
        this.load.audio('fashe', 'assets/fashe001.mp3');
        this.load.audio('crash1', 'assets/crash1.mp3');
        this.load.audio('crash2', 'assets/crash2.mp3');
        this.load.audio('crash3', 'assets/crash3.mp3');
        this.load.audio('ao', 'assets/ao.mp3');
        this.load.audio('pi', 'assets/pi.mp3');
        this.load.audio('deng', 'assets/deng.mp3');
        this.load.start();
    },
    fileComplete: function (progress) {
        this.text.setText(+progress + '%');
    },
    loadComplete: function (){
        this.state.start('menu');
    },
}