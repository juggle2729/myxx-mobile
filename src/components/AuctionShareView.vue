<style lang="sass">
    .auction-share-view {
        height: 100%;
        padding-top: 230px;
        .success {
            width: 120px;
            height: 120px;
            background-image: url('http://o0x80w5li.qnssl.com/success.png');
            background-size: 100% 100%;
        }
        .content {
            padding: 44px 50px 32px 50px;
            text-align: center;
            p:nth-child(1) {
                margin-bottom: 66px;
            }
            p:nth-child(2) {
                margin-bottom: 102px;
                line-height: 42px;
            }
            p:nth-child(3) {
                margin-bottom: 32px;
            }
            .button {
                width: 640px;
                height: 100px;
                -webkit-box-pack: center;
                border-radius: 50px;
            }
        }
    }
</style>
<template>
    <div class="auction-share-view bg-default">
        <div class="success center-horizontal"></div>
        <div class="content">
            <p class="font-30">拍卖信息生成成功</p>
            <p class="font-26 gray">
                拍卖只能在微信中使用,拍卖结束后，出价最高的用户联系方式将以短信和系统消息的形式通知您。
            </p>
            <p class="font-26 gray">
                —&nbsp;邀请好友参与拍卖&nbsp;—
            </p>
            <div class="button bg-red flex white font-30" @click="share()">
                <span class="icon-weixin"></span>
                <span>分享至微信</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AuctionShareView',
    data() {
        return {
            id: 0,
            title: '',
            icon: ''
        };
    },
    route: {
        data({to}){
            this.id = to.params.id
            return this.$get(`mall/auctions/${this.id}`).then((data) => {
                this.title = data.title;
                this.icon = data.pictures[0];
            });
        }
    },
    methods: {
        share() {
            this.action('share', {
                title: '商品拍卖',
                desc: `${this.title}开始拍卖`,
                icon: this.icon,
                url: `${location.origin}/auction/${this.id}`,
                targets: '0,1'
            });
        }
    }
}
</script>
