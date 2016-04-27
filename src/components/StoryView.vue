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
}
</style>
<template>
<div class="story-view" v-if="!$loadingRouteData">
    <div class="story-header">
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
            <div v-if="!env.isShare" class="like-cnt font-30" @click="like()" :class="{ 'liked': story.liked }">
                <span class="icon-like-active"></span>
                <span class="cnt-text">{{story.like}}</span>
            </div>
        </div>
    </div>
    <div class="description user-input">{{story.content}}</div>
    <template v-if="story.cover_type === 'picture'">
        <div class="cover img" v-bg="story.cover" @click="coverflow(-1)"></div>
    </template>
    <template v-if="story.cover_type === 'video'">
        <div class="cover play" @click.stop="play(story.cover)" v-bg="story.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/440/interlace/1"></div>
    </template>
    <div class="store-detail">
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
    <comment type="30" :id="story.post_id"></comment>
</div>
</template>
<script>
import Comment from './Comment.vue';
import shareable from 'shareable';
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
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
                    this.setShareData(story, true);
                    return {story};
                });
        }
    },
    methods: {
        coverflow(index) {
            let ids = this.story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            if(this.story.cover_type === 'picture') {
                index += 1;
                ids.splice(0, 0, this.story.cover);
            } 
            this.action('coverflow', {ids, index});
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
