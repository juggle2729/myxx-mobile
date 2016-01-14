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
        <div class="loadmore center font-22 gray" v-show="hasMore">
            <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        </div>
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
    created() {
        emitter.on('scroll-to-bottom', (e) => {
            return this.fetch();
        });
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
                    background-image: url('//7xp1h7.com2.z0.glb.qiniucdn.com/artist/treasure.jpg');
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
    .loadmore {
        height: 68px;
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
