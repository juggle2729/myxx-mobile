<style lang="sass">
@import '../styles/partials/_var.scss';
.recommend-component {
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
        text-align: center;
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
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
    <div class="recommend-component bg-white" v-if="items.length">
        <div class="title font-22">相关推荐</div>
        <div class="data-list">
            <div class="data-item border-all" @click="goTo(data)" v-for="data in items">
                <div v-if="data.item.first_picture || data.item.picture || data.item.cover_type==='picture'" class="data-img" v-bg.md="data.item.first_picture || data.item.picture || data.item.cover">
                    <div class="data-title font-22" v-text="recommendTitle(data)"></div>
                </div>
                <div v-else class="data-img" v-bg.video="data.item.video || data.item.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/300/h/300">
                    <div class="data-title font-22" v-text="recommendTitle(data)"></div>
                </div>
                <div class="data-info">
                    <div class="data-name font-26">{{(data.item.title || data.item.description || data.item.content) | truncate 20}}</div>
                    <div v-if="data.biz_type === config.tags.product.id" class="data-price">{{data.item.price | price}}</div>
                    <div v-if="data.item.author" class="data-user-name">{{data.item.author.name}}</div>
                </div>
            </div>
            <div class="data-item"></div>
        </div>
        <div class="separator-20"></div>
    </div>
</template>
<script>
export default {
    name: 'Recommend',
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
            items: []
        }
    },
    ready() {
        // 潜在问题，this.id是动态获取的，ready的时候，id不一定获取到了
        this.loadData(this.id || this.$route.params.id);
    },
    methods: {
        loadData(id) {
            let params = {
                obj_id: id
            };
            // pd, jb, oc, tp
            switch(this.$route.name) {
                case 'story':
                    params.biz_type = 'tp';
                    break;
                default:
                    params.biz_type = 'pd';
                    break;
            }

            return this.$get('dc/rd|v4', params).then((data) => {
                this.items = data.recommend_data;
            });
        },
        recommendTitle(data) {

            if (data.biz_type === 'tp') {
                return data.item.topic_type.name;
            }

            const key = _.findKey(this.config.tags, (tag)=> {
                return tag.id === data.biz_type;
            });

            return this.config.tags[key].name;
        },
        goTo(data) {
            const type = data.biz_type;
            let pathName = '';
            const params = {id: data.item.id};
            if (type === this.config.tags.lesson.id) {
                pathName = 'lesson';
            } else if (type === this.config.tags.product.id) {
                pathName = 'jade';
            } else if (type === this.config.tags.evaluation.id) {
                pathName = 'evaluation';
            } else if (type === this.config.tags.topic.id) {
                pathName = 'story';
                params.id = data.item.post_id;
            }

            this.$route.router.go({name: pathName, params: params});
        }
    }
}
</script>