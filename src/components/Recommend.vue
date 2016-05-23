<style lang="sass">
    @import '../styles/partials/_var.scss';
    @import '../styles/partials/_mixin.scss';
    .recommend {
        .title {
            color: #979797;
            line-height: 78px;
            text-align: left;
            margin-left: 32px;
        }

        .data-list {
            padding:0 32px 32px;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            display: -webkit-box;
        }

        .data-item {
            width: 300px;
            -wekit-box-flex: 1;
        }

        .data-item:not(:first-child) {
            margin-left: 20px;
        }

        .data-item:last-child {
            width: 1px;
        }

        .data-img {
            width: 100%;
            height: 300px;
            background-size: cover;
        }

        .data-name {
            font-size: 24px;
            padding: 17px 18px 20px;
            line-height: 36px;
            color: #393939;
            white-space: normal;
            text-align: center;
        }

        .jb .data-name{
            height: 115px;
            text-align: left;
        }

        .data-title {
            font-size: 20px;
            text-align: center;
            color: #fff;
            background: rgba(0, 0, 0, 0.6);
            width: 100px;
            line-height: 44px;
        }

        .data-price {
            text-align: center;
            font-size: 20px;
            color: #cc3f4f;
            padding-bottom: 22px;
        }
    }
</style>
<template>
    <div class="recommend" v-if="recommendData.length">
        <div class="title font-22">相关推荐</div>
        <div class="data-list">
            <div class="data-item border-all" @click="goTo(data)" v-for="data in recommendData">
                <div v-if="data.item.first_picture || data.item.picture" class="data-img" v-bg.md="data.item.first_picture || data.item.picture">
                    <div class="data-title" v-text="recommendTitle(data)"></div>
                </div>
                <div v-else class="data-img" v-bg.video="data.item.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/300/h/300">
                    <div class="data-title" v-text="recommendTitle(data)"></div>
                </div>
                <div class="data-info">
                    <div class="data-name">{{(data.item.title || data.item.description) | truncate 20}}</div>
                    <div v-if="data.biz_type === config.tags.product.id" class="data-price">{{data.item.price | price}}</div>
                    <div v-if="data.item.author" class="data-user-name">{{data.item.author.name}}</div>
                </div>
            </div>
            <div class="data-item"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Recommend',
        props: {
            recommendData: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        methods: {
            recommendTitle(data) {
                for (const tagName in this.config.tags) {
                    const tag = this.config.tags[tagName];
                    if (tag.id === data.biz_type) {
                        return tag.name;
                    }
                }

                return '';
            },
            goTo(data) {
                const type = data.biz_type;
                let pathName = '';
                if (type === this.config.tags.lesson.id) {
                    pathName = 'lesson';
                } else if (type === this.config.tags.product.id) {
                    pathName = 'jade';
                } else if (type === this.config.tags.evaluation.id) {
                    pathName = 'evaluation';
                }

                this.$route.router.go({name: pathName, params: {id: data.item.id}});
            }
        }
    }
</script>