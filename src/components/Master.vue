<style lang="sass">
    .fade-transition {
        transition: opacity .1s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
<template>
    <component :is="currentView" :id="userId" :data="masterBaseData" :params="params" transition="fade"
               transition-mode="out-in"></component>
</template>
<script>
    import MasterVipBlackSpecial from './vips/black_new/MasterSpecialView.vue';
    export default{
        data(){
            return {
                currentView: '',
                userId: '',
                masterBaseData: {},
                params: {},
                vipTemplates: {
                    1: 'Black'
                },
                isVip: false
            }
        },
        components: {
            MasterVipBlackSpecial
        },
        route: {
            data(transition) {
                this.userId = transition.to.params.id;
                return this.fetchMasterBaseInfo();
            }
        },
        methods: {
            fetchMasterBaseInfo() {
                return this.$get(`sites/${this.userId}/base`, {}).then(data => {
                    this.masterBaseData = data;
                    this.currentView = 'MasterVipBlackSpecial';
                });
            }
        }
    }
</script>
