<style lang="sass">
    .fade-transition {
        transition: opacity .1s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
<template>
    <component :is="currentView" :id="userId" :data="masterBaseData" :params="params" :from-params="fromParams" transition="fade"
               transition-mode="out-in"></component>
</template>
<script>
    import MasterBasicHome from './MasterHomeView.vue'
    import MasterBasicWorks from './MasterWorksView.vue';
    import MasterBasicSpecial from './MasterSpecialView.vue';
    import MasterBasicStudio from './MasterStudioView.vue';
    import MasterBasicStore from './MallStoreView.vue';
    import MasterBasicCraftDetail from './CraftDetailView.vue';

    import MasterVipBlackHome from './vips/black/MasterHomeView.vue'
    import MasterVipBlackActivities from './vips/black/MasterActivitiesView.vue';
    import MasterVipBlackWorks from './vips/black/MasterWorksView.vue';
    import MasterVipBlackSpecial from './vips/black/MasterSpecialView.vue';
    import MasterVipBlackStudio from './vips/black/MasterStudioView.vue';

    export default{
        data(){
            return {
                currentView: '',
                userId: '',
                masterBaseData: {},
                tab: '',
                params: {},
                fromParams: {},
                validTabs: [ 'home', 'works', 'special', 'studio', 'store', 'craftDetail', 'activities' ],
                vipTemplates: {
                    1: 'Black'
                },
                isVip: false
            }
        },
        components: {
            MasterBasicHome,
            MasterBasicWorks,
            MasterBasicSpecial,
            MasterBasicStudio,
            MasterBasicStore,
            MasterBasicCraftDetail,

            MasterVipBlackHome,
            MasterVipBlackActivities,
            MasterVipBlackWorks,
            MasterVipBlackSpecial,
            MasterVipBlackStudio
        },
        route: {
            data(transition) {
                this.userId = transition.to.params.id;
                this.tab = this.tabName(transition.to.query.tab);
                this.params = _.merge(transition.to.params, transition.to.query);
                this.fromParams = _.merge(transition.from.params, transition.from.query) || {};

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
            setPageTitle() {
                document.title = this.masterBaseData.name + '-官网';
                if (this.tab.toLowerCase() === 'store') {
                    document.title = '店铺详情';
                } else if (this.tab.toLowerCase() === 'craftDetail') {
                    document.title = '工艺详情';
                }
            },
            fetchMasterBaseInfo() {
                return this.$get(`sites/${this.userId}/base`, {}).then(data => {
                    this.masterBaseData = data;

                    let preCurrentView = '';
                    if (data.site_type === 'general') {
                        this.isVip = true;
                        preCurrentView = 'MasterBasic';

                    } else if (data.site_type === 'vip') {
                        this.isVip = true;

                        const vipTemplate = this.vipTemplates[data.display_template];
                        if(vipTemplate && (this.tab.toLowerCase() !== 'store' &&
                            this.tab.toLowerCase() !== 'craftDetail')) {
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
