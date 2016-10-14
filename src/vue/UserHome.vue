<style lang="stylus">
.user-home
    .header
        height: 84px
        line-height: 84px
        span
            border-left: 6px solid #cc3f4f
            padding-left: 12px
    .title
        line-height: 40px
    .shop
        padding: 0 32px 30px
        .img
            height: 100px
            width: 100px
            border-radius: 6px
            margin-right: 20px
        .detail
            .name
                width: 380px
        .level-comp
            img
                width: 42px
    .works
        padding: 0 32px 30px
        .medias
            position: relative
            .media
                height: 170px
                width: 170px
                &:not(:last-child)
                    margin-right: 2px
            .more
                position: absolute
                right: 0
                padding-top: 70px
                background-color: rgba(0, 0, 0, 0.5)
    .interview
        padding: 0 32px 30px
        .img
            height: 100px
            width: 100px
            margin-right: 20px
    .website
        .header
            padding: 0 32px
        .cover
            height: 330px
        .title
            border-width: 30px 32px 30px 32px
            border-color: white
            border-style: solid
    .engraver
        padding-left: 32px
        .master
            padding: 10px 0 40px 0
            > div
                padding: 28px 0
                &:first-child
                    padding-top: 0
                &:last-child
                    background-image: none
                    border-bottom: 0
                    padding-bottom: 0
    .topic .list
        padding: 0 15px
</style>
<template lang="jade">
.user-home.bg
    .shop.bg-white(v-if='shop', v-link="{name: 'shop', params: {id: shop.id}}")
        .header.fz-26.gray
            span {{shop.shop_type === 'studio' ? '工作室' : '店铺'}}
        .flex.detail
            .img(v-bg='shop.logo')
            .flex-1
                .fz-30.flex.margin-bottom.name(:class="{'auth': shop.auth_flag}")
                    .line-clamp.mgr {{shop.shop_name}}
                    lv(:lv="shop.level")
                .fz-26.gray
                    icon(name="location")
                    span {{shop.locale_name}}
            icon.fz-30.gray(name="enter")
    .hr(v-if='works')
    .works.bg-white(v-if='works')
        .header.fz-26.gray
            span 作品展示
        .flex.medias
            template(v-for="entry in works.entries")
                .media.img(v-if='$index < 4', v-bg='entry.picture', v-link="{name: 'work', params: {id: entry.id}}")
            .media.more.fz-30.center.white(v-if='works.total > 4', v-link="{name: 'works', params: {id: $route.params.id}}")
                span 更多
                icon(name="enter")
    .hr(v-if='interview')
    .interview.bg-white(v-if='interview', v-link="{name: 'story', params: {id: interview.iv_post_id}}")
        .header.fz-26.gray
            span 专访
        .flex
            .img(v-bg='interview.iv_img')
            .fz-30.flex-1.title.line-clamp-2 {{interview.iv_title}}
    .hr(v-if='website')
    .website.bg-white(v-if='website', v-link="{name: 'master', params:{id: website.user_id}}")
        .header.fz-26.gray
            span 人物志
        .cover.img(v-bg='website.logo')
        .title.fz-30.flex-1.line-clamp-2 {{website.title}}
    .hr(v-if='engravers && engravers.length > 0')
    .engraver.bg-white(v-if='engravers && engravers.length > 0')
        .header.fz-26.gray
            span 人物
        .master
            .flex.bdb(v-for='master in engravers', v-link="{name: 'user', params: {id: master.id}}")
                avatar(:user='master', :size='108')
                .fz-30.mgl
                    p {{master.nickname}}
                    p.gray.mgt {{master.title}}
    .hr
    .topic.bg
        .header.fz-26.gray.pdh-32
            span 热门帖子
        hot-list(:path="'users/' + $route.params.id + '/sns'", :params="{limit: 10, user_id: $route.params.id, order_by: '-click_count'}")
</template>
<script>
import Lv from 'component/Lv.vue'
import List from 'component/List.vue'
export default {
    name: 'user-home',

    components: {
        Lv,
        HotList: new List('Card')
    },
    data() {
        return {
            type: '',
            shop: '',
            works: '',
            interview: '',
            website: '',
            engravers: []
        }
    },

    activate(done) {
        return this.$fetch(`users/${this.$route.params.id}/homepage`).then((data) => {
            this.shop = data.shop
            this.works = data.works
            this.interview = data.interview
            this.website = data.website
            this.engravers = data.engravers
        }).then(done)
    }
}
</script>
