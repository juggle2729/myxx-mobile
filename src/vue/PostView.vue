<style lang="stylus">
bg($key)
    background-image url('//o0x80w5li.qnssl.com/live/' + $key + '.png')
.post-view
    > header
        padding: 32px 32px 40px
        img
            display: block
            width: 30px
            height: 30px
    main
        padding: 0 25px 40px
        > .user-txt
            padding 0 7px
        > img
            max-width: 100%
            margin-top: 32px
        .video
            padding-top: 100%
        .product
            .img
                height: 200px
                width: 200px
            .content
                height: 200px
                position: relative
                & > div:nth-child(2)
                    position: absolute
                    width: 100%
                    bottom: 28px
                    .btn
                        height: 32px
                        line-height: 32px
                        border-radius: 20px
                        position: absolute
                        bottom: 0
                        right: 0
                .icon-enter
                    font-size: 20px
                    vertical-align: -1px

    .tag-activity
        position: relative
        margin: 0 0 24px 32px
        height: 68px
        .item
            position: absolute
            padding: .5em .8em
            border-radius: 26px
            background-color: #ffecea

    .footer
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center

    .auction
        background-color #f5f5f5
        .img
            width 160px
            height 160px
        .mgl-26
            flex-direction column
            align-items flex-start
        .white
            width 84px
            line-height 26px
        .black-24
            bg(preview)
            background-size 26px
            background-position 2px center
            padding-left 26px
    .preview, .published
        background-color #f5740a
    .going
        background-color #e61717
    .success, .fail, .end
        background-color #242424
    .special
        width 100%
        padding-top 56.29%
        position relative
        > div:first-child
            position absolute
            top 20px
            left 20px
            .white
                padding 0 10px
                line-height 26px
            .black-24
                bg(preview)
                background-size 26px
                background-position 2px center
                padding 0 10px 0 26px
                line-height 26px
                background-color rgba(255, 255, 255, 0.5)
        > div:last-child
            justify-content space-between
            background-color rgba(0, 0, 0, 0.3)
            height 60px
    .live
        width 100%
        padding-top 48%
        position relative
        .black-24.going
            background-image url('//o0x80w5li.qnssl.com/live/going.png') !important
            padding-left 30px !important
        .fz-24
            background-image url('//o0x80w5li.qnssl.com/live/play.png')
            background-size 26px
            background-position left center
            padding-left 32px
