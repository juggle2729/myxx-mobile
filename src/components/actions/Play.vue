<style lang="sass">
.play-action {
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: black;
    width: 100%;
    height: 100%;

    video.on, img.on {
        position: relative;
        transform: translate3d(-50%, -50%, 0);
        width: 100%;
        height: auto;
        opacity: 1;
    }
    video, img {
        transition: opacity 1s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        opacity: 0;
        width: 0;
        height: 0;
    }
}
</style>
<template>
<div class="play-action fixed" @click="close">
    <template v-for="media in medias">
        <video v-if="media.type==='video'" 
            :id="media.id" controls 
            :class="{'on': $index===playing}"
            :src="config.video + media.id"
             @ended="ended" 
             @webkitendfullscreen="endFullscreen"></video>
        <img v-else 
            :id="media.id" 
            :class="{'on': $index===playing}"
            :src="config.img + media.id"/>
    </template>
</div>
</template>
<script>
export default {
    name: 'Play',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    computed: {
        medias() {
            // 安卓上的插片广告基本无效，放弃
            return this.env.isAndroid ? this.params.medias.slice(0, 1) : this.params.medias;
        }
    },
    data() {
        return {
            playing: 0,
            interval: undefined,
            timer: undefined
        }
    },
    ready() {
        this.params.cb(this.start);
    },
    methods: {
        start() {
            const v = document.querySelector('.on');
            if(this.medias.length  === 3) {
                const ads = document.querySelector(`[src$='${this.medias[2].id}']`);
                ads.play(); // 必须在这里触发播放
                setTimeout(() => ads.pause(), 1000);
                
                // 获取前面视频和图片的总时长
                this.interval = setInterval(() => {
                    if(v.readyState > 0) {
                        clearInterval(this.interval);
                        this.timer = setTimeout(() => {
                            this.playing += 1;
                            console.debug(this.playing);
                            ads.play();
                        }, v.duration * 1000 + 3000);
                    }
                }, 500);
            }
            v.play();
        },
        ended({target}) {
            target.webkitExitFullscreen();
            if(this.medias[this.playing + 1]) {
                this.playing += 1;
            } else {
                this.close();
            }
        },
        endFullscreen({target}) {
            if(!target.ended) {
                // 最后一个视频 或者 手动退出 时,结束整个播放
                this.close();
            }
        },
        close() {
            this.interval && clearInterval(this.interval);
            this.timer && clearTimeout(this.timer);
            this.params.handler = undefined;
        }
    }
}
</script>
