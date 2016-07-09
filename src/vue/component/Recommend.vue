<style lang="sass">
@import '~style/partials/var';
.recommend-component {
    .title {
        color: #979797;
        line-height: 80px;
        text-align: left;
        margin-left: 32px;
    }

    .like-component, .comment-component {
        color: #d8d8d8;
    }

    .data-list {
        padding:0 20px;
        font-size: 0;
    }

    .data-item {
        width: 345px;
        display: inline-block;
        margin-bottom: 20px;

        &:nth-child(odd) {
            margin-right: 20px;
        }
    }

    .data-img {
        width: 100%;
        height: 300px;
        background-size: cover;
    }

    .data-info {
        position: relative;
        width: 345px;
        height: 100px;
        text-align: center;
        margin: 0 auto;
        .data-name {
            width: 320px;
            word-break: break-all;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            line-height: 1.5;
        }
    }

    .data-title {
        background: rgba(0, 0, 0, 0.5);
        padding: 0 28px;
        display: inline-block;
        line-height: 44px;
    }

    .data-footer {
        height: 48px;
        padding-bottom: 20px;
        >div {
            -webkit-box-flex: 1;
            &:first-child {
                text-align: right;
                margin-right: 24px;
            }
            &:last-child {
                margin-left: 24px;
                text-align: left;
            }
            &:first-child:nth-last-child(1) {
                text-align: center;
            }
        }
    }
}
</style>
<template>
    <div class="recommend-component bg-default" v-if="items.length">
        <div class="title font-22">相关推荐</div>
        <div class="data-list">
            <div class="data-item bg-white border-default" @click="goTo(data)" v-for="data in items">
                <div v-if="data.item.first_picture || data.item.picture || data.item.cover_type==='picture'" class="data-img" v-bg.md="data.item.first_picture || data.item.picture || data.item.cover">
                    <div class="data-title font-22 center white" v-text="recommendTitle(data)"></div>
                </div>
                <div v-else class="data-img" v-bg.video="data.item.video || data.item.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/300/h/300">
                    <div class="data-title font-22 center white" v-text="recommendTitle(data)"></div>
                </div>
                <div class="data-info">
                    <div class="data-name font-26">{{(data.item.title || data.item.description || data.item.content) | truncate 20}}</div>
                </div>
                <div class="data-footer flex">
                    <like :active="false" :count="data.item.like" mode="readonly" v-if="data.biz_type === 'tp'"></like>
                    <comment :count="data.item.comment"></comment>
                </div>
            </div>
            <partial name="load-more" v-if="items.hasMore"></partial>
        </div>
    </div>
</template>
<script>
import paging from 'paging';
import Like from './Like.vue';
import Comment from './Comment.vue';
export default {
    name: 'Recommend',
    mixins: [paging],
    components: [
        Like,
        Comment
    ],
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
    computed: {
        biz_type() {
            let type = '';
            switch (this.$route.name) {
                case 'jade':
                    type = 'pd';
                    break;
                case 'story':
                    type = 'tp';
                    break;
                case 'evaluation':
                    type = 'jb';
                    break;
            }
            return type;
        },
        paging() {
            return {
                path: 'dc/rd/list',
                list: 'entries',
                params: {
                    obj_id: this.id || this.$route.params.id,
                    biz_type: this.biz_type,
                    limit: 8
                }
            }
        }
    },
    ready() {
        this.fetch();
    },
    methods: {
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
