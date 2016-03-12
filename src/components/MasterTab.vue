/**
 * Created by chunzujun on 12/26/15.
 */
<template>
    <div class="master-tabs bg-white border-top">
        <div class="master-tab font-22 gray" v-for="tab in tabs"
             :class="{'red': isActive(tab)}" v-link="link(tab.linkName)">
            <div class="tab-icon {{tab.iconName}}"></div>
            <div class="tab-name">{{tab.name}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MasterTab',
        props: {
            masterInfo: {
                type: Object,
                default: {}
            },
            currentTab: {
                type: String,
                default: 'home'
            }
        },
        computed: {
            pageTitle() {
                return encodeURIComponent(this.masterInfo.name + '-官网');
            },
            tabs() {
                const tabs = [
                    {
                        linkName: 'home',
                        name: '首页',
                        iconName: 'icon-u-home'
                    },
                    {
                        linkName: 'works',
                        name: '精品展示',
                        iconName: 'icon-u-best'
                    },
                    {
                        linkName: 'special',
                        name: '人物志',
                        iconName: 'icon-u-human'
                    },
                    {
                        linkName: 'studio',
                        name: '工作室',
                        iconName: 'icon-u-office'
                    }
                ];

                tabs.forEach((tab) => {
                    if (tab.linkName === this.currentTab) {
                        tab.iconName = tab.iconName.replace('-u-', '-m-');
                    } else {
                        tab.iconName = tab.iconName.replace('-m-', '-u-');
                    }
                });

                return tabs;
            }
        },
        methods: {
            isActive(tab) {
                return this.currentTab === tab.linkName;
            },
            link(tab) {
                const linkObj = {
                    name: 'master',
                    params: { id: this.masterInfo.id },
                    query: _.merge({}, this.$route.query, {
                        tab: tab
                    })
                };

                return linkObj;
            }
        }
    };
</script>
<style lang="sass">
    .master-tabs {
        position: fixed;
        z-index: 999;
        left: 0;
        bottom: 0;
        width: 100%;
        line-height: 100px;

        .master-tab {
            text-align: center;
            display: inline-block;
            width: 25%;
        }

        .tab-name {
            line-height: 10px;
            margin-top: 14px;
        }

        .tab-icon {
            font-size: 36px;
            padding-right: 0;
        }
    }
</style>
