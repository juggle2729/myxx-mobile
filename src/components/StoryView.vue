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
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
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
        width: 750px;
        height: 750px;
    }
    .play::after {
        left: 32px;
        bottom: 30px;
        background-position: left bottom;
    }
    .store-detail {
        padding: 0 32px 36px;
        .content {
            font-size: 30px;
            color: #666666;
            text-align: center;
            margin: 0 auto;
            padding: 60px 0;
            width: 480px;
            line-height: 42px;
            font-family: 'song-simple';
        }
    }
    .medias {
        .first-row, .second-row {
            display: -webkit-box;
        }

        .media {
            -webkit-box-flex: 1;
        }

        .third {
            width: percentage(1/3);
            padding-top: 33.3333%;
            padding-top: -webkit-calc(33.3333% - 10px);
        }

        .half {
            width: percentage(1/2);
            padding-top: 50%;
            padding-top: -webkit-calc(50% - 10px);
        }

        .full {
            width: 100%;
            padding-top: 100%;
            padding-top: -webkit-calc(100% - 10px);
        }

        .media:not(:first-child) {
            margin-left: 10px;
        }

        .second-row {
            margin-top: 10px;
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
    .fake-input {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
        }
        .submit {
            line-height: 72px;
            margin-left: 16px;
            width: 140px;
            height: 72px;
            color: white;
            background-color: #b2b2b2;
            border-radius: 8px;
        }
    }
}
</style>
<template>
<div class="story-view bg-default">
    <div class="story-header bg-white">
        <div class="header clearfix">
            <div class="user">
                <div class="avatar" v-link="story.user | profile" v-bg.sm="story.user.photo"></div>
                <div class="name">
                    <p class="font-26">{{story.user.name}}</p>
                    <div class="margin-top font-22 gray">
                        <span>{{story.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{story.click}}人浏览</span>
                    </div>
                </div>
            </div>
            <div class="like-cnt font-30" @click="like()" :class="{ 'liked': story.liked }">
                <span class="icon-like-active"></span>
                <span class="cnt-text">{{story.like}}</span>
            </div>
        </div>
    </div>
    <template v-if="story.cover_type === 'picture'">
        <div class="cover img" v-bg="story.cover"></div>
    </template>
    <template v-if="story.cover_type === 'video'">
        <div class="cover play" @click.stop="play(story.cover)" v-bg="story.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/440/interlace/1"></div>
    </template>
    <div class="store-detail bg-white">
        <div class="content" v-if="story.content">{{story.content}}</div>
        <div class="medias">
            <div class="first-row" v-if="firstRowMedias.length">
                <template v-for="media in firstRowMedias">
                    <div class="media img {{firstRowClass}}" @click="coverflow($index)" v-bg="media.id" query="imageView2/1/w/343/h/343/interlace/1"></div>
                </template>
            </div>
            <div class="second-row" v-if="twoRowMedias.length">
                <template v-for="media in twoRowMedias">
                    <div class="media img {{twoRowClass}}" @click="coverflow(firstRowMedias.length + $index)" v-bg="media.id" query="imageView2/1/w/343/h/343/interlace/1"></div>
                </template>
            </div>
        </div>
    </div>
    <div class="separator-20"></div>
    <comment type="30" :id="story.post_id" has-input="true"></comment>
    <div class="fake-input font-30 flex" @click="$broadcast('comment', $event)" >
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
    </div>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
import Comment from './Comment.vue';
export default {
    name: 'StoryView',
    data() {
        return {
            story: {
                user: {},
                medias: [],
                likes: [],
                post_id: ''
            }
        };
    },
    components: {
        SocialBar,
        Comment
    },
    computed: {
        firstRowClass() {
            const mediasLen = this.story.medias.length;
            if (mediasLen === 1) {
                return 'full';
            } else if (mediasLen === 2 || mediasLen === 4 || mediasLen === 5) {
                return 'half';
            } else if (mediasLen === 3 || mediasLen === 6) {
                return 'third';
            }
            return '';
        },
        twoRowClass() {
            const mediasLen = this.story.medias.length;
            if (mediasLen === 4) {
                return 'half';
            } else if (mediasLen === 5 || mediasLen === 6) {
                return 'third';
            }
            return '';
        },
        firstRowMedias() {
            let [mediasLen, truncateEnd] = [this.story.medias.length, 3];
            if (mediasLen === 4 || mediasLen === 5) {
                truncateEnd = 2;
            }

            return this.story.medias.slice(0, truncateEnd)
                .filter(media => media.type === 'picture');
        },
        twoRowMedias() {
            let [mediasLen, truncateStart] = [this.story.medias.length, 3];
            if (mediasLen === 4 || mediasLen === 5) {
                truncateStart = 2;
            }

            return this.story.medias.slice(truncateStart, this.story.medias.length)
                .filter(media => media.type === 'picture');
        }
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}|v2`)
                .then((story) => {
                    this.setShareData('topic', story, true);
                    return {story};
                });
        }
    },
    methods: {
        xxx($event) {
            this.$broadcast('comment', $event);
        },
        coverflow(index) {
            let ids = this.story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            this.action('coverflow', {ids, index});
        },
        play(id) {
            this.action('play', {id});
            if(!this.isApp) { // 分享页面，视频自动播放
                var timer = setInterval(() => {
                    var v = document.querySelector('video');
                    if(v) {
                        clearInterval(timer);
                        v.play();
                    }
                }, 10);
            }
        },
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
