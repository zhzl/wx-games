// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        ball_root: {
            type: cc.Node,
            default: null,
        },
        
        white_ball: {
            type: cc.Node,
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.is_game_started = true;
    },

    check_game_over: function() {
        for (let child of this.ball_root.children) {
            if (child.active) {
                return;
            }
        }

        this.is_game_started = false;
        this.scheduleOnce(()=>{
            for (let child of this.ball_root.children) {
                child.getComponent("ball").reset();
            }
            this.white_ball.getComponent("white_ball").reset();
            this.is_game_started = true;
        }, 5);
    },

    update (dt) {
        if (!this.is_game_started) {
            return;
        }

        this.check_game_over();
    }
});
