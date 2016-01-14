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

                this.setPageParams(to.params);

                // get data from cache
                const cacheMastersBaseInfo = JSON.parse(localStorage.getItem('mastersBaseData'));

                const cacheMasterBaseInfo = cacheMastersBaseInfo ? cacheMastersBaseInfo[this.id] : null;
                if (cacheMasterBaseInfo) {
                    this.masterBaseData = cacheMasterBaseInfo;
                    this.checkShare();
                    return this.loadMasterOtherData();
                }

                this.loadMasterOtherData();
                return this.fetchMasterBaseInfo();
            },
            canDeactivate({ to }) {
                this.clearMasterCache(to.name);
                return true;
            },
            activate(transition) {
                this.clearMasterCache(transition.from.name);
                transition.next();
            }
        },
        methods: {
            setPageParams() {
                return console.log('master default set page parameters');
            },
            preventDefaultShare() {
                return false;
            },
            checkShare() {
                const isPrevent = this.preventDefaultShare();
                if (!isPrevent) {
                    this.setShare();
                }
            },
            setShare() {
                const [title, desc, icon] = [
                    this.masterBaseData.name + '的官网，快来一睹大师风采',
                    this.masterBaseData.name + (this.masterBaseData.titles.length > 0 ? ' ' + this.masterBaseData.titles[0].name : ''),
                    this.masterBaseData.photo
                ];

                let curUrl = location.href;
                this.action('shareable', {title, desc, icon, url: curUrl });
            },
            clearMasterCache(targetRouteName) {
                if (targetRouteName && !/^master-/i.test(targetRouteName)) { //clear cache
                    let cacheMastersBaseInfo = JSON.parse(localStorage.getItem('mastersBaseData'));
                    if (!cacheMastersBaseInfo) {
                        cacheMastersBaseInfo = {};
                    } else {
                        cacheMastersBaseInfo[this.id] && (delete cacheMastersBaseInfo[this.id]);
                    }

                    localStorage.setItem('mastersBaseData', JSON.stringify(cacheMastersBaseInfo));
                }
            },
            loadMasterOtherData() {
                return console.log('master default other data loading');
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
                        this.checkShare();

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
@import '../styles/partials/var';
.bottom-blank {
    margin-bottom: 100px;
}

.block-title {
    line-height: 80px;
    padding-left: 32px;
    .title {
       margin-left: 16px;
    }
}

.line-yellow {
    width: 3px;
    height: 25px;
    display: inline-block;
    background-color: #f3ac1c;
    vertical-align: -4px;
    padding-right: 0;
}

.line-title {
    line-height: 66px;
    text-align: center;
    .line {
        @extend .line-yellow;
    }
    .text {
        padding: 0 12px;
    }
}

.expand {
    .arrow {
        background: url("#{$qn}/icon/arrow-down.svg") no-repeat;
        background-size: cover;
        display: inline-block;
        width: 24px;
        height: 24px;

        margin-left: 28px;
        margin-right: -20px;
        vertical-align: bottom;
    }

    .arrow-up {
        transform: rotateX(180deg);
    }

    .line {
        width: 253px;
    }

    .text {
        padding-left: 12px;
        padding-right: 32px;
    }
}

.no-more {
    margin-top: 32px;
}
</style>
