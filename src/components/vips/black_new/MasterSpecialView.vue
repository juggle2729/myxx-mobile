<template>
    <div class="master-vip-black-special">
        <div class="cover" @touchstart="coverTouchStart($event)"
             @touchmove="coverTouchMove($event)" @touchend="coverTouchEnd($event)">
            <div class="bg img" v-bg="interview.img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
            <div class="cover-bar">
                <div class="main-title">{{interview.title}}</div>
                <div class="sub-title" v-if="interview.sub_title">{{interview.sub_title}}</div>
                <div class="arrow">
                    <span class="icon-down"></span>
                </div>
            </div>
        </div>
        <div class="interview" @touchstart="contentTouchStart($event)"
             @touchmove="contentTouchMove($event)" @touchend="contentTouchEnd($event)">
            <div class="top img"></div>
            <div class="brief">
                <div class="detail">{{masterBaseData.brief | truncate 90}}</div>
            </div>
            <div class="content" v-html="interview.content"></div>
            <div class="base-info">
                <div class="center-avatar head avatar-222" v-link="{name: 'user-profile', params: {id: masterBaseData.id}}" v-bg.sm="masterBaseData.photo"></div>
                <div class="name">{{masterBaseData.name}}</div>
                <div class="title" v-if="masterBaseData.titles.length > 0">{{masterBaseData.titles[0].name | truncate 300}}</div>
                <ul class="operation">
                    <li class="attention" @click="followMaster()" v-if="!masterBaseData.follow && !isSelf"><span class="icon-follow"></span>关注</li>
                    <li class="attentioned" @click="followMaster()" v-if="masterBaseData.follow && !isSelf">已关注</li>
                    <li class="share" @click="share">分享</li>
                    <li class="store" v-link="{name: 'user-profile', params: {id: masterBaseData.id}}">店铺</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';

    export default {
        name: 'MasterSpecialView',
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false,
                interview: {},
                coverStartPos: 0,
                coverMoved: 0,
                contentStartPos: 0,
                contentMoved: 0,
                minMove: 80,
                coverDom: null,
                contentDom: null,
                following: false, // 是否正在进行follow操作
                isSelf: false
            };
        },
        ready() {
            window.scrollTo(0, 0);

            this.coverDom = document.querySelector('.master-vip-black-special .cover');
            this.contentDom = document.querySelector('.master-vip-black-special .interview');
            this.isSelf = (this.self && this.self.id == this.id);

            this.initDom();
        },
        activate(done) {
            this.setShareData('website', this.masterBaseData, true);
            this.fetchMasterInterviewInfo().then(() => {
                done();
            });
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
                this.contentDom.style['-webkit-transform'] = 'translateY(' + (this.coverMoved) + 'px)';
                this.contentDom.style['-webkit-transition'] = '0ms linear';
            },
            coverTouchEnd() {
                var pageHeight = document.documentElement.clientHeight;
                if (this.coverMoved > -this.minMove) {
                    this.contentDom.style['-webkit-transform'] = 'translateY(0px)';
                    this.contentDom.style['-webkit-transition'] = '100ms linear';
                } else {
                    this.contentDom.style['-webkit-transform'] = 'translateY(' + -pageHeight + 'px)';
                    this.contentDom.style['-webkit-transition'] = '200ms linear';
                    this.contentDom.style.marginBottom = -pageHeight + 'px';

                    this.enableRefresh(false);
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
                this.contentDom.style['-webkit-transform'] = 'translateY(' + (this.contentMoved - pageHeight) + 'px)';
                this.contentDom.style['-webkit-transition'] = '0ms linear';

                this.enableRefresh(true);
            },
            contentTouchEnd(event) {
                var pageHeight = document.documentElement.clientHeight;

                if (this.contentMoved > this.minMove) {
                    this.contentDom.style['-webkit-transform'] = 'translateY(0px)';
                    this.contentDom.style['-webkit-transition'] = '200ms linear';
                } else {
                    this.contentDom.style['-webkit-transform'] = 'translateY(' + -pageHeight + 'px)';
                    this.contentDom.style['-webkit-transition'] = '100ms linear';
                }

                return true;
            },
            fetchMasterInterviewInfo() {
                return this.$get(`sites/${this.id}/articles/${this.masterBaseData.interview_id}`, {}).then((data) => {
                    this.interview = data;
                });
            },
            initDom() {
                const innerHeight = window.innerHeight;

                const container = document.querySelector('.master-vip-black-special');
                const bgDom = container.querySelector('.cover .bg');
                bgDom.style.height = innerHeight + 'px';
            },
            followMaster() {
                if (this.following) {
                    return;
                }

                this.following = true;
                if (this.masterBaseData.follow) {
                    this.$delete(`users/follow/${this.masterBaseData.id}`, {}).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = false;
                        this.action('toast', {success: 1, text: '已取消关注'});
                    }).catch(() => {
                        this.following = false;
                    });
                } else {
                    this.$post(`users/follow/${this.masterBaseData.id}`, {}).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = true;
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

<style lang="sass">
    @import '../../../styles/partials/_var.scss';
    @import '../../../styles/partials/_mixin.scss';

    .master-vip-black-special {
        position: relative;
        overflow: hidden;

        .cover {
            position: relative;
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
            font-size: 28px;
            padding: 0 50px;
            .detail {
                @include border(vertical, #b7b7b7);
                padding: 40px 0;
                line-height: 36px;
                text-align: justify;
            }
        }

        /*强制覆盖富文本的样式*/
        .content {
            padding: 65px 24px;
            font-size: 30px;
            line-height: 26px;

            * {
                font-size: 30px !important;
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

            .head {
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
    }
</style>