</style>
<template lang="pug">
.post-view.bg-white(v-if='!$loadingRouteData')
    header.flex
        avatar(:user='post.user')
        .flex-1.mgl
            .flex
                .fz-30 {{post.user.nickname}}
                img.mgl-8(v-if="post.user.vip_flag", :src="'profile/'+post.user.role+'.png' | qn")
            .mgt-12.fz-22.light {{post.create_at | moment}} &nbsp;&#124;&nbsp; {{post.click_count}}人浏览
        icon-follow(:target='post.user.id', :follow='post.user.is_followed', :has-border='true')
    main
        .fz-34.bold.user-txt {{{post.title | content | input}}}
        .fz-30.dark.user-txt(v-if="post.description", :class="{'pdt-32': post.description}") {{{post.description | content | input}}}
        template(v-for="item in post.medias")
            img(v-if="item.media_type === 'picture'", :src="config.img + item.media", @click="coverflow(medias, item.flag)")
            .video(v-if="item.media_type === 'video'", v-bg='item.media', @click='play(item.media)', query='vframe/jpg/offset/5/rotate/auto|imageView2/2/w/750')
            .product.flex.mgt-32.bd-light(v-if="item.media_type === 'pd'", v-link="{name: 'product', params: {id: item.media.id}}")
                .img(v-bg="item.media.cover")
                .fz-30.mgh.flex-1.pdv-28.content
                    .line-clamp-2.bold.user-txt {{item.media.title}}
                    .flex
                        .flex-1.red {{item.media.price | price}}
                        .btn.fz-26.gray 商品详情
                            icon.mgl-12(name="enter")
            p.fz-30.dark.mgt-32.user-txt(v-if="item.media_type === 'text'") {{{item.media | input}}}
            .auction.flex.mgt-32(v-if="item.media_type === 'ac'", v-link="{name: 'auction', params: { id: item.media.id }}")
                .img(v-bg="item.media.product.cover || item.media.product.first_picture")
                .flex.mgl-26
                    .line-clamp-2.fz-28.black-47 {{ item.media.product.title }}
                    .flex.mgt-24
                        .fz-20.white.center(:class="item.media.status") {{ auctionStatus(item.media).status }}
                        .fz-16.black-24 {{ auctionStatus(item.media).desc }}
            .special.mgt-32(v-if="item.media_type === 'acs'", v-link="{name: 'auction-special', params: { id: item.media.id }}", v-bg="item.media.picture")
                .flex
                    .fz-20.white.center(:class="item.media.status") {{ auctionStatus(item.media).status }}
                    .fz-16.black-24 {{ auctionStatus(item.media).desc }}
                .flex.white.pdh-17
                    .fz-30 {{ item.media.title }}
                    .fz-24 拍品：{{ item.media.auction_count }}件
            .live.special.mgt-32(v-if="item.media_type === 'lv'", v-bg="item.media.picture", v-link="{name: 'live', params: { id: item.media.id }}")
                .flex
                    .fz-20.white.center(:class="item.media.status") {{ liveStatus(item.media) }}
                    .fz-16.black-24(:class="item.media.status") {{ liveTime(item.media) }}
                .flex.white.pdh-17
                    .fz-30 {{ item.media.title }}
                    .fz-24(v-if="item.media.status === 'end' && !!item.media.playback") {{ duration(item.media.playback.duration) }}
        topic-tags(:tags="post.categories")
        template(v-if="post.user.shop")
            shop.mgt-20(:shop="post.user.shop", :type="'community'")
    .hr
    comment-list(type='rt', :id='post.post_id', :total="post.comment_count")
    .hr
    general-suggestion(:categories="post.categories")
</template>
<script>
import Shop from 'component/Shop.vue'
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import shareable from 'shareable'
import TopicTags from 'component/TopicTags.vue'
import dateformat from 'dateformat'
import date from '../util/date'
export default {
    name: 'post-view',

    mixins: [shareable],

    components: {
        Shop,
        CommentList,
        GeneralSuggestion,
        TopicTags
    },

    data() {
        return {
            post: {
                user: {}
            }
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/rich_texts/${to.params.id}`)
                .then(resp => {
                    this.post = resp
                    this.medias = []
                    var flag = -1
                    _.forEach(this.post.medias, (item, index) => {
                        if(item.media_type === 'picture') {
                            this.medias.push(item.media)
                            item.flag = (flag += 1)
                        }
                    })
                    this.setShareData({title: this.post.title, icon: this.medias[0]})
                })
        }
    },

    methods: {
        auctionStatus(auction) {
            switch(auction.status) {
                case 'preview':
                    return {
                        status: '预展中',
                        desc: `距开始时间${date.diffNowTime(auction.start_time)}`
                    }
                case 'going':
                    return {
                        status: '拍卖中',
                        desc: `距结束时间${date.diffNowTime(auction.real_end_time)}`
                    }
                case 'success':
                    return {
                        status: '已结拍',
                        desc: `结束时间${dateformat(new Date(auction.real_end_time), 'H时MM分')}`
                    }
                case 'fail':
                    return {
                        status: '已流拍',
                        desc: `结束时间${dateformat(new Date(auction.real_end_time), 'H时MM分')}`
                    }
                default:
                    return {}
            }
        },

        liveTime(live) {
            switch (live.status) {
                case 'going':
                    return live.join_count
                case 'published':
                    return dateformat(new Date(live.start_time), 'm/dd H:MM')
                case 'end':
                    return dateformat(new Date(live.real_end_time), 'm/dd H:MM')
            }
        },

        liveStatus(live) {
            switch (live.status) {
                case 'going':
                    return '直播中'
                case 'published':
                    return '直播预告'
                case 'end':
                    return '回放'
            }
        }
    }
}
</script>
