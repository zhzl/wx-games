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

        SHOOT_POWER: 18,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);
    },

    // update (dt) {},

    shoot_at(dst) {
        let src = this.node.position;
        let dir = dst.sub(src);

        let cue_len_half = this.node.width * 0.5;
        let len = dir.mag();
        let distance = len - cue_len_half;

        let power_x = distance * this.SHOOT_POWER * dir.x / len;
        let power_y = distance * this.SHOOT_POWER * dir.y / len;

        this.body.applyLinearImpulse(cc.v2(power_x, power_y), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);
    },

    onPreSolve(contact, selfCollider, otherCollider) {
        this.node.active = false;
    }
});
