<style lang="sass">
.story-view {
    padding-bottom: 80px;
    .story {
        padding: 24px 32px;
    }
    .user {
        display: -webkit-box;
        -webkit-box-align: center;
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .name {
            margin-left: 20px;
            .moment {
                margin-top: 12px;
            }
        }
    }
    .desc {
        margin: 30px 0 24px;
    }
    .medias {
        .media {
            vertical-align: top;
            display: inline-block;
            width: percentage(1/3);
            padding-top: percentage(1/3);
            border: thick solid white;
            background-size: cover;
            background-position: center;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
        }
        .unique {
            width: 100%;
            padding-top: 60%;
            background-size: cover;
        }
    }
    .social {
        padding: 0 32px;
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
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
    .social {
        padding: 0 32px;
        position: fixed;
        z-index: 9;
        bottom: 0;
        width: 100%;
    }
}
</style>
<template>
<div class="story-view">
    <div class="story">
        <div class="header">
            <div class="user">
                <div class="avatar" v-link="{name: story.user.role=='3' ? 'user-site' : 'user-profile', params: {id: story.user.id}}" v-bg.sm="story.user.photo"></div>
                <div class="name">
                    <p class="font-26">{{story.user.name}}</p>
                    <p class="moment font-22 gray">{{story.create_at | moment}}</p>
                </div>
            </div>
            <div class="desc font-30"><span class="gray">#{{story.topic_type}}</span><br/>{{story.content}}</div>
        </div>
        <div class="medias">
            <div class="unique" v-if="story.medias.length===1" v-bg.lg="story.medias[0].id"></div>
            <template v-else="story.medias.length!==1">
                <template v-for="media in story.medias"
                    ><div class="media picture" @click="coverflow($index)" v-if="media.type==='picture'" v-bg.md="media.id"></div
                    ><div class="media play" v-if="media.type==='video'" v-bg.play="media.id"></div
                ></template>
            </template>
        </div>
    </div>
    <social-bar :id="story.post_id" type="30" :active="story.liked" :total="story.like" :list="story.likes" class="border-top social bg-white">
        <div class="center border-left light extra-action">
            <i class="icon-comment"></i><span>{{story.comment}}</span>
        </div>
    </social-bar>
    <div class="separator"></div>
    <comment :id="story.post_id" type="30"></comment>
    <div class="separator last"></div>
    <social-bar :id="story.post_id" type="30" :total="story.like" :list="story.likes" :active="story.liked" class="border-top social bg-white">
        <div @click="share" class="border-left center light extra-action"><i class="icon-share"></i><span>分享</span></div
    </social-bar>
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
                likes: []
            }
        };
    },
    components: {
        SocialBar,
        Comment
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}`)
                .then((story) => {
                    this.story = story;
                });
        }
    },
    methods: {
        coverflow(index) {
            let ids = this.story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            this.action('coverflow', {ids, index});
        },
        play(id) {
            this.action('play', {id});
        },
        share() {
            this.action('share', {title: '话题', desc: '话题描述', icon: this.story.medias[0].id, url: location.href});
        }
    }
}
</script>
