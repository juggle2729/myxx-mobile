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
<template lang="jade">
div
    router-view
    .share-bottom.flex(v-if="env.isShare && shareData.hasDownloadLink", @click="download()")
        .logo.margin-right
            img(:src="'logo.png' | qn", alt="美玉秀秀")
        .flex-1.white
            .flex
                .name.font-30.bold 美玉秀秀
                .font-22.dot •
                .slogan.font-22 大师在线视频鉴宝
            .font-22.red.margin-top 10万玉友的选择
        .download-btn.font-30.white.bg-red 免费下载
    #user(v-if="env.isBrowser && env.isTest")
        img(v-if="self", @click="logout", :src="config.img + self.photo", :alt="self.nickname")
        .font-34(v-else, @click="login") 👤
    component(:is="popup.handler", :params.sync="popup", transition="pop")
</template>
<script>
import emitter from '../util/emitter';
import components from 'action';
export default {
    name: 'App',
    components,
    data() {
        return {
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
