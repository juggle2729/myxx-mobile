<style lang="sass">
@import '~style/partials/_var.scss';
@import '~style/partials/_mixin.scss';

.master-view {
    position: relative;
    overflow: hidden;

    .cover {
        position: relative;
    }

    .play {
        width: 100%;
        padding-top: 77%;
    }

    .interview-video {
        padding: 40px 32px 10px;
    }

    .cover-bar {
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 220px;
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 40px;

        padding: 40px 32px;
    }

    .main-title {
        font-size: 44px;
    }

    .sub-title {
        margin-top: 36px;
        font-size: 30px;
    }

    .interview {
        padding-top: 1px;
        background: #fff;
    }

    .top {
        height: 68px;
        width: 284px;
        margin: 72px auto;
        background-image: url('#{$qn}/artist/special-title.png');
    }

    .brief {
        color: #b7b7b7;
        font-size: 30px;
        .detail {
            margin: 0 auto;
            padding: 20px 20px;
            line-height: 46px;
            text-align: justify;
            width: 650px;
            height: 218px;
            background-size: cover;
            background-image: url('#{$qn}/artist/special_desc_bg.png');
        }
    }

    /*强制覆盖富文本的样式*/
    .content {
        padding: 24px 24px 65px;
        font-size: 34px;
        line-height: 26px;

        * {
            font-size: 34px !important;
            line-height: 54px !important;
        }

        img {
            width: 100% !important;
        }

        img:last-child {
            margin-bottom: 0 !important;
        }
    }

    .base-info {
        margin-top: 35px;
        text-align: center;
        font-size: 28px;
        color: #737373;

        .name {
            margin-top: 22px;
        }

        .title {
            margin-top: 22px;
            font-size: 24px;
        }

        .avatar-222 {
            margin: 0 auto;
            border: 1px solid #737373;
        }
    }

    .operation {
        margin: 75px 0 0;
        padding-bottom: 75px;
        font-size: 28px;
        li {
            display: inline-block;
            line-height: 67px;
            border-radius: 36px;
            width: 195px;
        }

        li:not(:first-child) {
            margin-left: 34px;
        }

        .attention {
            @include border(all, #eb2635);
            color: #eb2635;
        }

        .attentioned {
            @include border(all, #c6c6c6);
            color: #c6c6c6;
        }

        .share {
            background: #eb2635;
            color: #fff;
        }

        .store {
            @include border(all, #f88538);
            color: #f88538;
        }
    }

    .share-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.8;
        .share-icon {
            position: fixed;
            top: 0;
            right: 0;
            width: 567px;
            height: 138px;
            background-size: cover;
            background-image: url('#{$qn}/artist/share.png');
        }
    }

    .arrow {
        animation: show_animation 1s infinite;
        -webkit-animation: show_animation 1.5s infinite 0.2s;
    }

    @keyframes show_animation {
        0% { margin-top: 0; }
        50% { margin-top: 5px; }
    }

    .download-dock {
        width: 100%;
        height: 100px;
        bottom: 0;
        padding: 0px 32px;
        .logo {
            height: 68px;
            width: 68px;
            margin: 5px 20px 0 0;
        }
        .download-btn {
            display: block;
            padding: 10px 20px;
            border-width: 1px;
            border-radius: 5px;
        }
    }
}
</style>
<template>
    <div class="master-view">
        <div class="cover" @touchstart="coverTouchStart($event)"
             @touchmove="coverTouchMove($event)" @touchend="coverTouchEnd($event)">
            <div class="bg img" v-bg="interview.img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
            <div class="cover-bar">
                <div class="main-title">{{interview.title}}</div>
                <div class="sub-title" v-if="interview.sub_title">{{interview.sub_title}}</div>
                <div class="arrow center">
                    <span class="icon-down"></span>
                </div>
            </div>
        </div>
        <div class="interview" @touchstart="contentTouchStart($event)"
             @touchmove="contentTouchMove($event)" @touchend="contentTouchEnd($event)">
            <div class="top img"></div>
            <div class="brief">
                <div class="detail">{{base.brief | truncate 76}}</div>
            </div>
            <div class="interview-video" v-if="interview.video">
                <div class="play" @click.stop="play(interview.video)"
                     v-bg="interview.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/460/interlace/1"></div>
            </div>
            <div class="content" v-html="interview.content"></div>
            <div class="base-info">
                <avatar :user="base" :size="222"></avatar>
                <div class="name">{{base.name}}</div>
                <div class="title" v-if="base.titles.length > 0">{{base.titles[0].name | truncate 300}}</div>
                <ul class="operation">
                    <li class="attention" @click="followMaster()" v-if="!base.follow && !isSelf"><span class="icon-follow"></span>关注</li>
                    <li class="attentioned" @click="followMaster()" v-if="base.follow && !isSelf">已关注</li>
                    <li class="share" @click="share">分享</li>
                    <li class="store" v-link="{name: 'user', params: {id: base.id}}">店铺</li>
                </ul>
            </div>
        </div>
        <div v-if="showDock" class="download-dock flex bg-default border-bottom fixed">
            <img class="logo" :src="'logo.png' | qn" alt="美玉秀秀">
            <div class="flex-1 flex">
                <div class="name font-30 bold">美玉秀秀</div>
                <div class="slogan font-26 gray margin-left">大师在线视频鉴宝</div>
            </div>
            <a :href="config.download" class="download-btn font-30 red border-red">下载</a>
        </div>
    </div>
</template>
<script>
import shareable from 'shareable';
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
        };
    },
    route: {
        data({to}) {
            return this.$get(`sites/${to.params.id}/base`)
                .then(base => {
                    this.base = base;
                    return this.$get(`sites/${base.id}/articles/${base.interview_id}`);
                }).then((data) => {
                    this.interview = data;
                    this.setShareData({baseData: this.base, interview: this.interview}, true);
                });
        }
    },
    ready() {
        window.scrollTo(0, 0);
        const container = document.querySelector('.master-view');
        this.coverDom = container.querySelector('.master-view .cover');
        this.contentDom = container.querySelector('.master-view .interview');
        this.isSelf = (this.self && this.self.id == this.base.id);
        container.querySelector('.cover .bg').style.height = window.innerHeight + 'px';
    },
    methods: {
        enableRefresh(enable) {
            this.action('toggleTopRefresh', {
                enable: enable
            })
        },
        coverTouchStart(event) {
            this.coverStartPos = event.touches[0].pageY;
            this.coverMoved = 0;
        },
        coverTouchMove(event) {
            var curPos = event.touches[0].pageY;

            event.preventDefault();
            event.stopPropagation();

            this.coverMoved = curPos - this.coverStartPos;
            this.contentDom.style['-webkit-transform'] = 'translate3d(0, ' + (this.coverMoved) + 'px, 0)';
            this.contentDom.style['-webkit-transition'] = '0ms linear';
        },
        coverTouchEnd() {
            var pageHeight = document.documentElement.clientHeight;
            if (this.coverMoved > -this.minMove) {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,0,0)';
                this.contentDom.style['-webkit-transition'] = '100ms linear';
            } else {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,' + -pageHeight + 'px,0)';
                this.contentDom.style['-webkit-transition'] = '200ms linear';
                this.contentDom.style.marginBottom = -pageHeight + 'px';

                this.enableRefresh(false);

                // 展示下载底栏
                if(this.env.isShare) {
                    this.contentDom.style.paddingBottom = '50px';
                    this.showDock = true;
                }
            }

            return true;
        },
        contentTouchStart(event) {
            this.contentStartPos = event.touches[0].pageY;
            this.contentMoved = 0;
        },
        contentTouchMove(event) {
            var pageHeight = document.documentElement.clientHeight;

            var curPos = event.touches[0].pageY;
            var curTop = document.body.scrollTop;

            if ((curPos < this.contentStartPos) || (curPos > this.contentStartPos && curTop > 0)) {
                return true;
            }

            event.preventDefault();
            event.stopPropagation();

            this.contentMoved = curPos - this.contentStartPos;
            this.contentDom.style['-webkit-transform'] = 'translate3d(0,' + (this.contentMoved - pageHeight) + 'px,0)';
            this.contentDom.style['-webkit-transition'] = '0ms linear';

            this.enableRefresh(true);
        },
        contentTouchEnd() {
            var pageHeight = document.documentElement.clientHeight;
            if (this.contentMoved > this.minMove) {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,0,0)';
                this.contentDom.style['-webkit-transition'] = '200ms linear';
                if(this.env.isShare) {
                    this.showDock = false;
                }
            } else {
                this.contentDom.style['-webkit-transform'] = 'translate3d(0,' + -pageHeight + 'px,0)';
                this.contentDom.style['-webkit-transition'] = '100ms linear';
            }
            return true;
        },

        followMaster() {
            if (this.following) {
                return;
            }

            this.following = true;
            if (this.base.follow) {
                this.$delete(`users/follow/${this.base.id}`, {}).then((data) => {
                    this.following = false;
                    this.base.follow = false;
                    this.action('toast', {success: 1, text: '已取消关注'});
                }).catch(() => {
                    this.following = false;
                });
            } else {
                this.$post(`users/follow/${this.base.id}`, {}).then((data) => {
                    this.following = false;
                    this.base.follow = true;
                    this.action('toast', {success: 1, text: '已关注'});
                }).catch(() => {
                    this.following = false;
                });
            }

            setTimeout(() => {
                this.following = false;
            }, 200);
        }
    }
}
</script>
