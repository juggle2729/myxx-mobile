<template>
<div class="masters-view bg-default">
    <template v-for="site in list">
        <div class="cell bg-white flex" v-link="{name: 'master-home', params: {id: site.item.id}, query: {replace: false}}" v-bg="site.image">
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
    <partial name="load-more" v-if="hasMore"></partial>
</div>
</template>
<script>
export default {
    name: 'MastersView',
    data() {
        return {
            list: [],
            hasMore: true
        };
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        fetch: (function() {
            let limit = 3;
            let loading = true;
            return function() {
                let offset = this.list.length;
                if(loading){
                    return this.$get('cms/promotes?section=website',{offset, limit})
                        .then((data) => {
                            loading = false;
                            data.promotes.forEach((site) =>{
                                this.list.push(site);
                            });
                            loading = true;
                            if(data.promotes.length < limit || offset + limit >= data.total){
                                loading = false;
                                this.hasMore = false;
                            }
                        });
                }
            }
        })()
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
}
</style>
