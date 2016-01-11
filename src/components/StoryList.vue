<style lang="sass">
.story-list {
    .item {
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
        line-height: 44px;
        margin: 30px 0 24px;
        line-height: 1.5em;
    }
    .video {
        height: 500px;
    }
    .result {
        height: 116px;
        display: -webkit-box;
        -webkit-box-align: center;
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .master {
            -webkit-box-flex: 1;
            padding-left: 20px;
            .title {
                margin-top: 12px;
            }
        }
    }
}
</style>
<template>
<div class="story-list bg-white">
    <template v-for="item in items">
        <div :class="{'separator-20': $index !=0 , 'separator': $index === 0}"></div>
        <div class="item" v-link="{name: 'story', params: {id: item.post_id}}">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="item.user | profile" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 light">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.content}}</div>
            </div>
            <div class="medias">
                <div v-if="item.medias.length===1 && item.medias[0].type==='picture'">
                    <img :src="imgRoot + item.medias[0].id + '?imageView2/0/w/343/h/343/interlace/1'" @click.stop="coverflow(item, 0)">
                </div>
                <template v-else>
                    <template v-for="media in item.medias"
                        ><div class="media img" @click.stop="coverflow(item, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div
                        ><div class="media play" v-if="media.type==='video'" @click.stop="play(media.id)" v-bg.video="media.id"></div
                    ></template>
                </template>
            </div>
        </div>
        <social-bar :id="item.post_id" type="30" :active="item.liked" :total="item.like" :list="item.likes" class="border-top social bg-white">
            <div class="center border-left gray extra-action" v-link="{name: 'story', params: {id: item.post_id}, query: {comment: 'show'}}">
                <i class="icon-comment"></i><span>{{item.comment}}</span>
            </div>
        </social-bar>
    </template>
</div>
</template>
<script>
import config from '../config';
import SocialBar from './SocialBar.vue';
export default {
    name: 'StoryList',
    data() {
        return {
            imgRoot: config.img
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    components: {
        SocialBar
    },
    methods: {
        coverflow(story, index) {
            let ids = story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            this.action('coverflow', {ids, index});
        },
        play(id) {
            this.action('play', {id});
        }
    }
}
</script>
