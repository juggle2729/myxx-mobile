<style lang="stylus">
    .ranking-view {
        &.placeholder {
            padding-bottom: 100px
        }
        .banner {
            position: relative
            line-height: 0
            img {
                width: 100%
                height: 250px
            }
            .date {
                position: absolute
                bottom: 36px
                left: 50%
                transform: translateX(-50%)
            }
        }
        .tabs {
            height: 100px
            > div {
                line-height: 40px
                white-space: nowrap
                &.active {
                    color: #cc3f4f
                }
            }
            &.default > div:first-child {
                color: #cc3f4f
            }
        }
        .items {
            > div {
                height: 150px
                .order {
                    height: 46px
                    line-height: 46px
                    width: 46px
                    border-radius: 6px
                    margin: 0 32px
                    padding-top: 2px
                }
                .info {
                    margin-left: 32px
                    .jade {
                        margin-right: 36px
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
            <div class="date fz-26 white">最近更新：{{date}}</div>
        </div>
        <div class="tabs flex fz-30 bdb" :class="{'default': isDefaultView}">
            <div class="flex-1 center bdr" @click="go('weekly')" :class="{'active': $route.params.tab === 'weekly'}">周榜</div>
            <div class="flex-1 center" @click="go('all')" :class="{'active': $route.params.tab === 'all'}">总榜</div>
        </div>
        <div class="items">
            <div v-for="item in items" class="flex fz-30 bdb" v-link="{name: 'user', params: {id: item.id}}">
                <div class="order bg-gray white center" :class="{'bg-red': $index < 3}">{{$index + 1}}</div>
                <avatar :user="item" :size="90"></avatar>
                <div class="info">
                    <div>{{item.name}}</div>
                    <div class="flex fz-26 light margin-top">
                        <div class="jade">获赞数: {{item.like_count}}</div>
                        <div>单个鉴定获赞数: {{item.like_count_per_jianbao}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import shareable from 'shareable'
export default {
    name: 'RankingView',
    mixins: [shareable],
    data() {
        return {
            items: {},
            week: 0,
            all: 0
        }
    },
    computed: {
        date() {
            return new Date(Date.now()).toLocaleDateString()
        }
    },
    route: {
        data({to, next}) {
            if(to.params.tab === 'all' && !this.all) {
                // 获取总榜数据
                this.$get('sns/jianbao/popular_masters', {
                    type: 'all',
                    limit: 50
                }).then((data) => {
                    this.all = data.masters
                    this.items = this.all
                })
            } else if(!this.week) {
                // 获取周榜
                this.$get('sns/jianbao/popular_masters', {
                    type: 'weekly',
                    limit: 10
                }).then((data) => {
                    this.week = data.masters
                    this.items = this.week
                })
            }
            this.items = (to.params.tab === 'all') ? this.all : this.week
            this.setShareData(this.items, true)
            next()
        }
    },
    methods: {
        go(tab) { // FIXME 采用v-link替代
            (this.$route.params.tab !== tab) && this.$router.replace(`/ranking/${tab}`)
        }
    }
}
</script>