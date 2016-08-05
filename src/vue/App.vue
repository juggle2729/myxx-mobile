<style lang="sass">
@import '~style/myxx';
#app {
    .share-bottom {
        z-index: 990;
        position: fixed;
        bottom: 0;
        height: 112px;
        width: 100%;
        padding: 0 24px;
        background-color: rgba(0, 0, 0, 0.9);
        .logo {
            line-height: 0;
            img {
                height: 72px;
                width: 72px;
            }
        }
        .dot {
            margin: 0 10px;
        }
        .download-btn {
            height: 60px;
            line-height: 60px;
            padding: 0 28px;
            border-radius: 5px;
        }
    }
    #user {
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
        img {
            border-radius: 50%;
            width: 60px;
            height: 60px;
            box-shadow: 0 0 10px 5px #4CAF50;
        }
    }
}
</style>
<template>
<div>
    <router-view></router-view>
    <div v-if="env.isShare && shareData.hasDownloadLink" class="share-bottom flex" @click="download()">
        <div class="logo margin-right"><img :src="'logo.png' | qn" alt="美玉秀秀"></div>
        <div class="flex-1 white">
            <div class="flex">
                <div class="name font-30 bold">美玉秀秀</div>
                <div class="font-22 dot">•</div>
                <div class="slogan font-22">大师在线视频鉴宝</div>
            </div>
            <div class="font-22 red margin-top">10万玉友的选择</div>
        </div>
        <div class="download-btn font-30 white bg-red">免费下载</div>
    </div>
    <div id="user" v-if="env.isBrowser && env.isTest">
        <img v-if="self" @click="logout" :src="config.img + self.photo" :alt="self.nickname" />
        <div v-else @click="login" class="font-34">👤</div>
    </div>
    <component :is="popup.handler" :params.sync="popup" transition="pop"></component>
</div>
</template>
<script>
import emitter from '../util/emitter';
import components from 'action';
export default {
    name: 'App',
    components,
    data() {
        return {
            id: 160607153549035517,
            user: this.$store.get('user'),
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
                isWeibo: /weibo/i.test(ua),
                isDingTalk: /dingtalk/i.test(ua),
                isTest: !/^app/.test(location.hostname)
            };
            env.isBrowser = !(env.isApp || env.isWechat || env.isQQ || env.isWeibo || env.isDingTalk);
            env.isShare = !!(!env.isApp && (_.has(this.$route, 'query.user') || _.has(this.$route, 'query.channel')));
            if(env.isApp) {
                const digits = ua.match(/^MYXX\/\w+\/([\d|\.]+);/).pop().split('.');
                digits.splice(1, 0, '.');
                env.version = +digits.join('');
            }
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
            this.$store.remove('user');
            location.href = location.href;
        },
        login() {
            this.action('login')
                .then((user) => {
                    this.user = user;
                });
        },
        download() {
            window.location.href = this.config.download;
        }
    }
}
</script>
