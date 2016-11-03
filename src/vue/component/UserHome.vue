<style lang="stylus">
.user-home
    .header
        height: 84px
        line-height: 84px
        span
            border-left: 6px solid #cc3f4f
    .title
        line-height: 40px
    .shop
        .img
            height: 100px
            width: 100px
            border-radius: 6px
        .detail
            .name
                width: 380px
        .level-comp
            img
                width: 42px
    .works
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
        .img
            height: 100px
            width: 100px
    .website
        .cover
            height: 330px
        .title
            border-width: 30px 32px 30px 32px
            border-color: white
            border-style: solid
    .engraver
        .master
            > div
                padding: 28px 0
                &:first-child
                    padding-top: 0
                &:last-child
                    background-image: none
                    border-bottom: 0
                    padding-bottom: 0
</style>
<template lang="pug">
.user-home.bg.pdt
    .shop.pdh-32.pdb-30.bg-white(v-if='shop', v-link="{name: 'shop', params: {id: shop.id}}")
        .header.fz-26.gray
            span.pdl-12 {{shop.shop_type === 'studio' ? '工作室' : '店铺'}}
        .flex.detail
            .img.mgr(v-bg='shop.logo')
            .flex-1
                .fz-30.flex.margin-bottom.name(:class="{'auth': shop.auth_flag}")
                    .line-clamp.mgr {{shop.shop_name}}
                    lv(:lv="shop.level")
                .fz-26.gray
                    icon(name="location")
                    span {{shop.locale_name}}
            icon.fz-30.gray(name="enter")
    .hr(v-if='works')
    .works.pdh-32.pdb-30.bg-white(v-if='works')
        .header.fz-26.gray
            span.pdl-12 作品展示
        .flex.medias
            template(v-for="entry in works.entries")
                .media.img(v-if='$index < 4', v-bg='entry.picture', v-link="{name: 'work', params: {id: entry.id}}")
            .media.more.fz-30.center.white(v-if='works.total > 4', v-link="{name: 'works', params: {id: $route.params.id}}")
                span 更多
                icon(name="enter")
    .hr(v-if='interview')
    .interview.pdh-32.pdb-30.bg-white(v-if='interview', v-link="{name: 'story', params: {id: interview.iv_post_id}}")
        .header.fz-26.gray
            span.pdl-12 专访
        .flex
            .img.mgr(v-bg='interview.iv_img')
            .fz-30.flex-1.title.line-clamp-2 {{interview.iv_title}}
    .hr(v-if='website')
    .website.bg-white(v-if='website', v-link="{name: 'master', params:{id: website.user_id}}")
        .header.pdh-32.fz-26.gray
            span.pdl-12 人物志
        .cover.img.bg(v-bg='website.logo')
        .title.fz-30.flex-1.line-clamp-2 {{website.title}}
    .hr(v-if='engravers && engravers.length > 0')
    .engraver.pdl-32.bg-white(v-if='engravers && engravers.length > 0')
        .header.fz-26.gray
            span.pdl-12 人物
        .master.pdt-10.pdb-40
            .flex.bdb(v-for='master in engravers', v-link="{name: 'user', params: {id: master.id}}")
                avatar(:user='master', :size='108')
                .fz-30.mgl
                    p {{master.nickname}}
                    p.gray.mgt {{master.title}}
    .hr
    .bg(v-if="items.length > 0")
        .header.fz-26.gray.pdh-32
            span.pdl-12 热门帖子
        template(v-for="item in items")
            component(:is="config.category[item.type]", keep-alive, :item="item.entry")
            .hr
</template>
<script>
import Lv from 'component/Lv.vue'
import story from 'component/item/Story.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
import paging from 'paging'
export default {
    name: 'user-home',
    mixins: [paging],

    components: {
        Lv,
        story,
        post,
        question,
        answer
    },

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/sns`,
                params: {
                    limit: 10,
                    user_id: this.$route.params.id,
                    order_by: '-click_count'
                }
            }
        }
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
