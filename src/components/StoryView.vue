<style lang="sass">
.story-view {
    padding-bottom: 80px;
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
    .like-cnt {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        color: #9f9f9f;
        &.liked {
            color: #cc3f4f;
         }
    }
    .cover {
        width: 686px;
        height: 686px;
        margin: 0 32px 10px;
    }
    .play::after {
        left: 32px;
        bottom: 30px;
        background-position: left bottom;
    }
    .store-detail {
        padding: 0 32px 36px;
    }
    .description {
        font-size: 30px;
        color: #666666;
        padding: 40px;
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
<div class="story-view" v-if="!$loadingRouteData">
    <div class="story-header">
        <div class="header clearfix">
            <div class="user">
                <avatar :user="story.user"></avatar>
                <div class="name">
                    <p class="font-26">{{story.user.name}}</p>
                    <div class="margin-top font-22 gray">
                        <span>{{story.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{story.click}}人浏览</span>
                    </div>
                </div>
            </div>
            <div v-if="!env.isShare" class="like-cnt font-30" @click="like()" :class="{ 'liked': story.liked }">
                <span class="icon-like-active"></span>
                <span class="cnt-text">{{story.like}}</span>
            </div>
        </div>
    </div>
    <div class="description user-input">{{story.content}}</div>
    <template v-if="story.cover_type === 'picture'">
        <div class="cover img" v-bg="story.cover"></div>
    </template>
    <template v-if="story.cover_type === 'video'">
        <div class="cover play" @click.stop="play(story.cover)" v-bg="story.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/440/interlace/1"></div>
    </template>
    <div class="store-detail">
        <div class="medias">
            <div v-for="pic in pictures" v-bg="pic" class="media" @click="coverflow(pictures, $index)"></div>
        </div>
    </div>
    <div class="separator-20"></div>
    <comment type="30" :id="story.post_id"></comment>
</div>
</template>
<script>
import Comment from './Comment.vue';
import Avatar from './Avatar.vue';
import shareable from 'shareable';
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
        Comment,
        Avatar
    },
    computed: {
        pictures() {
            return this.story.medias.map(media => media.id);
        }
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}|v2`)
                .then((story) => {
                    this.setShareData(story, true);
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
        }
    }
}
</script>
