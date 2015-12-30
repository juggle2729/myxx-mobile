<style lang="sass">
    .master-works-view {
        .craft-info, .works-info {
            padding: 0 24px;
        }

        .craft-info {
            padding-bottom: 196px;
        }

        .craft-item, .work-item {
            border-radius: 10px;
            .img {
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

        .works-info.bottom-blank {
            margin-bottom: 44px;
        }
    }
</style>
<template>
    <div class="master-works-view bg-default">
        <div class="works-info" :class="{'bottom-blank': worksTotal > 0}" v-show="worksTotal > 0">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">获奖作品</span>
                <div class="line"></div>
            </div>
            <div class="work-item bg-white" v-for="work in masterWorks">
                <div class="img work-img" v-bg="work.imgs[0]" query="imageView2/1/w/702/h/540/interlace/1"
                     v-link="{name: 'jade', params: {id: work.id}}">
                    <div class="img reward-img" v-if="work.product_rewards.length > 0" v-bg="work.product_rewards[0].reward_img"
                         query="imageView2/1/w/194/h/150/interlace/1"></div>
                </div>
                <div class="font-30 name center">{{work.name}}</div>
                <div class="font-30 reward-name center" v-if="work.product_rewards.length > 0">{{work.product_rewards[0].reward.name}}</div>
            </div>
            <div class="expand line-title" v-show="worksHasMore && !worksLoading">
                <span class="line"></span>
                <span class="arrow font-22 gray"></span>
                <span class="text font-22 gray" @click="fetchMasterWorksInfo">展开</span>
                <span class="line"></span>
            </div>
            <div class="no-more light font-22 center" v-show="!worksHasMore && !worksLoading">没有更多了</div>
            <div v-show="worksHasMore && worksLoading" class="loadmore center font-22 gray padding-vertical">
                <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
            </div>
        </div>
        <div class="craft-info" :class="{'bottom-blank': craftsTotal > 0}" v-show="craftsTotal > 0">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">工艺展示</span>
                <div class="line"></div>
            </div>
            <div class="craft-item bg-white" v-for="craft in masterCrafts" v-link="{name: 'craft-detail', params: {id: id, craftId: craft.id}}">
                <div class="img" v-bg.lg="craft.images[0]"></div>
                <div class="font-30 title">{{craft.title}}</div>
            </div>
            <div class="no-more light font-22 center" v-show="!craftsHasMore">没有更多了</div>
            <div v-show="craftsHasMore" class="loadmore center font-22 gray padding-vertical">
                <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
            </div>
        </div>
        <master-tab :master-info="masterBaseData" :current-tab="'master-works'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    export default {
        name: 'MasterWorksView',
        data() {
            return {
                worksHasMore: true,
                craftsHasMore: true,
                masterWorks: [],
                masterCrafts: [],
                worksTotal: 0,
                craftsTotal: 0,
                worksLoading: false
            };
        },
        mixins: [masterMixin],
        methods: {
            loadMasterOtherData: function() {
                this.fetchMasterWorksInfo();
                this.fetchMasterCraftsInfo();
            },
            fetchMasterWorksInfo: (function () {
                const limit = 5;
                return function() {
                    let offset = this.masterWorks.length;
                    if(this.worksLoading || !this.worksHasMore) {
                        return console.debug('master ' +
                            'works skip!!!!!!!!');
                    }

                    this.worksLoading = true;
                    const params = {offset, limit};

                    return this.$get(`sites/${this.id}/products`, params).then((data) => {

                        this.masterWorks.splice(this.masterWorks.length, 0, ...data.products);
                        this.worksTotal = data.total;
                        this.worksLoading = false;

                        if (data.products.length < limit) {
                            this.worksHasMore = false;
                        }
                    });
                }
            })(),
            fetchMasterCraftsInfo: (function() {
                const limit = 5;
                let loading = false;
                return function() {
                    let offset = this.masterCrafts.length;
                    if(loading || !this.craftsHasMore) {
                        return console.debug('master ' +
                            'craft skip!!!!!!!!');
                    }

                    loading = true;
                    const params = {offset, limit};

                    return this.$get(`sites/${this.id}/articles`, params).then((data) => {
                        this.masterCrafts.splice(this.masterCrafts.length, 0, ...data.articles);
                        this.craftsTotal = data.total;
                        loading = false;
                        if (data.articles.length < limit) {
                            this.craftsHasMore = false;
                        }
                    });
                }
            })()
        },
        events: {
            scrollToBottom(e) {
                this.fetchMasterCraftsInfo();
            }
        }
    };
</script>
