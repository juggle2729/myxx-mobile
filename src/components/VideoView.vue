<template>
    <div class="video-view">
        <div class="separator"></div>
        <h3 class="center font-34 padding red bold">插片广告</h3>
        <div class="video-preview play" v-bg.video="medias[0].id" @click="start"></div>
        <div id="player" :class="{'playing': playing !== -1}">
            <template v-for="media in medias">
                <img v-if="media.duration" :src="config.img + media.id"  :id="'m'+media.id" class="media img" :class="{'onscreen': playing === $index }" />
                <video v-else @ended="ended" webkit-playsinline="true" :src="config.video + media.id" :id="'m'+media.id" class="media video" :class="{'onscreen': playing === $index }"></video>
            </template>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'VideoView',
    data() {
        return {
            medias: [
                {
                    id: '81e3b492-a555-47e0-bc1b-89b89897a22f'
                }, {
                    id: '0a1f4ab5-989e-41b9-a90f-049e5a85c749',
                    duration: 3000
                }, {
                    id: '8a7dba60-a3d1-4331-ad1e-2aef85173428'
                }
            ],
            el: {},
            playing: -1,
            timer: undefined
        }
    },
    ready() {
        this.el.player = document.getElementById('player');
    },
    methods: {
        start(e) {
            // const [w, h, l, t] = [e.target.clientWidth + 'px', e.target.clientHeight + 'px', e.target.offsetLeft + 'px', e.target.offsetTop + 'px'];
            // this.el.video.style.width = w;
            // this.el.video.style.height = h;
            // this.el.video.style.left = l;
            // this.el.video.style.top = t;
            // this.el.video.style.transform = 'none';
            this.playing = 0;
            _.forEach(_.reverse(_.slice(this.$el.querySelectorAll('video'))), video => {
                video.play();
            });
            this.timer = setInterval(() => {    // 处理手动暂停视频
                if(this.playing !== -1) {
                    const video = document.getElementById('m' + this.medias[this.playing].id);
                    if(_.get(video, 'paused')) {
                        clearInterval(this.timer);
                        this.timer = undefined;
                        this.playing = -1;
                    }
                }
            }, 200);
        },
        ended(e) {
            if(!e || _.indexOf(e.target.classList, 'onscreen') !== -1) {
                if(_.isFunction(_.get(e, 'target.webkitExitFullscreen'))) {
                    e.target.webkitExitFullscreen();
                }
                this.playing += 1;
                const next = this.medias[this.playing];
                if(next) {
                    const nextEl = document.getElementById('m' + next.id);
                    if(next.duration) {
                        setTimeout(() => {
                            this.ended();
                        }, next.duration);
                    } else {
                        nextEl.play();
                    }
                } else {
                    this.playing = -1;
                    clearInterval(this.timer);
                }
            } else {
                // 忽略其它视频播放完成事件
            }
            
        }
    }
}
</script>
<style lang="sass">
.video-view {
    .video-preview {
        width: 100%;
        padding-top: percentage(9/16);
        background-size: cover;
    }
    #player {
        position: absolute;
        width: 0px;
        height: 0px;
        background-color: #000000;
        &.playing {
            width: 100%;
            height: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
    .media {
        position: absolute;
        background-color: #000000;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        &.onscreen {
            width: 100%;
            height: auto;
            transform: translate3d(-50%, -50%, 0);
        }
    }
}
</style>
