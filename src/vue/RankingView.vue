<style lang="sass">
    .ranking-view {
        &.placeholder {
            padding-bottom: 100px;
        }
        .banner {
            position: relative;
            line-height: 0;
            img {
                width: 100%;
                height: 250px;
            }
            .date {
                position: absolute;
                bottom: 36px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .tabs {
            height: 100px;
            padding: 0 180px;
            > div {
                height: 100%;
                line-height: 100px;
                margin: 0 59px;
                &.v-link-active {
                    color: #cc3f4f;
                    border-bottom: 5px solid #cc3f4f;
                }
            }
            &.default > div:first-child {
                color: #cc3f4f;
                border-bottom: 5px solid #cc3f4f;
            }
        }
        .items {
            > div {
                height: 150px;
                .order {
                    height: 46px;
                    line-height: 46px;
                    width: 46px;
                    border-radius: 6px;
                    margin: 0 32px;
                    padding-top: 2px;
                }
                .info {
                    margin-left: 32px;
                    .jade {
                        margin-right: 36px;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="ranking-view" :class="{'placeholder': env.isShare}">
        <div class="banner center">
            <img :src="'master/ranking.png' | qn" alt="">
            <div class="date font-26 white">最近更新：{{date}}</div>
        </div>
        <div class="tabs flex font-30 border-bottom" :class="{'default': isDefaultView}">
            <div class="flex-1 center" v-link="{name: 'ranking', params: {tab: 'weekly'}, replace: true}">周榜</div>
            <div class="flex-1 center" v-link="{name: 'ranking', params: {tab: 'all'}, replace: true}">总榜</div>
        </div>
        <div class="items">
            <div v-for="item in items" class="flex font-30 border-bottom" v-link="{name: 'user', params: {id: item.id}}">
                <div class="order bg-gray white center" :class="{'bg-red': $index < 3}">{{$index + 1}}</div>
                <avatar :user="item" :size="90"></avatar>
                <div class="info">
                    <div>{{item.name}}</div>
                    <div class="flex font-26 light margin-top">
                        <div class="jade">鉴宝数: {{item.jianbao_count}}</div>
                        <div>获赞数: {{item.like_count}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import paging from 'paging';
import shareable from 'shareable';
export default {
    name: 'RankingView',
    mixins: [paging, shareable],
    computed: {
        paging() {
            return {
                path: 'sns/jianbao/popular_masters',
                list: 'masters',
                params: {
                    type: this.$route.params.tab,
                    limit: 20
                }
            }
        },
        date() {
            return new Date(Date.now()).toLocaleDateString();
        }
    },
    route: {
        data() {
            this.setShareData(this.items, true);
            return this.fetch(true);
        }
    }
}
</script>