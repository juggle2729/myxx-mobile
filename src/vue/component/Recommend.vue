<style lang="sass">
@import '~style/partials/var';
.recommend-component {
    .recommend-title {
        line-height: 84px;
        margin-left: 32px;
    }

    .like-component, .comment-component {
        color: #d8d8d8;
    }

    .data-list {
        padding: 0 20px;
        font-size: 0;
    }

    .data-item {
        width: 345px;
        position: relative;
        display: inline-block;
        margin-bottom: 20px;
        &:nth-child(odd) {
            margin-right: 20px;
        }
        .media {
            width: 100%;
            height: 300px;
        }
        .data-label {
            position: absolute;
            top: 0;
            background: rgba(0, 0, 0, 0.5);
            padding: 0 28px;
            line-height: 44px;
        }
    }

    .data-info {
        position: relative;
        width: 345px;
        height: 100px;
        text-align: center;
        .data-name {
            width: 320px;
            line-height: 1.5;
            word-break: break-all;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
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
    <div class="recommend-component bg-default border-top" :class="{'padding-top': !name}" v-if="data.length > 0">
        <div class="recommend-title font-26 gray">{{name}}</div>
        <div class="data-list">
            <div class="data-item bg-white border-default" v-for="item in data">
                <div v-if="item.type === 'jb'" v-link="{name: 'evaluation', params: {id: item.entry.id}}">
                    <div class="data-label font-22 center white">求鉴宝</div>
                    <div class="media img" v-bg.md="item.entry.picture"></div>
                    <div class="data-info font-26"><div class="data-name omit-2">{{item.entry.description}}</div></div>
                </div>
                <div v-else v-link="{name: 'story', params: {id: item.entry.post_id}}">
                    <div class="data-label font-22 center white">{{item.entry.topic_type.name}}</div>
                    <div class="media img" v-bg.md="item.entry.cover"></div>
                    <div class="data-info font-26"><div class="data-name omit-2">{{item.entry.content}}</div></div>
                </div>
                <div class="data-footer flex">
                    <like :active="false" :count="item.entry.like_count" readonly=true v-if="item.type === 'tp'"></like>
                    <comment :count="item.entry.comment_count"></comment>
                </div>
            </div>
            <partial name="load-more" v-if="data.hasMore"></partial>
        </div>
    </div>
</template>
<script>
import Like from './Like.vue';
import Comment from './Comment.vue';
export default {
    name: 'Recommend',
    components: [
        Like,
        Comment
    ],
    props: {
        name: [String],
        data: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
}
</script>
