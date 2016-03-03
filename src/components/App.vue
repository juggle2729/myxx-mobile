
<style lang="sass">
    @import '../styles/myxx';
    #app {
        min-height: 100%;
        height: 100%;
        .share-top {
            height: 100px;
            padding: 0px 32px;
            .logo {
                height: 68px;
                width: 68px;
                margin: 5px 20px 0 0;
            }
            .download-btn {
                display: block;
                padding: 10px 20px;
                border-width: 3px;
                border-radius: 5px;
            }
        }
        .share-bottom {
            z-index: 990;
            position: fixed;
            bottom: 0;
            height: 100px;
            width: 100%;
            img {
                height: 100%;
            }
        }
        #hint-with-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 0;
            overflow: hidden;
            z-index: 999;
            transition: height .4s ease-in-out;
            &.show {
                height: 100%;
            }
            &.browser {
                background: rgba(black, .6) url('#{$qn}/artist/share.png') top right no-repeat;
            }
            &.share {
                background: rgba(black, .6) url('#{$qn}/artist/share.png') top right/100% auto no-repeat;
            }
        }
        #video-player {
            background-color: black;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            video {
                width: 100%;
                height: 100%;
            }
        }
        #img-player {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            overflow-y: auto;
            color: white;
            background: black url('#{$qn}/loading.svg') no-repeat center;
            background-size: 60px 34px;
            img {
                position: relative;
                width: 100%;
                height: auto;
                top: 50%;
                transform: translateY(-50%);
            }
            .paging {
                position: fixed;
                width: 100%;
                text-align: center;
                bottom: 1em;
                mix-blend-mode: difference;
            }
        }
    }
</style>
<template>
  <div class="loading">
    <div v-if="isShare && shareData.hasDownloadLink" class="share-top flex bg-default border-bottom">
        <img class="logo" :src="'logo.png' | qn" alt="美玉秀秀">
        <div class="flex-1">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray padding-top">中国最大的和田玉爱好者平台</div>
        </div>
        <a :href="config.download" class="download-btn font-30 red border-red">下载</a>
    </div>
    <router-view></router-view>
    <div v-if="isShare && shareData.text" @click="openApp()" class="share-bottom flex bg-red white font-30">
        <img :src="'share/left.png' | qn" alt="left">
        <div class="flex-1 center bold">{{shareData.text}}</div>
        <img :src="'share/right.png' | qn" alt="right">
    </div>
    <div id="hint-with-backdrop" v-if="isShare" @click="$event.target.classList.remove('show')"></div>
    <div id="video-player" v-if="video" @click="video=undefined">
        <video v-if="video" autoplay controls @ended="video=undefined">
            <source :src="config.video + video">
        </video>
    </div>
    <div id="img-player" v-if="img" @click="img=undefined"
        @touchstart.prevent="img.x=$event.changedTouches[0].pageX" @touchend.prevent="transform($event.changedTouches[0].pageX-img.x)">
        <img :src="config.img + img.ids[img.i] + '?imageView2/3/w/600/interlace/1'" onload="javascript:if(this.clientHeight>this.parentNode.clientHeight){this.style.top=0;this.style.transform='none';}" />
        <div class="paging font-30">{{+img.i+1 + '/' + img.ids.length}}</div>
    </div>
  </div>
</template>
<script>
import emitter from '../utils/emitter';
export default {
    name: 'App',
    data() {
        return {
            user: {},
            shareData: {},
            video: undefined,
            img: undefined,
            scrollY: 0
        }
    },
    computed: {
        isShare() {
            return !this.env.isApp && _.get(this.$route, 'query.user');
        },
        appCmd() {
            let path = this.$route.path;
            path = path.replace(/user=\d+&?/, '').replace(/\?$/, '');  // 去掉分享过程中加的参数
            return 'myxx://web/' + encodeURIComponent(path);
        }
    },
    ready() {
        emitter.on('scroll', (e) => this.$broadcast('scroll', e));
        emitter.on('scroll-to-bottom', (e) => this.$broadcast('scrollToBottom', e));
        emitter.on('open-app', (e) => this.openApp());
        this.$watch('img', (img) => {
                if(img) {
                    this.scrollY = window.scrollY;
                    this.$el.classList.add('frozen');
                } else {
                    this.$el.classList.remove('frozen');
                    window.scrollTo(0, this.scrollY);
                }
            });
        this.$watch('video', (video) => {
            if(video) {
                this.scrollY = window.scrollY;
                this.$el.classList.add('frozen');
            } else {
                this.$el.classList.remove('frozen');
                window.scrollTo(0, this.scrollY);
            }
        });

        if(this.isShare) {
            this.$get('log/content_readings', this.$route.query).then(_.noop);
        }
    },
    methods: {
        openApp() {
            if(!this.env.isBrowser) {
                const backdrop = document.querySelector('#hint-with-backdrop');
                background.classList.add('browser');
                background.classList.add('show');
            } else {
                if(/version\/9/i.test(navigator.userAgent)) { // iOS 9
                    location.href = this.appCmd;
                } else {
                    let myxxIframe = document.createElement('iframe');
                    myxxIframe.src = this.appCmd;
                    myxxIframe.width = 0;
                    myxxIframe.height = 0;
                    myxxIframe.frameBorder = 0;
                    document.body.appendChild(myxxIframe);
                }
            }
        },
        transform(x) {
            const delta = 50;
            if(Math.abs(x) > 50) {
                if(x > 0 && this.img.i > 0) {
                    this.img.i -= 1;
                } else if(x < 0 && this.img.ids.length-this.img.i > 1) {
                    this.img.i += 1;
                }
            }
        }
    }
}
</script>
