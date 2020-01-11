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

        cue: {
            type: cc.Node,
            default: null
        },

        min_dis: 20
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.cue_inst = this.cue.getComponent("cue");
        this.start_pos = this.node.position;
        this.body = this.getComponent(cc.RigidBody);

        this.node.on("touchmove", e => {
            let w_pos = e.getLocation();
            let dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            let src = this.node.position;
            let dir = dst.sub(src);
            let len = dir.mag();

            if (len < this.min_dis) {
                this.cue.active = false;
                return;
            }

            this.cue.active = true;

            let r = Math.atan2(dir.y, dir.x);
            var degree = r * 180 / Math.PI;
            degree = 360 - degree;

            console.log(degree)
            this.cue.angle = -degree - 180;

            let cue_pos = dst;
            let cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);
            this.cue.position = cue_pos;
        });

        this.node.on("touchend", e => {
            if (!this.cue.active) {
                return;
            }
            this.cue_inst.shoot_at(this.node.position);
        });
        this.node.on("touchcancel", e => {
            if (!this.cue.active) {
                return;
            }
            this.cue_inst.shoot_at(this.node.position);
        });
    },

    // update (dt) {},

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex === 2) {
            this.node.scale = 0;
            this.scheduleOnce(()=>{
                this.reset();
            }, 1);
        }
    },

    reset() {
        this.node.scale = 1;
        this.node.position = this.start_pos;
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.angularVelocity = 0;
    }
});
