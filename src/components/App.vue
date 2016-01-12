<style lang="sass">
    @import '../styles/myxx';
    #app {
        min-height: 100%;
        height: 100%;
        .download-top {
            height: 100px;
            padding: 0px 32px;
            .logo {
                height: 68px;
                width: 68px;
                margin: 5px 20px 0 0;
            }
            .download-btn {
                padding: 10px 20px;
                border-width: 3px;
                border-radius: 5px;
            }
        }
        .download-bottom {
            z-index: 990;
            position: fixed;
            bottom: 0;
            height: 100px;
            width: 100%;
            img {
                height: 100%;
            }
        }
        .download-trigger {
            display: block;
        }
        #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 0;
            overflow: hidden;
            z-index: 999;
            background-color: #EDEDED;
            transition: height .4s ease-in-out;
            > img {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                z-index: 9999;
            }
        }
        .video-display{
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
    }
</style>
<template>
  <main class="loading">
    <div v-if="isShare" class="download-top flex bg-default border-bottom">
        <img class="logo" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/logo.png" alt="美玉秀秀">
        <div class="flex-1">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray padding-top">中国最大的和田玉爱好者平台</div>
        </div>
        <a href="http://download.meiyuxiuxiu.com/" class="download-trigger download-btn font-30 red border-red">下载</a>
    </div>
    <router-view></router-view>
    <div v-if="isShare" v-touch:tap="getApp()" class="download-bottom flex bg-red white font-30">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/share/left.png" alt="left">
        <div class="download-trigger flex-1 center bold">我也要晒宝</div>
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/share/right.png" alt="right">
    </div>
    <div v-if="isShare" id="backdrop">
        <img :src="platform.isIOS ? 'http://7xp1h7.com2.z0.glb.qiniucdn.com/ios.png' : 'http://7xp1h7.com2.z0.glb.qiniucdn.com/android.png'" alt="用浏览器打开">
    </div>
    <div v-if="isShare && videoDisplay" class="video-display" @click="videoClose">
        <video :src="config.video + videoId" autoplay controls="controls">
        </video>
    </div>
  </main>
</template>
<script>
import Q from 'q';
import config from '../config'
import emitter from '../utils/emitter';
export default {
    name: 'App',
    data() {
        return {
            user: {},
            videoDisplay: false,
            config: config
        }
    },
    created() {
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });
    },
    computed: {
        isShare() {
            return !this.platform.isApp && this.$route.query.inviter;
        },
        appCmd() {
            let path = this.$route.path;
            path = path.replace(/inviter=\d+&?/, '').replace(/\?$/, '');  // 去掉inviter参数
            return 'myxx://web/' + encodeURIComponent(path);
        }
    },
    ready() {
        emitter.on('get-app', (e) => {
            this.getApp();
        });
    },
    methods: {
        getApp() {
            if(this.platform.isWechat || this.platform.isQQ) {
                document.querySelector('#backdrop').style.height = '100%';
                document.querySelector('#backdrop > img').style.height = 'auto';
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
                        location.href = 'http://download.meiyuxiuxiu.com';
                    }, 500);
                }
            }
        },
        videoClose() {
            this.videoDisplay = false;
        }
    }
}
</script>
