<style lang="sass">
.story-view {
    padding-bottom: 114px;
    min-height:100%;
    .story-header {
        padding: 32px 32px;
    }
    .header {
      position: relative;
    }
    .user {
        display: -webkit-box;
        -webkit-box-align: center;
        float: left;
        .name {
            margin-left: 20px;
        }
    }
    .follow-cnt {
        position: absolute;
        top: 50%;
        right: 0;
        width: 122px;
        height: 62px;
        line-height: 60px;
        font-size: 26px;
        text-align: center;
        border: 1px solid #cc3f4f;
        border-radius: 12px;
        transform: translateY(-50%);
        &.followed {
            color: #888888;
            border-color: #eeeeee;
            background: #eeeeee;
        }
        .cnt-text {
            color: #696969;
            .icon {
                color: #cc3f4f;
                padding-right: 0;
            }
        }
    }
    .cover {
        width: 686px;
        height: 686px;
        margin: 0 32px 10px;
        &.cover-video {
            width: 100%;
            margin: 0;
        }
    }

    .play::after {
        background-size: 144px;
    }
    .store-detail {
        padding: 0 32px 36px;
    }
    .description {
        padding: 0 40px 40px 32px;
        .user-input {
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

    .opration {
        width: 100%;
        height: 96px;
        >div {
            height: 48px;
            width: 50%;
            line-height: 48px;
            margin-top: 24px;
            text-align: center;
            float: left;
            color: #888888;

            &.liked {
                >span {
                     color: #cc3f4f;
                 }
            }
            .cnt-text {
                padding-top: 3px;
                display: inline-block;
            }
        }
        >div:first-child {
             background-image: linear-gradient(270deg, #efefef 51%, transparent 51%);
             background-position: right center;
             background-repeat: no-repeat;
             background-size: 1px 100%;
             padding-right: 1px;
         }
    }

    .comments {
        padding: 24px 32px;
        .header {
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: justify;
            height: 80px;
        }
        li {
            .author {
                display: -webkit-box;
                -webkit-box-align: center;
                height: 108px;
            }
        }
    }
}
</style>
<template>
<div class="story-view bg-white" v-if="!$loadingRouteData">
    <template v-if="cover_type === 'video'">
        <div class="cover cover-video play" @click.stop="play(video)" v-bg="video" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/440/interlace/1"></div>
    </template>
    <div class="story-header">
        <div class="header clearfix">
            <div class="user">
                <avatar :user="story.user"></avatar>
                <div class="name">
                    <p class="font-30">{{story.user.name}}</p>
                    <div class="margin-top font-22 light">
                        <span>{{story.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{story.click}}人浏览</span>
                    </div>
                </div>
            </div>
            <div class="follow-cnt font-26" @click="follow()" :class="{ 'followed': followed }">
                <span class="cnt-text">
                    <span class="icon icon-follow-big font-22" v-if="!followed"></span>
                    {{followed ? '已关注' : '关注'}}
                </span>
            </div>
        </div>
    </div>
    <div class="description user-input font-30">{{story.content}}</div>
    <template v-if="cover_type === 'picture'">
        <div class="cover img" v-bg="cover"></div>
    </template>
    <div class="store-detail" v-if="cover_type === 'picture'">
        <div class="medias">
            <div v-for="pic in pictures" v-bg="pic" class="media" @click="coverflow(pictures, $index)"></div>
        </div>
    </div>
    <div class="opration border-top">
        <div class="like-cnt font-30" @click="like()" :class="{ 'liked': story.liked }">
            <span class="icon-like-solid"></span>
            <span class="cnt-text">{{story.like}}</span>
        </div>
        <div class="font-30" @click="share">
            <span class="icon-share-social"></span>
            <span>分享</span>
        </div>
    </div>
    <div class="separator-20"></div>
    <tags :tags="story.tags"></tags>
    <recommend :id="story.post_id"></recommend>
    <comment type="30" :id="story.post_id"></comment>
</div>
</template>
<script>
import Comment from './Comment.vue';
import Avatar from './Avatar.vue';
import Tags from './Tags.vue';
import Recommend from './Recommend.vue';
import shareable from 'shareable';
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
        Comment,
        Avatar,
        Tags,
        Recommend
    },
    data() {
        return {
            story: {},
            followed: false,
            cover_type: 'picture',
            cover: ''
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
                    return [];
                }
            });

            if (!pic.length) {
                this.cover_type = 'video';
            } else {
                this.cover = pic[0];
                pic = _.drop(pic);
            }

            return pic;
        },
        video() {
            let resource;
            this.story.medias.forEach((media) => {
                if (media.type === 'video') {
                    this.cover_type = 'video';
                    resource = media.id;
                } else {
                    this.cover_type = 'picture';
                }
            });
            return resource;
        }
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}|v4`)
                .then((story) => {
                    this.setShareData(story, true);
                    this.updateTitle(story.topic_type.name + '详情');
                    this.followed = story.user.is_followed;
                    return {story};
                });
        }
    },
    methods: {
        like() {
            const likeApi = `users/target/${this.story.post_id}/type/30/like`;
            if (this.story.liked) {
                this.$delete(likeApi).then(() => {
                    this.story.liked = false;
                    this.story.like -= 1;
                });
            } else {
                this.$post(likeApi).then(() => {
                    this.story.liked = true;
                    this.story.like += 1;
                });
            }
        },
        follow() {
            const followApi = `users/follow/${this.story.user.id}`;
            if(this.followed) {
                this.$delete(followApi).then(() => {
                    this.followed = false;
                    this.toast('已取消关注');
                });
            } else {
                this.$post(followApi).then(() => {
                    this.followed = true;
                    this.toast('已关注');
                });
            }
        }
    }
}
</script>
