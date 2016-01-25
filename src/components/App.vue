<style lang="sass">
    @import '../styles/myxx';
    #app {
        min-height: 100%;
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
        #open-in-browser {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 0;
            overflow: hidden;
            z-index: 999;
            background: rgba(black, .6) url('#{$qn}/open-in-browser.png') top right no-repeat;
            background-size: 487px 516px;
            transition: height .4s ease-in-out;
            &.show {
                height: 100%;
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
            background: black url('//o0x80w5li.qnssl.com/loading.svg') no-repeat center;
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
    <div v-if="isShare" class="share-top flex bg-default border-bottom">
        <img class="logo" :src="'logo.png' | qn" alt="美玉秀秀">
        <div class="flex-1">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray padding-top">中国最大的和田玉爱好者平台</div>
        </div>
        <a :href="downloadUrl" class="download-btn font-30 red border-red">下载</a>
    </div>
    <router-view></router-view>
    <div v-if="isShare" @click="openApp()" class="share-bottom flex bg-red white font-30">
        <img :src="'share/left.png' | qn" alt="left">
        <div class="flex-1 center bold">我也要晒宝</div>
        <img :src="'share/right.png' | qn" alt="right">
    </div>
    <div id="open-in-browser" v-if="isShare && !env.isBrowser" @click="$event.target.classList.remove('show')"></div>
    <div id="video-player" v-if="video" @click="video = undefined">
        <video v-if="video" autoplay controls @ended="video = undefined">
            <source :src="config.video + video">
        </video>
    </div>
    <div id="img-player" v-if="img" @click="img = undefined"
        @touchstart.prevent="img.x=$event.pageX" @touchend.prevent="transform($event.pageX-img.x)">
        <img :src="config.img + img.ids[img.i] + '?imageView2/3/w/600/interlace/1'"
            onload="javascript:if(this.clientHeight>this.parentNode.clientHeight){this.style.top=0;this.style.transform='none';}"/>
        <div class="paging font-30">{{+img.i+1 + '/' + img.ids.length}}</div>
    </div>
  </div>
</template>
<script>
import Q from 'q';
import emitter from '../utils/emitter';
export default {
    name: 'App',
    data() {
        return {
            downloadUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meiyuxiuxiu.myxx',
            user: {},
            video: undefined,
            img: undefined
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
        emitter.on('scroll-to-bottom', (e) => this.$broadcast('scrollToBottom', e));
        emitter.on('open-app', (e) => this.openApp());
        this.$watch('img', (img) => this.$el.classList[img?'add':'remove']('frozen'));
        this.$watch('video', (video) => this.$el.classList[video?'add':'remove']('frozen'));
        if(this.isShare) {
            this.$get('log/content_readings', this.$route.query).then(_.noop);
        }
    },
    methods: {
        openApp() {
            if(!this.env.isBrowser) {
                document.querySelector('#open-in-browser').classList.add('show');
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
                    setTimeout(() => {
                        location.href = this.downloadUrl;
                    }, 500);
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
