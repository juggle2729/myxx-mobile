<template>
    <div class="master-vip-black-special">
        <div class="cover">
            <div class="bg img" v-bg="interview.img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
            <div class="title-bg"></div>
            <div class="title">
                <div class="main-title" v-text="mainTitle"></div>
                <div class="sub-title" v-if="subTitle" v-text="subTitle"></div>
            </div>
            <div class="arrow">
                <span class="icon-down"></span>
            </div>
        </div>
        <div class="interview">
            <div class="top">
                <div class="title img"></div>
            </div>
            <div class="content" v-html="interview.content"></div>
        </div>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';
    import Scroll from '../../../utils/scroll';

    export default {
        name: 'MasterSpecialView',
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false,
                interview: {}
            };
        },
        ready() {
            window.scrollTo(0, 0);

            Scroll.on('touch-scroll', this.scrollHandler);

            Scroll.install(document.querySelector('.master-vip-black-special .cover'));
            Scroll.install(document.querySelector('.master-vip-black-special .top'));

            this.initDom();
        },
        destroyed() {
            Scroll.removeListener('touch-scroll', this.scrollHandler);
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
                if (!this.interview.title) {
                    return '';
                }

                const separator = this.interview.title.indexOf('\\n');
                if (separator === -1) {
                    return '';
                }
                return this.interview.title.substr(separator + 2, this.interview.title.length);
            }
        },
        methods: {
            scrollHandler(direction) {
                const container = document.querySelector('.master-vip-black-special');

                const coverDom = container.querySelector('.cover');
                const interviewDom = container.querySelector('.interview');

                const innerHeight = window.innerHeight;

                if (direction === 'up') {
                    coverDom.style.top =  '-300px';
                    interviewDom.style.top = "0px";

                    coverDom.style.transform =  'translateY(-300px)';
                    interviewDom.style.transform = "translateY(0)";
                } else if (direction === 'down') {
                    coverDom.style.top = '0px';
                    interviewDom.style.top = innerHeight + 'px';

                    coverDom.style.transform = 'translateY(0)';
                    interviewDom.style.transform = 'translateY(' + innerHeight + 'px)';
                }
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

                const interviewDom = container.querySelector('.interview');
                interviewDom.style.top = innerHeight + 'px';
                interviewDom.style.transform = 'translateY(' + innerHeight + 'px)';
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-special {
        position: relative;
        background-color: #fff;

        .cover {
            transition: transform 0.6s ease;
            -webkit-transition: transform 0.6s ease;

            position: absolute;
            top: 0;
            left: 0;
            z-index: 77;

            .bg {
                width: 750px;
            }

            .arrow {
                position: absolute;
                left: 0;
                bottom: 22px;
                z-index: 89;
            }

            .title-bg {
                position: absolute;
                height: 220px;
                width: 100%;
                background: #000;
                opacity: 0.6;
                bottom: 0;
                left: 0;
                z-index: 88;
            }

            .title {
                position: absolute;
                color: #fff;
                font-size: 40px;
                padding: 40px 32px;
                z-index: 89;
                bottom: 36px;
                left: 0;
                text-align: left;
            }

            .main-title {
                font-size: 44px;
            }

            .sub-title {
                margin-top: 36px;
                font-size: 30px;
            }
        }

        .interview {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: #fff;
            color: #fff;
            z-index: 88;

            transition: transform 0.8s ease;
            -webkit-transition: transform 0.8s ease;
        }

        .top {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;

            height: 500px;
            width: 100%;
            .title {
                height: 68px;
                width: 284px;
                margin: 72px auto;
                background-image: url('#{$qn}/artist/special-title.png');
            }
        }

        .content {
            position: absolute;
            left: 0;
            top: 180px;
            width: 100%;
            z-index: 5;

            padding: 0 25px 65px;
            font-size: 30px;
            line-height: 26px;
            img {
                margin: 10px 0 !important;
            }
        }
    }
</style>
