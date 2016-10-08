<style lang="stylus">
.jade-item
    .header
        padding: 20px 16px
        .name
            color: #666666
    .content
        padding: 0 16px
        .cover
            width: 100%
            padding-top: 100%
            background-position: center
            position: relative
            .type
                position: absolute
                background-color: #cc3f4f
                color: white
                top: 30px
                right: 0
                padding: .5em
        .title
            color: #666666
            height: 114px
            position: relative
            text-align: center
            margin: 0 auto
            .user-txt
                width: 508px
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
    .footer
        height: 80px
        line-height: 60px
        > div
            -webkit-box-flex: 1
            text-align: center
</style>
<template>
<div class="jade-item bg-white" v-link="{name: 'jade', params: {id: item.id}}">
    <div class="header flex">
        <div class="flex-1 flex">
            <avatar :user="item.user" :is-self="false" :size="50"></avatar>
            <div class="name mgl fz-26">{{item.user.name}}</div>
        </div>
        <follow :user="item.user.id" :follow="item.user.is_followed"></follow>
    </div>
    <div class="content bg-white">
        <div class="cover video" v-bg.video="item.video">
            <div class="type fz-30">商品</div>
        </div>
        <div class="title fz-30"><div class="user-txt line-clamp-2">{{item.title}}</div></div>
    </div>
    <div class="footer flex bdv">
        <comment :count="item.comment"></comment>
        <share class="bdl"></share>
    </div>
</div>
</template>
<script>
export default {
    name: 'JadeItem',

    props: {
        item: [Object]
    }
}
</script>
