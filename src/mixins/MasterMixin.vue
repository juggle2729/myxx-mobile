<script>
    import masterTab from '../components/MasterTab.vue';
    export default {
        components: { masterTab },
        data() {
            return {
                id: '',
                masterBaseData: {}
            };
        },
        route: {
            data({ to }) {
                this.id = to.params.id;

                // get data from cache
                const cacheMasterBaseInfo = JSON.parse(localStorage.getItem('masterBaseData'));
                if (cacheMasterBaseInfo) {
                    this.masterBaseData = cacheMasterBaseInfo;
                    this.loadMasterOtherData();
                    return;
                }

                this.fetchMasterBaseInfo();
                this.loadMasterOtherData();
            },
            canDeactivate({ to }) {
                const targetRouteName = to.name;
                if (!targetRouteName.startsWith('master')) { //clear cache
                    localStorage.removeItem('masterBaseData');
                }
                return true;
            }
        },
        methods: {
            loadMasterOtherData: function () {
                console.log('master default other data loading');
            },
            fetchMasterBaseInfo: (function() {
                let loading = false;
                return function() {
                    if(loading) {
                        return console.debug('master base info skip!!!!!!!!');
                    }
                    console.debug('fetch base info', 'master' + this.id);
                    loading = true;
                    return this.$get(`sites/${this.id}/base`, {}).then((data) => {
                        this.masterBaseData = data;
                        localStorage.setItem('masterBaseData', JSON.stringify(data));

                        loading = false;
                    });
                }
            })()
        }
    };
</script>
<style lang="sass">
    .bottom-blank {
        margin-bottom: 100px;
    }
</style>
