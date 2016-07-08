<style lang="sass">
.story-view {
    .story-header {
        padding: 32px 32px;
    }
    .user {
        display: -webkit-box;
        -webkit-box-align: center;
        .name {
            margin-left: 20px;
        }
    }
    .follow-component {
        border-radius: 12px;
        background-color: #eeeeee;
        border: 1px solid #eeeeee;
        line-height: inherit;
        &.active {
            background-color: transparent;
            border: 1px solid #cc3f4f;
            i {
                color: #cc3f4f;
            }
        }
    }
    .cover {
        width: 686px;
        height: 686px;
        margin: 0 32px 5px;
        &.cover-video {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            margin: 0 auto;
            background-size: contain;
        }
    }

    .tag-activity {
        position: relative;
        margin: 40px 0 40px 32px;
        height: 68px;
        .item {
            position: absolute;
            padding: .5em .8em;
            border-radius: 26px;
            background-color: #ffecea;
            .icon-activity {
                transform: scale(1.2);
            }
        }
    }

    .description {
        margin: 0 40px 40px 32px;
        &.user-input {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            line-height: 1.5;
        }
    }
    .medias {
        font-size: 0;
        padding: 0 28px;
        &.padding-bottom {
            padding-bottom: 28px;
        }
    }
    .media {
        display: inline-block;
        border: 5px solid white;
        background-size: cover;
    }
    .media:first-child:nth-last-child(1) {
        width: 100%;
        padding-top: 100%;
    }
    .media:first-child:nth-last-child(2),
    .media:first-child:nth-last-child(2) ~ .media,
    .media:first-child:nth-last-child(4),
    .media:first-child:nth-last-child(4) ~ .media {
        width: 50%;
        padding-top: 50%;
    }
    .media:first-child:nth-last-child(3),
    .media:first-child:nth-last-child(3) ~ .media,
    .media:first-child:nth-last-child(5),
    .media:first-child:nth-last-child(5) ~ .media,
    .media:first-child:nth-last-child(6),
    .media:first-child:nth-last-child(6) ~ .media {
        width: 33.3333%;
        padding-top: 33.3333%;
    }

    .media:first-child:nth-last-child(5),
    .media:first-child:nth-last-child(5) ~ .media {
        &:first-child, &:nth-child(2) {
            width: 50%;
            padding-top: 50%;
        }
    }

    .footer {
        height: 98px;
        > div {
            line-height: 60px;
            -webkit-box-flex: 1;
            text-align: center;
        }
        .icon-comment-solid {
            transform: scale(1.5);
        }
    }

    .placeholder {
        height: 100px;
    }
}
</style>
<template>
<div class="story-view bg-white" v-if="!$loadingRouteData">
    <div v-if="cover_type === 'video'" class="cover video cover-video" @click.stop="play(cover)" v-bg="cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/600/interlace/1"></div>
     <div class="story-header flex">
        <div class="user flex-1">
            <avatar :user="story.user"></avatar>
            <div class="name">
                <p class="font-30">{{story.user.name}}</p>
                <div class="margin-top font-22 light">
                    <span>{{story.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{story.click}}人浏览</span>
                </div>
            </div>
        </div>
        <follow :user="story.user.id" :follow="story.user.is_followed"></follow>
    </div>
    <div class="description user-input font-30">{{story.content}}</div>
    <template v-if="cover_type === 'picture'">
        <div class="cover img" v-bg="cover" @click="coverflow(this.picFlow, 0)"></div>
        <div class="medias" :class="{'padding-bottom': story.tags.length === 0 && story.topic_type.code !== 'hd'}">
            <div v-for="pic in pictures" v-bg="pic" class="media" @click="coverflow(this.picFlow, $index + 1)"></div>
        </div>
    </template>
    <template v-if="story.topic_type.code === 'hd'">
        <div class="tag-activity red font-30" v-link="{name: 'activity', params: {id: story.activity.id}}">
            <div class="item"><span class="icon-activity"></span><span>{{story.activity.name}}</span></div>
        </div>
    </template>
    <template v-else>
        <tags :tags="story.tags"></tags>
    </template>
    <div v-if="env.isShare" class="footer flex font-30 gray border-top">
        <like :active="story.liked" :count="story.like"></like>
        <div class="comment border-left" @click="$refs.comment.comment()">
            <i class="icon-comment-solid"></i><span>写评论</span>
        </div>
        <share class="border-left"></share>
    </div>
    <div class="separator-20"></div>
    <comments type="30" :id="story.post_id" :display-input="false" v-ref:comment></comments>
    <product-recommend :id="story.post_id"></product-recommend>
    <recommend :id="story.post_id"></recommend>
    <div v-if="!env.isShare" class="footer flex font-30 gray">
        <like :active="story.liked" :count="story.like"></like>
        <div class="comment border-left" @click="$refs.comment.comment()">
            <i class="icon-comment-solid"></i><span>写评论</span>
        </div>
        <share class="border-left"></share>
    </div>
    <div class="placeholder" v-if="env.isShare"></div> 
</div>
</template>
<script>
import Comments from './component/Comments.vue';
import Tags from './component/Tags.vue';
import Recommend from './component/Recommend.vue';
import ProductRecommend from './component/ProductRecommend.vue';
import Like from './component/Like.vue';
import Follow from './component/Follow.vue';
import Share from './component/Share.vue';
import shareable from 'shareable';
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
        Comments,
        Tags,
        Recommend,
        ProductRecommend,
        Like,
        Follow,
        Share
    },
    ready() {
        this.$on('restore', () => {
            this.action('updateTitle', {text: `${this.story.topic_type.name}详情`});
        });
    },
    data() {
        return {
            story: {
                medias: []
            },
            cover_type: 'picture',
            cover: '',
            picFlow: []
        }
    },
    computed: {
        pictures() {
            const videoObj = _.find(this.story.medias, (media) => { return media.type === 'video'});
            if (videoObj) {
                this.cover_type = 'video';
                this.cover = videoObj.id;
                return [];
            } else {
                let pic = _.map(
                    _.filter(this.story.medias, (media) => {
                        return media.type === 'picture';
                    }), _.iteratee('id')
                );
                this.cover_type = 'picture';
                this.cover = pic[0];
                this.picFlow = pic;
                return _.drop(pic);
            }

        },
        isSelf() {
            if (this.self) {
                return this.self.id === this.story.user.id;
            } else {
                return false;
            }
        }
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}|v4`)
                .then((story) => {
                    this.setShareData(story, true);
                    this.action('updateTitle', {text: `${story.topic_type.name}详情`});
                    this.followed = story.user.is_followed;
                    this.story = story;
                });
        }
    }
}
</script>
