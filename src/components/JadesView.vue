<template>
    <div class="jades-view bg-default">
        <div class="content">
            <template v-for="promote in promotes" track-by="$index">
                <div class="outside">
                    <div class="cell bg-white" v-link="{name: 'jade', params:{ id: promote.id}}">
                        <div class="image" v-bg.sm="promote.imgs[0]">
                        </div>
                        <div class="txt">
                            <p class="font-30">{{promote.name}}</p>
                            <p class="font-22 gray">{{promote.reward}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <partial name="load-more" v-show="hasMore"></partial>
    </div>
</template>
<script>
import emitter from '../utils/emitter';
export default {
    name: 'JadesView',
    data() {
        return {
            promotes: [],
            hasMore: true
        };
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    events: {
        scrollToBottom(e) {
            return this.fetch();
        }
    },
    methods: {
        fetch: (function() {
            const offset = this.promotes.length;
            const limit = 10;
            let loading = true;
            if(loading){
                loading = false;
                this.$get('mall/products', {offset, limit})
                .then((data) => {
                    data.products.forEach((promote) => {
                            promote.reward = '';
                            promote.product_rewards.forEach((item) => {
                                promote.reward += '#' + item.reward.name;
                            });
                            this.promotes.push(promote);
                    });
                    loading = true;
                    if(data.products.length < limit || offset + limit >= data.total){
                        loading = false;
                        this.hasMore = false;
                    }
                });
            }
        })()
    }
}
</script>
<style lang="sass">
.jades-view {
    height: 100%;
    .content {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: space-between;
        .outside {
            float: left;
            width: 50%;
            padding: 10px;
            .cell {
                border-radius: 8px;
                .image {
                    border-radius: 8px 8px 0 0;
                    height: 0;
                    width: 100%;
                    padding-bottom: 77%;
                    background-image: url('#{$qn}/artist/treasure.jpg');
                    background-size: cover;
                }
                .txt {
                    padding: 24px 0 24px 20px;
                    >p:nth-of-type(1) {
                        margin-bottom: 16px;
                    }
                }
            }
        }
    }
}
</style>
