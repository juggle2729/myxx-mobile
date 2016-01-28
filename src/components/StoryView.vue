<style lang="sass">
.story-view {
    padding-bottom: 80px;
    min-height:100%;
    .story {
        padding: 32px 32px;
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
        > p:nth-of-type(2){
            margin-top: 16px;
            line-height: 46px;
            line-height: 1.5em;
        }
    }
    .medias {
        .media {
            vertical-align: top;
            display: inline-block;
            width: percentage(1/3);
            padding-top: -webkit-calc(33.3333% - 10px);
            border: 5px solid white;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
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
    .social {
        position: fixed;
        z-index: 9;
        bottom: 0;
        width: 100%;
    }
}
</style>
<template>
<div class="story-view bg-default">
    <div class="story bg-white">
        <div class="header">
            <div class="user">
                <div class="avatar" v-link="story.user | profile" v-bg.sm="story.user.photo"></div>
                <div class="name">
                    <p class="font-26">{{story.user.name}}</p>
                    <div class="margin-top font-22 gray">
                        <span>{{story.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{story.click}}人浏览</span>
                    </div>
                </div>
            </div>
            <div class="desc font-30"><p class="gray">#{{story.topic_type}}</p><p>{{story.content}}</p></div>
        </div>
        <div class="medias">
            <div v-if="unique">
                <img class="img" @click="coverflow(0)" :src="config.img + story.medias[0].id + '?imageView2/0/w/343/h/343/interlace/1'">
            </div>
            <template v-else>
                <template v-for="media in story.medias"
                    ><div class="media img" @click="coverflow($index)" v-if="media.type==='picture'" v-bg.md="media.id"></div
                    ><div class="media play" @click="play(media.id)" v-if="media.type==='video'" v-bg.video="media.id"></div
                ></template>
            </template>
        </div>
    </div>
    <div class="separator-20"></div>
    <comment :id="story.post_id" type="30"></comment>
    <social-bar :id="story.post_id" type="30" :total="story.like" :list="story.likes" :active="story.liked" class="border-top social bg-white">
        <div @click="share" class="border-left center gray extra-action"><i class="icon-share"></i><span>分享</span></div>
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
                likes: [],
            }
        };
    },
    components: {
        SocialBar,
        Comment
    },
    computed: {
        unique() {
            let medias = this.story.medias;
            return medias.length === 1 && medias[0].type==='picture';
        }
    },
    route: {
        data({to}) {
            const storyId = to.params.id;
            return this.$get(`sns/topics/${storyId}`)
                .then((story) => ({story}));
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
            let title = '分享[美玉秀秀]话题！';
            if(this.story.topic_type === '晒宝') {
                title = '快来帮我看看这个宝贝怎么样！';
            } else if(this.story.topic_type === '工艺展示') {
                title = '快来围观这个精湛的工艺！';
            } else if(this.story.topic_type === '淘玉故事') {
                title = '好玉原来是这么淘来的！';
            }
            let desc = this.story.content;
            let icon = this.story.medias[0].id;
            if(this.story.medias[0].type === 'video') {
                icon = this.config.video + icon + '?vframe/jpg/offset/0/rotate/auto|imageView2/1/w/100';
            }
            let url = location.origin + location.pathname;
            let query = _.merge({}, this.$route.query, {
                id: this.story.post_id,
                type: 'topic'
            });
            url += ('?' + Object.keys(query).map((k) => `${k}=${query[k]}`).join('&'));
            this.action('share', {title, desc, icon, url});
        }
    }
}
</script>
