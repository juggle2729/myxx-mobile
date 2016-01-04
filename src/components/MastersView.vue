<template>
<div class="masters-view bg-default">
    <template v-for="site in list">
        <div class="cell bg-white flex" v-link="{name: 'master-home', params: {id: site.item.id}}" v-bg="site.image">
            <div class="txt">
                <p class="font-34 white">{{site.item.name}}</p>
                <div class="flex">
                    <p class="font-26 white flex-1">{{site.item.titles.length > 0 ? site.item.titles[0].name : ''}}</p>
                    <p class="font-26 white">
                        <span>粉丝:{{site.item.fans_count}}</span>
                        <span>鉴宝数:{{site.item.jianbao_count}}</span>
                    </p>
                </div>
            </div>
        </div>
    </template>
    <div class="loadmore center font-22 gray" v-show="hasMore">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
export default {
    name: 'MastersView',
    data() {
        return {
            list: [],
            hasMore: true,
            loading: true
        };
    },
    route: {
        data() {
            this.fetch();
        }
    },
    methods: {
        fetch() {
            const offset = this.list.length;
            const limit = 3;
            if(this.loading){
                return this.$get('cms/promotes?section=website',{offset, limit})
                    .then((data) => {
                        this.loading = false;
                        data.promotes.forEach((site) =>{
                            this.list.push(site);
                        });
                        this.loading = true;
                        if(data.promotes.length < limit){
                            this.loading = false;
                            this.hasMore = false;
                        }
                    });
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
<style lang="sass">
.masters-view {
    height: 100%;
    padding: 20px;
    .cell {
        margin-bottom: 20px;
        width: 100%;
        height: 385px;
        border-radius: 8px;
        background-size: cover;
        align-items: flex-end;
        padding-bottom: 28px;
        padding-left: 44px;
        padding-right: 22px;
        .txt {
            padding-right: 22px;
            width: 100%;
            > div {
                margin-top: 28px;
                >p{
                    > span:nth-of-type(1) {
                        margin-right: 72px;
                    }
                }
            }
        }
    }
    .loadmore {
        height: 68px;
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
