BasicGame.Game = function (game) {
    this.score = 0;

    this.onStart = function () {
        // 我的子弹
        this.mybullets = MainGame.add.group();
        this.mybullets.enableBody = true;
        this.mybullets.createMultiple(50, 'mybullet'); // 最多存在多少个子弹 设置为1就是最多只有一个子弹
        this.mybullets.setAll('outOfBoundsKill', true); // 超出世界的边界就 kill
        this.mybullets.setAll('checkWorldBounds', true); // 设置是否检查时间的边界
        //console.log(this.mybullets);
        this.myStartFire = true; //控制游戏进行update的开关
        this.bulletTime = 0;
        // 我的飞机允许拖拽
        this.myplane.inputEnabled = true;   // 设置飞机允许拖拽、触控等
        this.myplane.input.enableDrag(false);   // 如果为false，则Sprite将从您单击它的位置拖动dragOffset。如果为true，它会将自身对准鼠标指针的顶端。
        // 奖
        this.awards = MainGame.add.group();
        this.awards.enableBody = true;
        this.awards.createMultiple(1, 'award');
        this.awards.setAll('outOfBoundsKill', true);
        this.awards.setAll('checkWorldBounds', true);
        this.awardMaxWidth = MainGame.width - MainGame.cache.getImage('award').width;
        MainGame.time.events.loop(Phaser.Timer.SECOND * 10, this.generateAward, this); //interval
        // 分数
        var style = { font: "16px Arial", fill: "#ff0000" };
        this.text = MainGame.add.text(0, 0, "Score: 0", style);
        score = 0;
        // 敌机
        var enemyTeam = {
            enemy1: {
                game: this,
                selfPic: 'enemy1',
                bulletPic: 'bullet',
                explodePic: 'explode1',
                selfPool: 10,
                bulletsPool: 50,
                explodePool: 10,
                life: 2,
                velocity: 50,
                bulletX: 9,
                bulletY: 20,
                bulletVelocity: 200,
                selfTimeInterval: 2,
                bulletTimeInterval: 1000,
                score: 10,
                firesound: this.firesound,
                crashsound: this.crash1
            },
            enemy2: {
                game: this,
                selfPic: 'enemy2',
                bulletPic: 'bullet',
                explodePic: 'explode2',
                selfPool: 10,
                bulletsPool: 50,
                explodePool: 10,
                life: 3,
                velocity: 40,
                bulletX: 13,
                bulletY: 30,
                bulletVelocity: 250,
                selfTimeInterval: 3,
                bulletTimeInterval: 1200,
                score: 20,
                firesound: this.firesound,
                crashsound: this.crash2
            },
            enemy3: {
                game: this,
                selfPic: 'enemy3',
                bulletPic: 'bullet',
                explodePic: 'explode3',
                selfPool: 5,
                bulletsPool: 25,
                explodePool: 5,
                life: 10,
                velocity: 30,
                bulletX: 22,
                bulletY: 50,
                bulletVelocity: 300,
                selfTimeInterval: 10,
                bulletTimeInterval: 1500,
                score: 50,
                firesound: this.firesound,
                crashsound: this.crash3
            }
        }
        this.enemy1 = new Enemy(enemyTeam.enemy1);
        this.enemy1.init();
        this.enemy2 = new Enemy(enemyTeam.enemy2);
        this.enemy2.init();
        this.enemy3 = new Enemy(enemyTeam.enemy3);
        this.enemy3.init();
    };
    // 产生一个奖
    this.generateAward = function () {
        var award = this.awards.getFirstExists(false);
        if (award) {
            award.reset(MainGame.rnd.integerInRange(0, this.awardMaxWidth), -MainGame.cache.getImage('award').height);
            award.body.velocity.y = 500;
        }
    };
    // 自己开火
    this.myFireBullet = function () {
        if (this.myplane.alive && MainGame.time.now > this.bulletTime) {
            try {
                this.pi.play();
            } catch (e) { console.log('开火声音播放冲突...'); }
            var bullet;
            bullet = this.mybullets.getFirstExists(false); //true，找到第一个存在的孩子;false:找到第一个不存在的孩子。
            if (bullet) {
                bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                bullet.body.velocity.y = -400; //身体速度或速度的变化速度。以像素/秒为单位进行测量
                this.bulletTime = MainGame.time.now + 200; //子弹发射的频率  以方法体的最后一个为准
            }
            if (this.myplane.level >= 2) {
                bullet = this.mybullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                    bullet.body.velocity.y = -400;
                    bullet.body.velocity.x = -40;
                    this.bulletTime = MainGame.time.now + 200;
                }
                bullet = this.mybullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                    bullet.body.velocity.y = -400;
                    bullet.body.velocity.x = 40;
                    this.bulletTime = MainGame.time.now + 200;
                }
            }
            if (this.myplane.level >= 3) {
                bullet = this.mybullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                    bullet.body.velocity.y = -400;
                    bullet.body.velocity.x = -80;
                    this.bulletTime = MainGame.time.now + 200;
                }
                bullet = this.mybullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(this.myplane.x + 16, this.myplane.y - 15);
                    bullet.body.velocity.y = -400;
                    bullet.body.velocity.x = 80;
                    this.bulletTime = MainGame.time.now + 200;
                }
            }
        }
    };
    // 被敌机打中
    this.hitMyplane = function (myplane, bullet) {
        bullet.kill();
        if (myplane.level > 1) {
            myplane.level--;
        } else {
            myplane.kill();
            this.dead();
        }
    };
    // 与敌机撞击
    this.crashMyplane = function (myplane, enemy) {
        myplane.kill();
        this.dead();
    }
    // 得奖了
    this.getAward = function (myplane, award) {
        award.kill();
        try {
            this.deng.play();
        } catch (e) { }
        if (myplane.level < 3) {
            myplane.level++;
        }
    };
    // 更新分数
    this.updateText = function () {
        this.text.setText("Score: " + score);
    };
    // 挂了
    this.dead = function () {
        try {
            this.ao.play();
        } catch (e) { }
        var myexplode = MainGame.add.sprite(this.myplane.x, this.myplane.y, 'myexplode');
        var anim = myexplode.animations.add('myexplode');
        myexplode.animations.play('myexplode', 30, false, true);
        anim.onComplete.add(this.gotoOver, this);
    };
    // 跳转到Over场景
    this.gotoOver = function () {
        this.playback.stop();
        MainGame.state.start('over');
    };
}

