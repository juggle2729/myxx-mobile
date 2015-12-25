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
        margin: 30px 0 24px;
    }
    .video {
        height: 500px;
    }
    .social {
        padding: 0 32px;
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
        <div class="separator"></div>
        <div class="item" v-link="{name: 'story', params: {id: item.post_id}}">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="{name: item.user.role=='3' ? 'user-site' : 'user-profile', params: {id: item.user.id}}" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 gray">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.content}}</div>
            </div>
            <div class="medias">
                <div class="unique" v-if="item.medias.length===1" v-bg.lg="item.medias[0].id"></div>
                <template v-else>
                    <template v-for="media in item.medias"
                        ><div class="media" @click.stop="coverflow(item, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div
                        ><div class="media play" v-if="media.type==='video'" v-bg.video="media.id"></div
                    ></template>
                </template>
            </div>
        </div>
        <social-bar :id="item.post_id" type="30" :active="item.liked" :total="item.like" :list="item.likes" class="border-top social bg-white">
            <div class="center border-left gray extra-action">
                <i class="icon-comment"></i><span>{{item.comment}}</span>
            </div>
        </social-bar>
    </template>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
export default {
    name: 'EvaluationList',
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
        }
    }
}
</script>
