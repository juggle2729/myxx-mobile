<template>
    <div class="master-vip-black-special">
        <div class="cover">
            <div class="bg img" v-bg="interview.img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
            <div class="title">{{interview.title}}</div>
            <div class="arrow">
                <span class="icon-down"></span>
            </div>
        </div>
        <div class="interview">
            <div class="top">
                <div class="title img"></div>
                <div class="title-text">
                    专访{{masterBaseData.name}}{{masterBaseData.titles.length ? masterBaseData.titles[0].name : ''}}
                </div>
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
        methods: {
            scrollHandler(direction) {
                console.log(direction);
                const container = document.querySelector('.master-vip-black-special');

                const coverDom = container.querySelector('.cover');
                const interviewDom = container.querySelector('.interview');

                const innerHeight = window.innerHeight;

                if (direction === 'up') {
                    coverDom.style.top =  '-200px';
                    interviewDom.style.top = "0px";
                } else if (direction === 'down') {
                    coverDom.style.top = '0px';
                    interviewDom.style.top = innerHeight + 'px';
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
                interviewDom.style.top = (innerHeight - 0.2) + 'px';
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-special {
        position: relative;
        color: #fff;

        .cover {
            transition: all 1s ease-in;
            -webkit-transition: all 1s ease-in;

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

            .title {
                position: absolute;
                height: 220px;
                width: 100%;
                background: #0f0f10;
                opacity: 0.6;
                bottom: 0;
                left: 0;
                font-size: 40px;
                z-index: 88;
                padding: 40px 32px;
            }
        }

        .interview {
            position: absolute;
            left: 0;
            top: 1334px;
            background: #ab9780;
            z-index: 88;

            transition: all 0.6s ease;
            -webkit-transition: all 0.6s ease;
        }

        .title {
            height: 220px;
            width: 750px;
            background-image: url('#{$qn}/artist/special_title.png');
        }

        .title-text {
            margin-top: 60px;
            text-align: center;
            font-size: 24px;
        }

        .top {
            padding-bottom: 65px;
        }

        .content {
            padding: 0 55px 65px;
        }
    }
</style>
