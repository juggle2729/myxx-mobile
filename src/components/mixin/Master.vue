<script>
    import masterTab from '../MasterTab.vue';
    export default {
        components: { masterTab },
        data() {
            return {
                masterBaseData: this.data
            };
        },
        props: {
            id: {
                type: String,
                required: true
            },
            data: {
                type: Object,
                required: true
            },
            params: {
                type: Object,
                required: true,
                default: {}
            }
        },
        methods: {
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
            }
        }
    };
</script>
<style lang="sass">
@import '../../styles/partials/var';
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
