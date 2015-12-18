<template>
<div class="site bg-default">
    <template v-for="item in list">
        <div class="cell bg-white flex" v-link="{name: 'user-profile', params: {id: item.id}}" v-bg="item.background_img">
            <div class="txt">
                <p class="font-34 white">{{item.name}}</p>
                <div class="flex">
                    <p class="font-26 white">{{item.titles[0].name}}</p>
                    <p class="font-26 white">
                        <span style="margin-right:72px;">粉丝:{{item.fans_count}}</span>
                        <span>鉴宝数:{{item.jianbao_collection_count}}</span>
                    </p>
                </div>
            </div>
        </div>
    </template>
    <div class="loadmore center font-22 gray">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!hasMore" class="center-vertical">没有了</span>
    </div>
</div>
</template>
<script>
export default {
    name: 'SiteView',
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
                return this.$http
                    .get('sites',{offset, limit})
                    .success(({data}) => {
                        this.loading = false;
                        data.sites.forEach((site) =>{
                            this.list.push(site);
                        });
                        this.loading = true;
                        if(data.sites.length < limit){
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
.site {
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
            width: 100%;
            > div {
                margin-top: 28px;
                justify-content: space-between;
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
