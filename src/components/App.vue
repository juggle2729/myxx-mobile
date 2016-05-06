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
        a {
            display: block;
        }
    }
    #logout {
        background-color: #F44336;
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        font-size: 34px;
        padding: 20px;
        border-radius: 0 0 0 50%;
    }
}
</style>
<template>
<div>
    <div v-if="env.isShare && shareData.hasDownloadLink" class="share-top flex bg-default border-bottom">
        <img class="logo" :src="'logo.png' | qn" alt="美玉秀秀">
        <div class="flex-1 flex">
            <div class="name font-30 bold">美玉秀秀</div>
            <div class="slogan font-26 gray margin-left">大师在线视频鉴宝</div>
        </div>
        <a :href="config.download" class="download-btn font-30 red border-red">下载</a>
    </div>
    <router-view></router-view>
    <div v-if="env.isShare && shareData.text" class="share-bottom flex bg-red white font-30">
        <img :src="'share/left.png' | qn" alt="left">
        <a class="flex-1 center bold" :href="config.download">{{shareData.text}}</a>
        <img :src="'share/right.png' | qn" alt="right">
    </div>
    <div id="logout" @click="logout" v-if="self && env.isBrowser">🤔</div>
    <component :is="popup.handler" :params.sync="popup" transition="pop"></component>
</div>
</template>
<script>
import emitter from '../utils/emitter';
import components from 'actions';
export default {
    name: 'App',
    components,
    data() {
        return {
            user: JSON.parse(localStorage.getItem('MYXX_USER')),
            shareData: {},
            popup: {}
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
                isWeibo: /weibo/i.test(ua)
            };
            env.version = env.isApp ?  ua.match(/^MYXX\/\w+\/([\d|\.]+);/).pop() : undefined;
            env.isBrowser = !(env.isApp || env.isWechat || env.isQQ || env.isWeibo);
            env.isShare = !!(!env.isApp && _.get(this.$route, 'query.user'));
            return env;
        }
    },
    ready() {
        emitter.on('back', () => this.$broadcast('restore'));
        emitter.on('scroll', (e) => this.$broadcast('scroll', e));
        emitter.on('scroll-to-bottom', (e) => this.$broadcast('scrollToBottom', e));
    },
    methods: {
        logout() {
            localStorage.removeItem('MYXX_USER');
            this.user = undefined;
        }
    }
}
</script>
