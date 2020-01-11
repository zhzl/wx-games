const map_gen = require("map_gen");

cc.Class({
    extends: cc.Component,

    properties: {
        is_debug: false,
        speed: 100,

        map: {
            type: map_gen,
            default: null
        }
    },

    start () {
        this.road_set = this.map.get_road_set();
        this.road_data = this.road_set[0];

        this.is_walking = false;

        this.walk_on_road();
    },

    walk_on_road() {
        if (this.road_data.length < 2) {
            return;
        }
        this.node.position = this.road_data[0];
        this.next_step = 1;
        this.walk_to_next();
    },

    walk_to_next() {
        if (this.next_step >= this.road_data.length) {
            this.is_walking = false;
            return;
        }

        this.is_walking = true;

        let src = this.node.position;
        let dst = this.road_data[this.next_step];
        let dir = dst.sub(src);
        let len = dir.mag();

        this.walk_time = len / this.speed;
        this.now_time = 0;

        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
    },

    update(dt) {
        if (this.is_walking === false) {
            return;
        }

        this.now_time += dt;
        if (this.now_time > this.walk_time) {
            dt -= (this.now_time - this.walk_time);
        }
        
        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);

        if (this.now_time >= this.walk_time) {
            this.next_step++;
            this.walk_to_next();
        }
    }
});
