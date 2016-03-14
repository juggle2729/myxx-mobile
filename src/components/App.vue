
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
                background: rgba(black, .6) url('#{$qn}/open-in-browser.png') top right/516px 487px no-repeat;
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
            overflow-y: auto;
            color: white;
            background: black url('#{$qn}/loading.svg') no-repeat center;
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
    <slider id="img-player" v-if="img" @click="img=undefined" :ids="img.ids" :i="img.i" height="100%"></slider>
  </div>
</template>
<script>
import emitter from '../utils/emitter';
import Slider from './Slider.vue';
export default {
    name: 'App',
    components: {
        Slider
    },
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
        env() {
            const ua = navigator.userAgent;
            let env = {
                isApp: /myxx/i.test(ua),
                isMobile: /android|iphone|ipod|ipad/i.test(ua),
                isIOS: /iphone|ipod|ipad/i.test(ua),
                isAndroid: /android/i.test(ua),
                isWechat: /micromessenger/i.test(ua),
                isQQ: /qq\//i.test(ua),
                isWeibo: /weibo/i.test(ua),
                version: undefined
            };
            env.isBrowser = !(env.isWechat || env.isQQ || env.isWeibo);
            return env;
        },
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
        this.action('version', '')
            .then((v) => {
                this.env.version = v;
            });
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
                backdrop.classList.add('browser');
                backdrop.classList.add('show');
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
        }
    }
}
</script>
