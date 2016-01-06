<style lang="sass">
.evaluation-list {
    .item {
        padding: 24px 32px 0 32px;
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
        line-height: 1.2em;
    }
    .video {
        height: 528px;
        background-size: cover;
        background-position: center;
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
        .mark {
            padding: 5px 0 5px 35px;
            background-image: url('http://7xp1h7.com2.z0.glb.qiniucdn.com/ico_identify.png');
            background-position: left center;
            background-size: 26px;
        }
    }
    .sep {
        height: 24px;
    }
}
</style>
<template>
<div class="evaluation-list bg-white">
    <template v-for="item in items">
        <div class="separator"></div>
        <div class="item" v-link="{name: 'evaluation', params: {id: item.post_id}}">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="item.user | profile" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 light">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.description}}</div>
            </div>
            <div class="video" v-bg="item.picture"></div>
            <div v-for="result in item.results" class="result border-top">
                <div class="avatar" v-bg.sm="result.identifier.photo" v-link="result.identifier | profile"></div>
                <div class="master">
                    <p class="name font-26">{{result.identifier.name}}</p>
                    <p class="title font-22 gray">{{result.identifier.title}}</p>
                </div>
                <div class="mark font-22">已鉴定</div>
            </div>
            <div v-if="item.results.length === 0" class="sep"></div>
        </div>
        <social-bar :id="item.post_id" type="10" :active="item.liked" :total="item.like" :list="item.likes" class="border-top social bg-white">
            <div class="center border-left gray extra-action" v-link="{name: 'evaluation', params: {id: item.post_id}, query: {comment: 'show'}}">
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
    }
}
</script>
