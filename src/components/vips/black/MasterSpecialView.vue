<template>
    <div class="master-vip-black-special">
        <div class="cover" @touchstart="coverTouchStart($event)"
             @touchmove="coverTouchMove($event)" @touchend="coverTouchEnd($event)">
            <div class="bg img" v-bg="interview.img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
            <div class="cover-bar">
                <div class="main-title" v-text="mainTitle"></div>
                <div class="sub-title" v-if="subTitle" v-text="subTitle"></div>
                <div class="arrow">
                    <span class="icon-down"></span>
                </div>
            </div>
        </div>
        <div class="interview" @touchstart="contentTouchStart($event)"
             @touchmove="contentTouchMove($event)" @touchend="contentTouchEnd($event)">
            <div class="top img"></div>
            <div class="content" v-html="interview.content"></div>
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
                minMove: 100,
                coverDom: null,
                contentDom: null
            };
        },
        ready() {
            window.scrollTo(0, 0);

            this.coverDom = document.querySelector('.master-vip-black-special .cover');
            this.contentDom = document.querySelector('.master-vip-black-special .interview');

            this.initDom();
        },
        activate(done) {
            this.checkShare();
            this.fetchMasterInterviewInfo().then(() => {
                done();
            });
        },
        computed: {
            mainTitle() {
                if (!this.interview.title) {
                    return '';
                }

                const separator = this.interview.title.indexOf('\\n');
                if (separator === -1) {
                    return this.interview.title;
                }

                return this.interview.title.substr(0, separator);
            },
            subTitle() {
                if (this.interview.sub_title) { //如果有副标题,则用副标题
                    return this.interview.sub_title;
                } else if (!this.interview.title) {
                    return '';
                }

                // 没有副标题,则从主标题截取副标题
                const separator = this.interview.title.indexOf('\\n');
                if (separator === -1) {
                    return '';
                }
                return this.interview.title.substr(separator + 2, this.interview.title.length);
            }
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
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-special {
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

        .content {
            padding: 0 25px 65px;
            font-size: 30px;
            line-height: 26px;
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
