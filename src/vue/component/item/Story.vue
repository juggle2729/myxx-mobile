<style lang="stylus">
@import '~style/partials/var'
.story-item
    .header
        padding: 20px 16px
        .name
            color: #666666
    .content
        padding: 0 16px
        .cover
            position: relative
            width: 100%
            padding-top: 100%
            background-position: center
            &.img
                background-size: cover
                background-image: url($qn + 'placeholder/img.png')
            .type
                background-color: rgba(0, 0, 0, .8)
                border-radius: 26px
                padding: .5em .8em
                position: absolute
                left: 1em
                bottom: 1em
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
<div class="story-item bg-white" v-link="{name: 'story', params: {id: item.entry.post_id}}">
    <div class="hr"></div>
    <div class="header flex">
        <div class="flex-1 flex">
            <avatar :user="item.entry.user" :is-self="false" :size="50"></avatar>
            <div class="name mgl fz-26">{{item.entry.user.name}}</div>
        </div>
        <follow v-if="!item.entry.user.is_followed" :user="item.entry.user.id" :follow="item.entry.user.is_followed"></follow>
    </div>
    <div class="content bg-white">
        <div v-if="item.entry.cover_type==='video'" class="cover video" v-bg.video="item.entry.cover">
            <div class="type fz-26 white">{{item.entry.topic_type.name}}</div>
        </div>
        <div v-else class="cover img" v-bg="item.entry.cover">
            <div class="type fz-26 white" v-if="item.entry.topic_type.code !== 'hd'">{{item.entry.topic_type.name}}</div>
        </div>
        <div class="title fz-30"><div class="user-txt line-clamp-2">{{item.entry.content}}</div></div>
    </div>
    <div class="footer fz-26 flex bdt">
        <comment :count="item.entry.comment" class="bdr"></comment>
        <like :target="item.entry.post_id" type="30" :active="item.entry.liked" :count="item.entry.like" class="bdr"></like>
        <share></share>
    </div>
</div>
</template>
<script>
export default {
    name: 'story-item',

    props: {
        item: Object
    }
}
</script>
