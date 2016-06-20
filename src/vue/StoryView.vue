<style lang="sass">
.story-view {
    padding-bottom: 114px;
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
        i {
            display: none;
        }
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

    .story-detail {
        padding: 0 32px 36px;
    }
    .description {
        padding: 0 40px 40px 32px;
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
        margin: 0 -5px;
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
        height: 80px;
        > div {
            line-height: 60px;
            -webkit-box-flex: 1;
            text-align: center;
        }
    }
}
</style>
<template>
<div class="story-view bg-white" v-if="!$loadingRouteData">
    <template v-if="cover_type === 'video'">
        <div class="cover play cover-video" @click.stop="play(cover)" v-bg="cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/600/interlace/1"></div>
    </template>
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
    </template>
    <div class="story-detail" v-if="cover_type === 'picture'">
        <div class="medias">
            <div v-for="pic in pictures" v-bg="pic" class="media" @click="coverflow(this.picFlow, $index + 1)"></div>
        </div>
    </div>
    <div class="footer flex border-top">
        <like :active="story.liked" :count="story.like"></like>
        <share class="border-left"></share>
    </div>
    <div class="separator-20"></div>
    <tags :tags="story.tags"></tags>
    <recommend :id="story.post_id"></recommend>
    <div class="separator-20"></div>
    <comments type="30" :id="story.post_id"></comment>
</div>
</template>
<script>
import Comments from './component/Comments.vue';
import Tags from './component/Tags.vue';
import Recommend from './component/Recommend.vue';
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
        Like,
        Follow,
        Share
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
            let pic = [];
            this.story.medias.forEach((media) => {
                if (media.type === 'picture') {
                    pic.push(media.id);
                } else {
                    this.cover_type = 'video';
                    this.cover = media.id;
                    return [];
                }
            });

            if (!pic.length) {
                this.cover_type = 'video';
            } else {
                this.cover = pic[0];
                this.picFlow = pic;
            }

            return _.drop(pic);
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
                    this.updateTitle(`${story.topic_type.name}详情`);
                    this.followed = story.user.is_followed;
                    return {story};
                });
        }
    },
    methods: {
        follow() {
            if (!this.isSelf) {
                const followApi = `users/follow/${this.story.user.id}`;
                if(this.story.user.is_followed) {
                    this.$delete(followApi).then(() => {
                        this.story.user.is_followed = false;
                        this.action('toast', {
                            text: '已取消关注'
                        });
                    });
                } else {
                    this.$post(followApi).then(() => {
                        this.story.user.is_followed = true;
                        this.action('toast', {
                            text: '已关注',
                            success: '1'
                        });
                    });
                }
            }
        }
    }
}
</script>
