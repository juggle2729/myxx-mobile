<template>
    <div class="treasure bg-default">
        <div class="content">
            <template v-for="promote in promotes" track-by="$index">
                <div class="outside">
                    <div class="cell bg-white" v-link="{name: 'jade', params:{ id: promote.id}}">
                        <div class="image" v-bg="promote.imgs[0]">
                        </div>
                        <div class="txt">
                            <p class="font-30">{{promote.name}}</p>
                            <p class="font-22 gray" style="margin-top: 16px;">{{promote.reward}}</p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="loadmore center font-22 gray">
            <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
            <span v-show="!hasMore" class="center-vertical">没有了</span>
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
                hasMore: true,
                loading: true
            };
        },
        route: {
            data() {
                this.fetch();
            }
        },
        created() {
            emitter.on('scroll-to-bottom', (e) => {
                return this.fetch();
            });
        },
        methods: {
            fetch() {
                const offset = this.promotes.length;
                const limit = 10;
                if(this.loading){
                    this.loading = false;
                    this.$http
                    .get('mall/products', {offset, limit})
                    .success((res) => {
                        res.data.products.forEach((promote) => {
                                promote.reward = '';
                                promote.product_rewards.forEach((item) => {
                                    promote.reward += '#' + item.reward.name;
                                });
                                this.promotes.push(promote);
                        });
                        this.loading = true;
                        if(res.data.products.length < limit || res.data.total === this.promotes.length){
                            this.loading = false;
                            this.hasMore = false;
                        }
                    });
                }
            }
        }
    }
</script>
<style lang="sass">
    .treasure {
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
                        background-image: url('/static/images/artist/treasure.jpg');
                        background-size: cover;
                    }
                    .txt {
                        padding: 24px 0 24px 20px;
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