function Enemy(config) {
    this.init = function () {
        this.enemys = MainGame.add.group();
        this.enemys.enableBody = true;
        this.enemys.createMultiple(config.selfPool, config.selfPic);
        this.enemys.setAll('outOfBoundsKill', true);
        this.enemys.setAll('checkWorldBounds', true);
        // 敌人的子弹
        this.enemyBullets = MainGame.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.createMultiple(config.bulletsPool, config.bulletPic);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
        // 敌人的随机位置范围
        this.maxWidth = MainGame.width - MainGame.cache.getImage(config.selfPic).width;
        // 产生敌人的定时器
        MainGame.time.events.loop(Phaser.Timer.SECOND * config.selfTimeInterval, this.generateEnemy, this);
        // 敌人的爆炸效果
        this.explosions = MainGame.add.group();
        this.explosions.createMultiple(config.explodePool, config.explodePic);
        this.explosions.forEach(function (explosion) {
            explosion.animations.add(config.explodePic);
        }, this);
    }
    // 产生敌人
    this.generateEnemy = function () {
        var e = this.enemys.getFirstExists(false);
        if (e) {
            e.reset(MainGame.rnd.integerInRange(0, this.maxWidth), -MainGame.cache.getImage(config.selfPic).height);
            e.life = config.life;
            e.body.velocity.y = config.velocity;
        }
    }
    // 敌人开火
    this.enemyFire = function () {
        this.enemys.forEachExists(function (enemy) {
            var bullet = this.enemyBullets.getFirstExists(false);
            if (bullet) {
                if (MainGame.time.now > (enemy.bulletTime || 0)) {
                    bullet.reset(enemy.x + config.bulletX, enemy.y + config.bulletY);
                    bullet.body.velocity.y = config.bulletVelocity;
                    enemy.bulletTime = MainGame.time.now + config.bulletTimeInterval;
                }
            }
        }, this);
    };
    // 打中了敌人
    this.hitEnemy = function (myBullet, enemy) {
        try {
            config.firesound.play();
        } catch (e) { }
        myBullet.kill();
        enemy.life--;
        if (enemy.life <= 0) {
            try {
                config.crashsound.play();
            } catch (e) { }
            enemy.kill();
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(enemy.body.x, enemy.body.y);
            explosion.play(config.explodePic, 30, false, true);
            score += config.score;
            config.game.updateText();
        }
    };
}

