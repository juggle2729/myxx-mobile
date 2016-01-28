<style lang="sass">
.evaluation-list {
    .item {
        padding-top: 24px;
        .header {
            .user {
                padding: 0 32px;
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
                padding: 0 32px;
                line-height: 44px;
                margin: 30px 0 24px;
                line-height: 1.5em;
            }
        }
    }
    .eval-video {
        height: 548px;
        background-size: cover;
        background-position: center;
        position: relative;
        .result {
            padding: 12px 0 9px 19px;
            width: 240px;
            height: 45px;
            position: relative;
            border-radius: 25px;
            left: 25px;
            top: 25px;
            background-color: rgba(80, 80, 80, .5);
        }
        .svg {
            position: absolute;
            right: 20px;
            top: 25px;
            width: 62px;
            height: 40px;
            border-radius: 25px;
            background-color: rgba(80, 80, 80, .5);
            > img {
                width: 28px;
            }
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
        <div :class="{'separator-20': $index !=0 , 'separator': $index === 0}"></div>
        <div class="item" v-link="{name: 'evaluation', params: {id: item.post_id}}">
            <div class="header">
                <div class="user">
                    <div class="avatar" v-link="item.user | profile" v-bg.sm="item.user.photo"></div>
                    <div class="name">
                        <p class="font-26">{{item.user.name}}</p>
                        <p class="moment font-22 light">{{item.create_at | moment}}</p>
                  </div>
                </div>
                <div class="desc font-30 user-input">{{item.description}}</div>
            </div>
            <div class="eval-video" v-bg="item.picture">
                <div class="result white font-22" v-if="item.results.length">
                    <i class="icon-eval"></i><span class="">已有{{item.results.length}}位大师鉴定</span>
                </div>
                <div class="svg flex">
                    <img :src="'placeholder/video.svg' | qn" class="flex center-horizontal">
                </div>
            </div>
        </div>
    </template>
</div>
</template>
<script>
export default {
    name: 'EvaluationList',
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
