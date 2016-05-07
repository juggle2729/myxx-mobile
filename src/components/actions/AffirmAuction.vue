<style lang="sass">
.affirmAuction {
    &.pop-transition .container {
         transition: transform .3s ease, opacity .3s linear;
         transform: translate3d(0, 200px, 0);
         opacity: 1;
    }
    &.pop-enter .container, &.pop-leave .container {
         transform: translate3d(0, -100%, 0);
         opacity: 0;
    }
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(40,40,40,.75);
    .container {
        margin: 0 auto;
        height: 656px;
        width: 560px;
        border-radius: 10px;
        .title {
            line-height: 86px;
        }
        .img {
            height: 146px;
            width: 100%;
            padding: 18px 24px;
            display: inline-flex;
            align-items: center;
            border-bottom: 1px solid #d9d9d9;
            img {
                height: 110px;
                width: 110px;
            }
            .desc {
                margin-left: 18px;
                width: 384px;
                line-height: 38px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
        }
        .info {
            margin-left: 24px;
            padding-right: 24px;
            height: 86px;
            line-height: 86px;
        }
        .btns {
            height: 80px;
            >div {
                padding-top: 25px;
                height: 100%;
                width: 50%;
                &:first-child {
                    border-radius: 0 0 0 10px;
                }
                &:last-child {
                    border-radius: 0 0 10px 0;
                }
             }
        }
    }
}
</style>
<template>
<div class="affirmAuction">
    <div class="container bg-white">
        <div class="title gray font-26 border-bottom center">确认拍卖信息</div>
        <div class="img">
            <img :src="config.img + params.img + '?imageView2/2/h/450'" alt="拍品图片" />
            <span class="desc font-30">{{params.title}}</span>
        </div>
        <div class="info flex font-30 border-bottom">
            <div class="flex-1">起拍价格</div>
            <div class="red">{{params.origin}}</div>
        </div>
        <div class="info flex font-30 border-bottom">
            <div class="flex-1">加价幅度</div>
            <div class="red">{{params.unit}}</div>
        </div>
        <div class="info flex font-30 border-bottom">
            <div class="flex-1">开始时间</div>
            <div class="red">{{params.beginTime | moment}}</div>
        </div>
        <div class="info flex font-30">
            <div class="flex-1">结束时间</div>
            <div class="red">{{params.endTime | moment}}</div>
        </div>
        <div class="btns flex font-30 white">
            <div class="bg-gray center" @click="close">取消</div>
            <div class="bg-red center" @click="submit">确定</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'AffirmAuction',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    methods: {
        submit() {
            this.params.cb(this.params);
            this.close();
        },
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>