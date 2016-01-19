<template>
    <component :is="currentView" :id="userId" :data="masterBaseData" :params="params"></component>
</template>
<script>
    import MasterBasicHome from './MasterHomeView.vue'
    import MasterBasicWorks from './MasterWorksView.vue';
    import MasterBasicSpecial from './MasterSpecialView.vue';
    import MasterBasicStudio from './MasterStudioView.vue';
    import MasterBasicStore from './MallStoreView.vue';
    import MasterBasicCraftDetail from './CraftDetailView.vue';

    import MasterVipBlackHome from './vips/black/MasterHomeView.vue'

    export default{
        data(){
            return {
                currentView: '',
                userId: '',
                masterBaseData: {},
                tab: '',
                params: {},
                validTabs: [ 'home', 'works', 'special', 'studio', 'store', 'craftDetail' ],
                vipTemplates: {
                    1: 'Black'
                }
            }
        },
        components: {
            MasterBasicHome,
            MasterBasicWorks,
            MasterBasicSpecial,
            MasterBasicStudio,
            MasterBasicStore,
            MasterBasicCraftDetail,

            MasterVipBlackHome
        },
        route: {
            data({ to }) {
                this.userId = to.params.id;
                this.tab = this.tabName(to.query.tab);
                this.params = _.merge(to.params, to.query);

                return this.fetchMasterBaseInfo();
            }
        },
        methods: {
            tabName(string) {

                if (!string || this.validTabs.indexOf(string) === -1) {
                    string = this.validTabs[0];
                }

                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            fetchMasterBaseInfo() {
                return this.$get(`sites/${this.userId}/base`, {}).then(data => {
                        this.masterBaseData = data;

                        let preCurrentView = '';
                        if (data.site_type === 'general') {
                            preCurrentView = 'MasterBasic';
                        } else if (data.site_type === 'vip') {
                            const vipTemplate = this.vipTemplates[data.display_template];
                            if(!vipTemplate) {
                                preCurrentView = 'MasterVip' + vipTemplate;
                            } else {
                                preCurrentView = 'MasterBasic';
                            }
                        }
                        this.currentView = (preCurrentView + this.tab);
                    });
            }
        }
    }
</script>
