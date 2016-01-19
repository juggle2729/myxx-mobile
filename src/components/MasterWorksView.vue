<style lang="sass">
    .master-works-view {
        .craft-info, .works-info {
            padding: 0 24px;
        }

        .works-info {
            padding-bottom: 196px;
        }

        .craft-item, .work-item {
            border-radius: 10px;
            .img {
                background-size: cover;
                height: 540px;
            }

            .title {
                line-height: 80px;
                padding-left: 32px;
            }
        }

        .work-item {
            .name {
                margin-top: 22px;
                padding-bottom: 12px;
            }

            .reward-name {
                padding-bottom: 22px;
            }

            .work-img {
                position: relative;
            }

            .reward-img {
                position: absolute;
                right: 20px;
                bottom: 20px;
                height: 150px;
                width: 194px;
            }
        }

        .craft-item:not(:first-child), .work-item:not(:first-child) {
            margin-top: 22px;
        }

        .craft-info.bottom-blank {
            padding-bottom: 44px;
        }
    }
</style>
<template>
    <div class="master-works-view bg-default">
        <div class="craft-info" :class="{'bottom-blank': masterCrafts.length > 0}" v-show="masterCrafts.length > 0">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">工艺展示</span>
                <div class="line"></div>
            </div>
            <div class="craft-item bg-white" v-for="craft in masterCrafts" v-link="{name: 'master', params: {id: id}, query: {tab: 'craftDetail', craftId: craft.id}}">
                <div class="img" v-bg.lg="craft.img"></div>
                <div class="font-30 title">{{craft.title}}</div>
            </div>
        </div>
        <div class="works-info" :class="{'bottom-blank': !items.isEmpty}" v-show="!items.isEmpty">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">获奖作品</span>
                <div class="line"></div>
            </div>
            <div class="work-item bg-white" v-for="work in items">
                <div class="img work-img" v-bg="work.imgs[0]" query="imageView2/1/w/702/h/540/interlace/1"
                     v-link="{name: 'jade', params: {id: work.id}}">
                    <div class="img reward-img" v-if="work.product_rewards.length > 0" v-bg="work.product_rewards[0].reward_img"
                         query="imageView2/1/w/194/h/150/interlace/1"></div>
                </div>
                <div class="font-30 name center">{{work.name}}</div>
                <div class="font-30 reward-name center" v-if="work.product_rewards.length > 0">{{work.product_rewards[0].reward.name}}</div>
            </div>
            <partial name="load-more" v-if="items.hasMore"></partial>
            <div v-else class="no-more light font-22 center">没有更多了</div>
        </div>
        <master-tab :master-info="masterBaseData" :current-tab="'works'"></master-tab>
    </div>
</template>
<script>
import MasterMixin from '../mixins/MasterMixin.vue';
import PagingMixin from './PagingMixin.vue';
export default {
    name: 'MasterWorksView',
    mixins: [MasterMixin, PagingMixin],
    data() {
        return {
            masterCrafts: []
        };
    },
    activate(done) {
        this.checkShare();
        this.loadMasterOtherData().then(() => {
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
    },
    methods: {
        loadMasterOtherData: function() {
            this.fetchMasterCraftsInfo();
            return this.fetch();
        },
        fetchMasterCraftsInfo() {
            return this.$get(`sites/${this.id}/articles`,  { article_type: 'craft' }).then((data) => {
                this.masterCrafts.splice(this.masterCrafts.length, 0, ...data.articles);
            });
        }
    }
};
</script>
