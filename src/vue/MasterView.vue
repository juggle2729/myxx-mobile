<style lang="stylus">
@import '~style/partials/var'
@import '~style/partials/mixin'
.master-view
    position: relative
    overflow: hidden
    .cover
        position: relative
    .play
        width: 100%
        padding-top: 77%

    .interview-video
        padding: 40px 32px 10px
    .cover-bar
        background: rgba(0, 0, 0, 0.5)
        width: 100%
        height: 220px
        position: absolute
        bottom: 0
        color: #fff
        font-size: 40px
        padding: 40px 32px

    .main-title
        font-size: 44px
    .sub-title
        margin-top: 36px
        font-size: 30px
    .interview
        padding-top: 1px
        background: #fff
    .top
        height: 68px
        width: 284px
        margin: 72px auto
        background-image: url($qn + 'artist/special-title.png')
        background-size: cover
    .brief
        color: #b7b7b7
        font-size: 30px
        .detail
            margin: 0 auto
            padding: 20px 20px
            line-height: 46px
            text-align: justify
            width: 650px
            height: 218px
            background-size: cover
            background-image: url($qn + 'artist/special_desc_bg.png')
    /*强制覆盖富文本的样式*/
    .content
        padding: 24px 24px 65px
        font-size: 34px
        line-height: 26px
        *
            font-size: 34px !important
            line-height: 54px !important
        img
            width: 100% !important
        img:last-child
            margin-bottom: 0 !important
    .base-info
        margin-top: 35px
        text-align: center
        font-size: 28px
        color: #737373
        .name
            margin-top: 22px
        .title
            margin-top: 22px
            font-size: 24px
        .avatar[size='222']
            margin: 0 auto
            border: 1px solid #737373
    .operation
        margin: 75px 0 0
        padding-bottom: 75px
        font-size: 28px
        li
            display: inline-block
            line-height: 67px
            border-radius: 36px
            width: 195px
        li:not(:first-child)
            margin-left: 34px
        .attention
            border(a, #eb2635)
            color: #eb2635
        .attentioned
            border(a, #c6c6c6)
            color: #c6c6c6
        .share
            background: #eb2635
            color: #fff
        .store
            border(a, #f88538)
            color: #f88538
    .share-overlay
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #000
        opacity: 0.8
        .share-icon
            position: fixed
            top: 0
            right: 0
            width: 567px
            height: 138px
            background-size: cover
            background-image: url($qn + 'artist/share.png')
    .arrow
        transform: rotate(90deg)
        animation: show_animation 1.5s infinite 0.2s
    .share-bottom
        z-index: 990
        position: fixed
        bottom: 0
        height: 112px
        width: 100%
        padding: 0 24px
        background-color: rgba(0, 0, 0, 0.9)
        .logo
            line-height: 0
            img
                height: 72px
                width: 72px
        .dot
            margin: 0 10px
        .download-btn
            height: 60px
            line-height: 60px
            padding: 0 28px
            border-radius: 5px
@keyframes show_animation
    0%
        margin-top: 0
    50%
        margin-top: 5px
</style>
<template  lang="pug">
.master-view
    .cover(@touchstart='coverTouchStart($event)', @touchmove='coverTouchMove($event)', @touchend='coverTouchEnd($event)')
        .bg.img(v-bg='interview.img', query='imageView2/1/w/750/h/1334/interlace/1')
        .cover-bar
            .main-title {{interview.title}}
            .sub-title(v-if='interview.sub_title') {{interview.sub_title}}
            .arrow.center
                icon(name="enter")
    .interview(@touchstart='contentTouchStart($event)', @touchmove='contentTouchMove($event)', @touchend='contentTouchEnd($event)')
        .top.img
        .brief
            .detail {{base.brief | truncate 76}}
        .interview-video(v-if='interview.video')
            .video(@click.stop='play(interview.video)', v-bg='interview.video', query='vframe/jpg/offset/5/rotate/auto|imageView2/1/w/600/h/460/interlace/1')
        .content(v-html='interview.content')
        .base-info
            avatar(:user='base', :size='222')
            .name {{base.name}}
            .title(v-if='base.titles.length > 0') {{base.titles[0].name | truncate 300}}
            ul.operation
                li.attention(@click='followMaster()', v-if='!base.follow && !isSelf')
                    icon(name="plus")
                    span 关注
                li.attentioned(@click='followMaster()', v-if='base.follow && !isSelf') 已关注
                li.share(@click='share') 分享
                li.store(v-link="{name: 'user', params: {id: base.id}}") 店铺
    .share-bottom.flex(v-if='showDock', @click='gotoDownload()')
        .logo.mgr
            img(src="//o0w8taeuo.qnssl.com/static/logo.png", alt='美玉秀秀')
        .flex-1.white
            .flex
                .name.fz-30.bold 美玉秀秀
                .fz-22.dot •
                .slogan.fz-22 最大的和田玉线上交流App
            .fz-22.red.margin-top 50万玉友的选择
        .download-btn.fz-30.white.bg-red 免费下载
</template>
<script>
import shareable from 'shareable'
export default {
    name: 'MasterSpecialView',
    mixins: [shareable],
    data(){
        return {
            base: {
                titles: []
            },
            interview: {},
            coverStartPos: 0,
            coverMoved: 0,
            contentStartPos: 0,
            contentMoved: 0,
            minMove: 80,
            coverDom: null,
            contentDom: null,
            following: false, // 是否正在进行follow操作
            isSelf: false,
            showDock: false
        }
    },
    route: {
        data({to}) {
            return this.$fetch(`sites/${to.params.id}/base`)
                .then(base => {
                    this.base = base
                    return this.$fetch(`sites/${base.id}/articles/${base.interview_id}`)
                }).then((data) => {
                    this.interview = data
                    this.setShareData({baseData: this.base, interview: this.interview})
                })
        }
    },
    ready() {
        window.scrollTo(0, 0)
        const container = document.querySelector('.master-view')
        this.coverDom = container.querySelector('.master-view .cover')
        this.contentDom = container.querySelector('.master-view .interview')
        this.isSelf = (this.self && this.self.id == this.base.id)
        container.querySelector('.cover .bg').style.height = window.innerHeight + 'px'
    },
    methods: {
        enableRefresh(enable) {
            this.action('toggleTopRefresh', {
                enable: enable
            })
        },
        coverTouchStart(event) {
            this.coverStartPos = event.touches[0].pageY
            this.coverMoved = 0
        },
        coverTouchMove(event) {
            var curPos = event.touches[0].pageY

            event.preventDefault()
            event.stopPropagation()

            this.coverMoved = curPos - this.coverStartPos
            this.contentDom.style['-webkit-transform'] = 'translate3d(0, ' + (this.coverMoved) + 'px, 0)'
            this.contentDom.style['-webkit-transition'] = '0ms linear'
        },
        coverTouchEnd() {
            var pageHeight = document.documentElement.clientHeight
            if (this.coverMoved > -this.minMove) {
                console.log('coverTouchEnd', 0)
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,0,0)'
                this.contentDom.style['-webkit-transition'] = '100ms linear'
            } else {
                console.log('coverTouchEnd', 1, pageHeight)
                this.contentDom.style['-webkit-transform'] = `translate3d(0, -${pageHeight}px, 0)`
                this.contentDom.style['-webkit-transition'] = '200ms linear'
                this.contentDom.style.marginBottom = -pageHeight + 'px'

                this.enableRefresh(false)

                // 展示下载底栏
                if(this.env.isShare) {
                    this.contentDom.style.paddingBottom = '50px'
                    this.showDock = true
                }
            }

            return true
        },
        contentTouchStart(event) {
            this.contentStartPos = event.touches[0].pageY
            this.contentMoved = 0
        },
        contentTouchMove(event) {
            var pageHeight = document.documentElement.clientHeight

            var curPos = event.touches[0].pageY
            var curTop = document.body.scrollTop

            if ((curPos < this.contentStartPos) || (curPos > this.contentStartPos && curTop > 0)) {
                return true
            }

            event.preventDefault()
            event.stopPropagation()

            this.contentMoved = curPos - this.contentStartPos
            this.contentDom.style['-webkit-transform'] = 'translate3d(0,' + (this.contentMoved - pageHeight) + 'px,0)'
            this.contentDom.style['-webkit-transition'] = '0ms linear'

            this.enableRefresh(true)
        },
        contentTouchEnd() {
            var pageHeight = document.documentElement.clientHeight
            if (this.contentMoved > this.minMove) {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,0,0)'
                this.contentDom.style['-webkit-transition'] = '200ms linear'
                if(this.env.isShare) {
                    this.showDock = false
                }
            } else {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,' + -pageHeight + 'px,0)'
                this.contentDom.style['-webkit-transition'] = '100ms linear'
            }
            return true
        },

        followMaster() {
            if (this.following) {
                return
            }

            this.following = true
            if(this.env.isApp) {
                if (this.base.follow) {
                    this.$delete(`users/follow/${this.base.id}`, {}).then((data) => {
                        this.following = false
                        this.base.follow = false
                        this.action('toast', {success: 1, text: '已取消关注'})
                    }).catch(() => {
                        this.following = false
                    })
                } else {
                    this.$post(`users/follow/${this.base.id}`, {}).then((data) => {
                        this.following = false
                        this.base.follow = true
                        this.action('toast', {success: 1, text: '已关注'})
                    }).catch(() => {
                        this.following = false
                    })
                }

                setTimeout(() => {
                    this.following = false
                }, 200)
            } else {
                this.gotoDownload()
            }
        }
    }
}
</script>
