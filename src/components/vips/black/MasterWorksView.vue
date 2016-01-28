<template>
    <div class="master-vip-black-works">
        <div class="cover img"></div>
        <div class="works-item">
            <div class="work-item" :class="[$index % 2 === 0 ? 'odd' : 'even']" v-for="work in items" v-link="{name: 'jade', params: {id: work.id}}">
                <div class="img" v-bg="work.vip_img" default="false" query="imageView2/1/w/750/h/774/interlace/1"></div>
                <div class="description">{{work.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import MasterMixin from '../../mixin/Master.vue';
    import PagingMixin from '../../mixin/Paging.vue';

    export default {
        name: 'MasterWorksView',
        mixins: [ MasterMixin, PagingMixin ],
        data(){
            return {
                masterBaseData: this.data,
                showMenu: false
            };
        },
        ready() {
            window.scrollTo(0, 0);
        },
        activate(done) {
            this.checkShare();
            this.fetch().then(() => {
                done();
            });
        },
        computed: {
            paging() {
                return {
                    path: `sites/${this.id}/products`,
                    list: 'products'
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../../styles/partials/_var.scss';

    .master-vip-black-works {
        width: 100%;
        position: relative;
        background-color: #030102;
        overflow: hidden;

        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: 700px;
            width: 750px;
            z-index: 77;
            background-image: url('#{$qn}/artist/works_cover.png');
        }

        .works-item {
            margin-top: 700px;
        }

        .work-item  {
            width: auto;
            height: auto;
            position: relative;

            .img {
                width: 100%;
                height: 774px;
            }

            &.even {
                 background: url('#{$qn}/artist/works_bg.png') no-repeat center center;
                 background-size: cover;
             }

            &.odd {
                background: #282828;
             }

        }

        .description {
            position: absolute;
            text-align: center;
            color: #b2b2b2;
            font-size: 24px;
            bottom: 50px;
            width: 100%;
        }
    }
</style>
