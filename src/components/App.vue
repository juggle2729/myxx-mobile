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
            z-index: 999;
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
    }
</style>
<template>
  <main :class="{'loading': $loadingRouteData}">
    <div v-if="isShare" class="download-top flex bg-default border-bottom">
        <img class="logo" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/logo.png" alt="美玉秀秀">
        <div class="flex-1">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray padding-top">中国最大的和田玉爱好者平台</div>
        </div>
        <a href="http://build.meiyuxiuxiu.net/" class="download-trigger download-btn font-30 red border-red">下载</a>
    </div>
    <router-view></router-view>
    <div v-if="isShare" @click="getApp($event)" class="download-bottom flex bg-red white font-30">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/share-left.png" alt="left">
        <a :href="appCmd" class="download-trigger flex-1 center bold">我也要晒宝</a>
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/share-right.png" alt="right">
    </div>
  </main>
</template>
<script>
import Q from 'q';
import emitter from '../utils/emitter';
export default {
    name: 'App',
    data() {
        return {
            user: {}
        }
    },
    created() {
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });
    },
    computed: {
        isShare() {
            return !this.platform.isApp && this.$route.query.share;
        },
        appCmd() {
            let path = this.$route.path;
            path = path.replace(/share=\d+&?/, '').replace(/\?$/, '');  // 去掉share参数
            return 'myxx://web/' + encodeURIComponent(path);
        }
    },
    ready() {
        emitter.on('get-app', (e) => {
            this.getApp();
        });
    },
    methods: {
        getApp(e) {
            if(this.platform.isWechat) {
                let hint = document.createElement('img');
                if(this.platform.isAndroid) {
                    hint.src = 'http://7xp1h7.com2.z0.glb.qiniucdn.com/android.png';
                }else if(this.platform.isIOS) {
                    hint.src = 'http://7xp1h7.com2.z0.glb.qiniucdn.com/ios.png';
                }
                if(hint.src){
                    let backdrop = document.createElement('div');
                    backdrop.style.position = 'fixed';
                    backdrop.style.top = 0;
                    backdrop.style.left = 0;
                    backdrop.style.bottom = 0;
                    backdrop.style.right = 0;
                    backdrop.style.zIndex = 9998;
                    backdrop.style.backgroundColor = '#EDEDED';
                    hint.style.position = 'fixed';
                    hint.style.top = 0;
                    hint.style.left = 0;
                    hint.style.width = '100%';
                    hint.style.zIndex = 9999;
                    document.body.style.overflow = 'hidden';
                    document.body.appendChild(backdrop);
                    document.body.appendChild(hint);
                }
            } else {
                // let myxxIframe = document.createElement('iframe');
                // myxxIframe.src = this.appCmd;
                // myxxIframe.width = '1px';
                // myxxIframe.height = '1px';
                // myxxIframe.scrolling = 'no';
                // myxxIframe.style.border = 'none';
                // document.body.appendChild(myxxIframe);
                let opened = false;
                if(e && e.target) {
                    e.target.focus();
                    e.target.addEventListener('blur', () => {
                        opened = true;
                    }, false);
                }
                setTimeout(() => {
                    if(!opened) {
                        // location.href = 'http://build.meiyuxiuxiu.net/';
                    }
                }, 500);
            }
        }
    }
}
</script>