BasicGame.Game.prototype = {
    create: function () {
        // 物理系统
        //MainGame.physics.startSystem(Phaser.Physics.ARCADE);    // 开启物理检测系统
        // 背景
        var bg = MainGame.add.tileSprite(0, 0, MainGame.width, MainGame.height, 'background');
        bg.autoScroll(0, 20);   //背景滚动
        // 我的飞机
        this.myplane = MainGame.add.sprite(100, 100, 'myplane');
        this.myplane.animations.add('fly');
        this.myplane.animations.play('fly', 12, true);// name:动画名称 frameRate:在播放动画时的帧率。速度以每秒帧数给出。 loop:是否循环
        //注释这两行，飞机就无敌了...
        MainGame.physics.arcade.enable(this.myplane);
        //如果设置为true，身体可以设置为自动与世界范围相撞并反弹回世界。否则它将离开世界。身体是否应该与世界蹦极相撞
        this.myplane.body.collideWorldBounds = true;
        //飞机私有属性-等级
        this.myplane.level = 2;
        // 动画
        var tween = MainGame.add.tween(this.myplane).to({ y: MainGame.height - 40 }, 1000, Phaser.Easing.Sinusoidal.InOut, true);
        tween.onComplete.add(this.onStart, this);
        // 背景音乐
        this.playback = MainGame.add.audio('playback', 0.2, true);  // key:资源对象 volume:音量 loop:是否循环 connect:控制在WebAudio下运行时，创建的Sound对象是否连接到SoundManager的主增益节点。
        this.playback.play();
        // 开火音乐
        this.pi = MainGame.add.audio('pi', 1, false);
        // 打中敌人音乐
        this.firesound = MainGame.add.audio('fashe', 5, false);
        // 爆炸音乐
        this.crash1 = MainGame.add.audio('crash1', 10, false);
        this.crash2 = MainGame.add.audio('crash2', 10, false);
        this.crash3 = MainGame.add.audio('crash3', 20, false);
        // 挂了音乐
        this.ao = MainGame.add.audio('ao', 10, false);
        // 接到了奖音乐
        this.deng = MainGame.add.audio('deng', 10, false);
    },
    update: function () {
        if (this.myStartFire) {
            this.myFireBullet();
            this.enemy1.enemyFire();
            this.enemy2.enemyFire();
            this.enemy3.enemyFire();
            // 碰撞检测
            MainGame.physics.arcade.overlap(this.mybullets, this.enemy1.enemys, this.enemy1.hitEnemy, null, this.enemy1);
            MainGame.physics.arcade.overlap(this.mybullets, this.enemy2.enemys, this.enemy2.hitEnemy, null, this.enemy2);
            MainGame.physics.arcade.overlap(this.mybullets, this.enemy3.enemys, this.enemy3.hitEnemy, null, this.enemy3);
            MainGame.physics.arcade.overlap(this.enemy1.enemyBullets, this.myplane, this.hitMyplane, null, this);
            MainGame.physics.arcade.overlap(this.enemy2.enemyBullets, this.myplane, this.hitMyplane, null, this);
            MainGame.physics.arcade.overlap(this.enemy3.enemyBullets, this.myplane, this.hitMyplane, null, this);
            MainGame.physics.arcade.overlap(this.enemy1.enemys, this.myplane, this.crashMyplane, null, this);
            MainGame.physics.arcade.overlap(this.enemy2.enemys, this.myplane, this.crashMyplane, null, this);
            MainGame.physics.arcade.overlap(this.enemy3.enemys, this.myplane, this.crashMyplane, null, this);
            MainGame.physics.arcade.overlap(this.awards, this.myplane, this.getAward, null, this);
        }
    },
    render: function () {
        MainGame.debug.body(this.myplane);
        if(this.mybullets){
            this.mybullets.forEach(function(i){
                MainGame.debug.body(i);
            })
        }
    },
}

