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
    }
</style>
<template>
  <main :class="{'loading': $loadingRouteData}">
    <div @click="getApp" class="hide download-top flex bg-default border-bottom">
        <img class="logo" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/logo.png" alt="美玉秀秀">
        <div class="flex-1">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray padding-top">中国最大的和田玉平台</div>
        </div>
        <div class="download-trigger download-btn font-30 red border-red">下载</div>
    </div>
    <router-view></router-view>
    <div @click="getApp" class="hide download-bottom flex bg-red white font-30">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/share-left.png" alt="left">
        <div class="download-trigger flex-1 center bold">我也要晒宝</div>
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
        appUrl() {
            let url = '';
            if(this.platform.isIOS) {
                url = 'itms-services://?action=download-manifest&url=https://dn-myxx-app-download.qbox.me/myxxapp.plist';
            } else if(this.platform.isAndroid) {
                url = 'http://build.meiyuxiuxiu.net/jenkins-myxx-Android-latest.apk';
            } else {
                url = 'http://build.meiyuxiuxiu.net/';
            }
            return url;
        }
    },
    ready() {
        if(!this.platform.isApp && location.hash.indexOf('?time=') !== -1) {
            const downloadDivs = [document.querySelector('.download-top'), document.querySelector('.download-bottom')];
            downloadDivs.forEach((d) => {
                d.classList.remove('hide');
            });
            emitter.on('get-app', (e) => {
                this.getApp();
            });
        }
    },
    methods: {
        getApp() {
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
                let myxxIframe = document.createElement('iframe');
                myxxIframe.src = 'myxx://';
                myxxIframe.width = '1px';
                myxxIframe.height = '1px';
                myxxIframe.scrolling = 'no';
                myxxIframe.style.border = 'none';
                myxxIframe.src = 'myxx://';
                document.body.appendChild(myxxIframe);
                setTimeout(() => {
                    location.href = this.appUrl;
                }, 500);
            }
        }
    }
}
</script>
