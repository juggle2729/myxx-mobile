<style lang="sass">
.api-view {
    padding-top: 25px;
    .container {
        padding: 5px 32px;
        height: 98px;
        line-height: 98px;
        &:nth-child(odd) {
             margin-left: 250px;
         }
        .item {
            position: relative;
            padding: 15px 0;
            background-color: #673AB7;
            width: 420px;
            animation: skew 3s infinite;
            transform: skew(20deg);
            animation-direction: alternate;
            opacity: .7;

        }

        @keyframes skew {
            0% {
                transform: skewX(20deg);
            }
            100% {
                transform: skewX(-20deg);
            }
        }
    }
}
</style>
<template>
<div class="api-view font-30">
    <div class="container" v-for="item in native">
        <div class="item white center" @click="api(item.label, item.params)">{{item.title}}</div>
    </div>
</div>
</template>
<script>
import Q from 'q';
export default {
    name: 'ApiView',
    data() {
        return {
            native: [
                {
                    title: '登录-login',
                    label: 'login'
                }, {
                    title: '当前登录用户-user',
                    label: 'user'
                }, {
                    title: '回退1步-back',
                    label: 'back',
                    params: {
                        step: 1,
                        refresh: true
                    }
                }, {
                    title: '区域选择-region',
                    label: 'region'
                }, {
                    title: '右上角动作-action',
                    label: 'action',
                    params: {
                        icon: ''
                    }
                }, {
                    title: '在新webview里打开页面-open',
                    label: 'open',
                    params: {
                        url: '/'
                    }
                }, {
                    title: '播放视频-play',
                    label: 'play',
                    params: {
                        id: 'e0b709d8-5bc3-4ab8-931c-d63320e14b0f',
                        targetId: '750',
                        targetType: 'result'
                    }
                }, {
                    title: '浏览图片-coverflow',
                    label: 'coverflow',
                    params: {
                        ids: 'f611db40-e06c-4116-b6a6-e024ab372bf3,40d0dcf8-0575-4bba-a055-2eb97f177e80,00adf280-0ae1-4632-bb19-cbe190dcd590',
                        index: 0
                    }
                }, {
                    title: '分享-share',
                    label: 'share',
                    params: {
                        title: 'cathiewx的最新视频',
                        desc: '我在美玉秀秀分享了一个好远的视频, 速速围观~~~',
                        icon: 'af40f0a7-c0e5-4a52-bf91-a3744098a0f9',
                        url: location.origin + location.pathname,
                        targets: '0,1,2,3,4'
                    }
                }, {
                    title: '分享按钮-shareable',
                    label: 'shareable',
                    params: {
                        title: 'cathiewx的最新视频',
                        desc: '我在美玉秀秀分享了一个好远的视频, 速速围观~~~',
                        icon: 'af40f0a7-c0e5-4a52-bf91-a3744098a0f9',
                        url: location.origin + location.pathname,
                        targets: '0,1,2,3,4'
                    }
                }, {
                    title: '键盘输入-keyboard',
                    label: 'keyboard',
                    params: {
                        id: 1,
                        placeholder: '',
                        position: 0
                    }
                }, {
                    title: '二次确认-confirm',
                    label: 'confirm',
                    params: {
                        text: '你相信我是二次确认框么?'
                    }
                }, {
                    title: '跟新webview标题-updateTitle',
                    label: 'updateTitle',
                    params: {
                        text: 'I am new title'
                    }
                }, {
                    title: '提醒-toast',
                    label: 'toast',
                    params: {
                        success: 0, // 0-fail, 1-success
                        text: 'toast在此~~'
                    }
                }, {
                    title: '文件上传-图片',
                    label: 'upload',
                    params: {
                        type: 'img',
                        limit: '10'
                    }
                }, {
                    title: '文件上传-视频',
                    label: 'upload',
                    params: {
                        type: 'video',
                        limit: '1'
                    }
                }
            ]
        }
    },
    methods: {
        api(label, params) {
            const action = () => {
                return this.action(label, params);
            };
            const cb = (data) => {
                if(typeof data !== 'string') {
                    data = JSON.stringify(data);
                }
                this.action('toast', {success: 1, text: data});
                if(label === 'action') {
                    action().then(cb);
                }
            };
            action().then(cb);
        }
    }
}
</script>
