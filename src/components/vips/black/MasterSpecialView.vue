<template>
    <div class="master-vip-black-special">
        <div class="cover img" v-bg="interview.img" query="imageView2/1/w/750/h/378/interlace/1"></div>
        <div class="title img"></div>
        <div class="title-text">{{interview.title}}</div>
        <div class="interview" v-html="interview.content"></div>
        <right-menu :show="showMenu" :id="id"></right-menu>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';
    import RightMenu from './RightMenu.vue';

    export default {
        name: 'MasterSpecialView',
        components: { RightMenu },
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false,
                interview: {}
            };
        },
        activate(done) {
            this.checkShare();
            this.fetchMasterInterviewInfo().then(() => {
                done();
            });
        },
        methods: {
            fetchMasterInterviewInfo() {
                return this.$get(`sites/${this.id}/articles/${this.masterBaseData.interview_id}`, {}).then((data) => {
                    this.interview = data;
                });
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-special {
        width: 100%;
        position: relative;
        background-color: #ab9780;
        overflow: hidden;
        color: #fff;

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 378px;
            width: 100%;
            z-index: 77;
        }

        .title {
            position: absolute;
            top: 0;
            left: 0;
            height: 220px;
            width: 750px;
            z-index: 77;
            background-image: url('#{$qn}/artist/special_title.png');
        }

        .title-text {
            position: absolute;
            top: 294px;
            left: 50%;
            z-index: 78;
            transform: translateX(-50%);
            font-size: 24px;
        }

        .interview {
            margin-top: 378px;
            padding: 65px 55px;
        }
    }
</style>
