<style lang="sass" scoped>

    @import '../../../styles/partials/_var.scss';

    .master-vip-black-home {
        height: 1334px;
        width: 100%;

        position: relative;
        background-color: #030102;
        overflow: hidden;

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 77;
        }

        .attention {
            position: absolute;
            bottom: 32px;
            left: 40px;
            z-index: 99;

            background-color: #8a8a8a;
            font-size: 24px;
            padding: 24px 36px;
            border-radius: 5px;
        }

        .unAttentioned {
            background-color: #d79f60;
        }

        .arrow-up {
            position: absolute;
            left: 50%;
            bottom: 38px;
            z-index: 99;
            margin-left: -20.5px;
            background: url('#{$qn}/icon/arrow-down.svg') center center no-repeat;
            background-size: cover;
            display: inline-block;
            height: 27px;
            width: 41px;
        }

        .component {
            transition: all 0.5s ease;
            -webkit-transition: all 0.5s ease;
        }

        .component-leave {
            top: -100% !important;
        }

        .component-enter {
            top: 0 !important;
        }

        .component-next-leave {
            top: 100% !important;
        }
    }
</style>
<template>
    <div class="master-vip-black-home">
        <div class="cover img component" v-bg="masterBaseData.vip_website_img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
        <resumes :resumes="resumes" class="component"></resumes>
        <span class="attention white" v-if="showAttention" @click="followMaster" :class="{unAttentioned: !masterBaseData.follow}">{{attentionText}}</span>
        <span class="arrow-up" v-if="showArrow"></span>
        <right-menu :show="showMenu" :id="id" :fixed="false"></right-menu>
    </div>
</template>
<script>
    import RightMenu from './RightMenu.vue';
    import Resumes from './Resumes.vue';
    import MasterMixin from '../../mixin/Master.vue';

    import Scroll from '../../../utils/scroll';

    export default{
        components: { RightMenu, Resumes },
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data,
                attentionText: '未关注',
                following: false,
                showMenu: false,
                pageIndex: 1,
                resumes: []
            };
        },
        ready() {
            const container = document.querySelector('.master-vip-black-home');
            Scroll.on('scroll', (direction) => {
                const components = container.querySelectorAll('.component');
                if (this.pageIndex > components.length || this.pageIndex < 0) {
                    return;
                }

                if (direction === 'up') {

                    if (this.pageIndex + 1 >= components.length) {
                        return;
                    }

                    const currentComponent = components[this.pageIndex];
                    const currentClasslist = currentComponent.classList;

                    const targetComponent = components[this.pageIndex + 1];
                    const targetClasslist = targetComponent.classList;

                    targetClasslist.remove('component-next-leave');
                    targetClasslist.add('component-enter');

                    currentClasslist.remove('component-enter');
                    currentClasslist.add('component-leave');

                    this.pageIndex++;
                } else if (direction === 'down') {

                    if (this.pageIndex - 1 < 0) {
                        return;
                    }

                    const currentComponent = components[this.pageIndex];
                    const currentClasslist = currentComponent.classList;

                    const targetComponent = components[this.pageIndex - 1];
                    const targetClasslist = targetComponent.classList;

                    currentClasslist.remove('component-enter');
                    currentClasslist.add('component-next-leave');

                    targetClasslist.remove('component-leave');
                    targetClasslist.add('component-enter');

                    this.pageIndex--;
                }
            });

            this.fetchUserResumes();
        },
        methods: {
            followMaster() {
                if (this.following) {
                    return;
                }

                this.following = true;
                if (this.masterBaseData.follow) {
                    this.$delete(`users/follow/${this.masterBaseData.id}`).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = false;
                        this.toggleAttention();
                    }).catch(() => {
                        this.following = false;
                    });
                } else {
                    this.$post(`users/follow/${this.masterBaseData.id}`).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = true;
                        this.toggleAttention();
                    }).catch(() => {
                        this.following = false;
                    });
                }
            },
            toggleAttention() {
                this.attentionText = this.masterBaseData.follow ? '已关注' : '未关注';
            },
            fetchUserResumes: function () {
                return this.$get(`sites/${this.id}/resumes`, {}).then((data) => {
                    this.resumes = data.resumes;
                });
            }
        },
        computed: {
            showArrow() {
                return !(this.pageIndex - 2 >= 2);
            },
            showAttention() {
                return this.pageIndex === 0;
            }
        }
    }
</script>
