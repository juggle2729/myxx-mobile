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
                const cacheMastersBaseInfo = JSON.parse(localStorage.getItem('mastersBaseData'));

                const cacheMasterBaseInfo = cacheMastersBaseInfo ? cacheMastersBaseInfo[this.id] : null;
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
                    let cacheMastersBaseInfo = JSON.parse(localStorage.getItem('mastersBaseData'));
                    if (!cacheMastersBaseInfo) {
                        cacheMastersBaseInfo = {};
                    } else {
                        cacheMastersBaseInfo[this.id] && (delete cacheMastersBaseInfo[this.id]);
                    }

                    localStorage.setItem('mastersBaseData', JSON.stringify(cacheMastersBaseInfo));
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

                        let cacheMastersBaseInfo = JSON.parse(localStorage.getItem('mastersBaseData'));
                        if (!cacheMastersBaseInfo) {
                            cacheMastersBaseInfo = {};
                        }
                        cacheMastersBaseInfo[this.id] = data;
                        localStorage.setItem('mastersBaseData', JSON.stringify(cacheMastersBaseInfo));

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

    .line-title {
        line-height: 66px;
        text-align: center;
        .line {
            margin-bottom: 7px;
            width: 40px;
            height: 1px;
            margin-top: -1px;
            border-bottom: 1px solid #c6c6c6;
            display: inline-block;
        }
        .text {
            padding: 0 12px;
        }
    }

    .no-more {
        margin-top: 32px;
    }
</style>
