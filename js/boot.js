var BasicGame = {};
BasicGame.Boot = function (game) {

}

BasicGame.Boot.prototype = {
    preload : function () {
        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; 
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }
        this.load.image('loading', 'assets/preloader.gif');
    },
    create : function () {
        this.state.start('preload');
    },
};