<style lang="sass">
.evaluation-list {
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
        .mark {
            padding: 5px 0 5px 35px;
            background-image: url('http://7xp1h7.com2.z0.glb.qiniucdn.com/ico_identify.png');
            background-position: left center;
            background-size: 26px;
        }
    }
}
</style>
<template>
<div class="evaluation-list">
    <template v-for="item in items">
        <div class="item">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="{name: item.user.role=='3' ? 'user-site' : 'user-profile', params: {id: item.user.id}}" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 gray">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30">{{item.description}}</div>
            </div>
            <div class="video" v-bg.bg="item.picture" v-link="{name: 'evaluation', params: {id: item.post_id}}"></div>
            <div v-for="result in item.results" class="result border-top">
                <div class="avatar" v-bg.sm="result.identifier.photo"></div>
                <div class="master">
                    <p class="name font-26">{{result.identifier.name}}</p>
                    <p class="title font-22 gray">{{result.identifier.title}}</p>
                </div>
                <div class="mark font-22">已鉴定</div>
            </div>
        </div>
        <favor :id="item.post_id" type="1" :active="item.liked" :total="item.like" :list="item.likes" class="border-top social bg-white">
            <div class="center border-left light extra-action">
                <i class="icon-comment"></i><span>{{item.comment}}</span>
            </div>
        </favor>
        <div class="separator"></div>
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
    data() {
        return {};
    }
}
</script>