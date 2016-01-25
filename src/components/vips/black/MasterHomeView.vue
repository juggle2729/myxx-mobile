<style lang="sass" scoped>

    @import '../../../styles/partials/_var.scss';

    .master-vip-black-home {
        width: 100%;
        background-color: #100f0d;
        overflow: hidden;

        .cover {
            height: 1190px;
            width: 750px;
            background-color: #100f0d;
        }

        .brief {
            margin-top: 130px;
            font-size: 30px;
            color: #fff;
            line-height: 42px;
            padding: 0 106px;
            text-indent: 64px;
        }

        .arrow {
            margin-top: 228px;
        }

        .menus {
            background-color: #100f0d;
            padding: 58px 40px;
        }

        .menu:not(:first-child) {
            margin-top: 34px;
        }

        .menu-item {
            color: #fff;
            font-size: 30px;
            text-align: center;
            background: #100f0d;
            display: inline-block;

            .bg {
                background: url('#{$qn}/artist/menu_nav.jpg') center center no-repeat;
                background-size: cover;
                display: inline-block;
                width: 323px;
                height: 104px;
                line-height: 104px;
            }
        }

        .bottom-placeholder {
            height:0;
            overflow:hidden
        }
    }
</style>
<template>
    <div class="master-vip-black-home">
        <div class="cover img" v-bg="masterBaseData.vip_website_img" query="imageView2/1/w/750/h/1334/interlace/1"></div>
        <div class="brief">{{masterBaseData.brief | truncate 95}}</div>
        <resumes :id="id" :tab="tab"></resumes>
        <div class="arrow">
            <span class="icon-down"></span>
        </div>
        <div class="menus">
            <div class="menu">
                <div class="menu-item">
                    <span class="bg" v-link="linkPage('special')">人物志</span>
                </div>
                <div class="menu-item">
                    <span class="bg" v-link="linkPage('works')">作品展示</span>
                </div>
            </div>
            <div class="menu">
                <div class="menu-item">
                    <span class="bg" v-link="linkPage('activities')">动态</span>
                </div>
                <div class="menu-item">
                    <span class="bg" v-link="linkPage('studio')">工作室</span>
                </div>
            </div>
        </div>
        <div class="bottom-placeholder"></div>
    </div>
</template>
<script>
    import Resumes from './Resumes.vue';
    import MasterMixin from '../../mixin/Master.vue';

    export default{
        components: { Resumes },
        mixins: [ MasterMixin ],
        data(){
            return {
                masterBaseData: this.data
            };
        },
        activate(done) {
            this.checkShare();
            done();
        },
        computed: {
            tab() {
                return this.fromParams.tab || '';
            }
        },
        methods: {
            linkPage(tab) {
                return this.link(tab, false);
            }
        }
    }
</script>
