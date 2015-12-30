/**
 * Created by chunzujun on 12/26/15.
 */
<template>
    <div class="master-tabs bg-white border-top">
        <div class="master-tab font-22 gray" v-for="tab in tabs"
             :class="{'red': currentTab === tab.linkName}" v-link="{name: tab.linkName, params: {id: masterInfo.id}, query: {title: pageTitle}}">
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
                default: 'master-home'
            }
        },
        data() {
            return {
                tabs: [
                    {
                        linkName: 'master-home',
                        name: '首页',
                        iconName: 'icon-m-home'
                    },
                    {
                        linkName: 'master-works',
                        name: '精品展示',
                        iconName: 'icon-m-best'
                    },
                    {
                        linkName: 'master-special',
                        name: '人物志',
                        iconName: 'icon-m-human'
                    },
                    {
                        linkName: 'master-studio',
                        name: '工作室',
                        iconName: 'icon-m-office'
                    }
                ]
            };
        },
        computed: {
            pageTitle() {
                return encodeURIComponent(this.masterInfo.name + '-官网');
            }
        }
    };
</script>
<style lang="sass">
    .master-tabs {
        position: fixed;
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
            margin-top: 12px;
        }

        .tab-icon {
            padding-right: 0;
        }
    }
</style>
