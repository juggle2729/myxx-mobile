<template>
    <div class="master-works-site bg-default">
        works
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
                craftsTotal: 0
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
                let loading = false;
                return function() {
                    let offset = this.masterWorks.length;
                    if(loading || !this.worksHasMore) {
                        return console.debug('master ' +
                            'works skip!!!!!!!!');
                    }

                    loading = true;
                    const params = {offset, limit};

                    return this.$get(`sites/${this.id}/products`, params).then((data) => {
                        this.masterWorks.splice(this.masterWorks.length, 0, ...data.products);
                        this.worksTotal = data.total;
                        loading = false;
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
        }
    };
</script>
