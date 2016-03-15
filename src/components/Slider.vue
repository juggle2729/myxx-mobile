<style lang="sass">
.slider {
    position: relative;
    width: 100%;
    overflow: hidden;
    .container {
        display: -webkit-box;
        height: 100%;
        min-height: 100%;
    }
    .slide {
        background-size: cover;
        background-position: center;
        width: 100%;
        min-height: 100%;
        height: 100%;
    }
    .paging {
        position: absolute;
        bottom: 0;
        display: block;
        width: 100%;
        .dot {
            display: inline-block;
            margin: 10px;
            width: 20px;
            height: 20px;
            border-radius: 100%;
            border: 2px solid #d9d9d9;
            &.active {
                background-color: white;
            }
        }
    }
    &.fullscreen {
        .slide {
            transition: background-size .3s ease-in;
            background-size: 100%;
            &.zoom {
                background-size: 200%;
            }
        }
    }
}
</style>
<template>
<div class="slider" :style="{height: height}" :class="{'fullscreen': height=='100%'}">
    <div class="container">
        <div v-for="id in ids" class="slide" v-bg="id"></div>
    </div>
    <div class="paging center">
        <div class="dot" :class="{'active': i === $index}" v-for="id in ids"></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Slider',
    props: {
        ids: {
            default: []
        },
        i: {
            default: 0
        },
        height: {
          default: '7rem' // 默认高度
        }
    },
    data() {
        return {
            container: undefined,
            containerWidth: 0,
            touchable: true,
            xy: {
                start: {x: 0, y: 0, time: 0},
                end: {x: 0, y: 0, time: 0},
                direction: undefined
            },
            tap: {
                start: 'touchstart',
                move: 'touchmove',
                end: 'touchend'
            }
        }
    },
    ready() {
        // 初始化
        this.container = this.$el.querySelector('.container');
        this.containerWidth = this.container.clientWidth;
        this.touchable = ('ontouchstart' in document);
        if(!this.touchable) {
            this.tap.start = 'mousedown';
            this.tap.move = 'mousemove';
            this.tap.end = 'mouseup';
        }
        this.$el.addEventListener(this.tap.start, this.start, true);
        this.$el.addEventListener(this.tap.end, this.end, true);

        this.container.addEventListener('webkitTransitionEnd', () => {
            this.xy.end.x = -1 * this.i * this.containerWidth;
            this.container.style.transitionDuration = '0ms';
        });
        this.slide();
    },
    methods: {
        start(e) {
            const {pageX, pageY} = e || e.touches[0];
            this.xy.start.x = pageX;
            this.xy.start.y = pageY;
            this.xy.start.time = Date.now();
            this.$el.addEventListener(this.tap.move, this.moving, true);
        },
        moving(e) {
            const {pageX, pageY} = e || e.touches[0];
            this.xy.end.x = pageX;
            this.xy.end.y = pageY;
            if(!this.touchable || this.xy.direction === 'x') {
                e.preventDefault();
                let translateX = this.xy.end.x - this.xy.start.x - this.i * this.containerWidth;
                this.container.style.transform = `translate3d(${translateX}px, 0, 0)`;
            } else if(!this.xy.direction){
                this.xy.direction = 
                    Math.abs(this.xy.end.x - this.xy.start.x) >= Math.abs(this.xy.end.y - this.xy.start.y) ? 'x' : 'y';
            }
        },
        end(e) {
            this.xy.end.x = e.pageX || e.changedTouches[0].pageX;
            this.xy.end.time = Date.now();
            // 重置
            this.xy.direction = undefined;
            this.$el.removeEventListener(this.tap.move,  this.moving, true);
            const [deltaX, deltaTime] = [this.xy.end.x - this.xy.start.x, this.xy.end.time - this.xy.start.time];
            // 确定当前图片
            if(deltaX > this.containerWidth/2 || (deltaX > 50 && deltaTime < 300)) {
                this.slide(this.i - 1);
            } else if(-deltaX > this.containerWidth/2 || (-deltaX > 50 && deltaTime < 300)) {
                this.slide(this.i + 1);
            } else {
                this.slide(this.i);
            }
        },
        slide(index) {
            if(index !== undefined) {
                this.container.style.transitionDuration = '300ms';
            } else {
                index = this.i;
            }
            index = Math.min(index, this.ids.length-1);
            index = Math.max(index, 0);
            this.i = index;
            this.container.style.transform = `translate3d(${-100*index}%, 0, 0)`;
        }
    }
}
</script>
