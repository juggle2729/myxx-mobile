<style lang="sass">
.work-view {
    padding-bottom: 100px;
    .header {
        height: 160px;
        line-height: 160px;
        padding: 0 36px 0 50px;
    }
    .line {
        &:before, &:after {
            content: '';
            background-color: #d9d9d9;
            height: 1px;
            width: 122px;
            display: block;
            flex: 1;
        }
        &:before {
            margin: 0 26px 0 36px;
        }
        &:after {
            margin: 0 36px 0 26px;
        }
    }
    .cover {
        width: 686px;
        height: 686px;
        margin: 36px 32px 5px;
        &.cover-video {
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            margin: 0 auto;
            background-size: contain;
        }
    }
    .medias {
        font-size: 0;
        padding: 0 28px;
        &.padding-bottom {
            padding-bottom: 28px;
        }
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

    .media:first-child:nth-last-child(5),
    .media:first-child:nth-last-child(5) ~ .media {
        &:first-child, &:nth-child(2) {
            width: 50%;
            padding-top: 50%;
        }
    }
    .desc {
        margin: 90px 32px;
        .prize {
            margin-top: 32px;
            line-height: 40px;
        }
    }
    .footer {
        &.fixed {
            position: fixed;
            bottom: 0;
            z-index: 990;
        }
        height: 100px;
        width: 100%;
        > div {
            line-height: 60px;
            -webkit-box-flex: 1;
            text-align: center;
        }
        .icon-comment-solid {
            transform: scale(1.5);
        }
    }
}
</style>
<template>
<div class="work-view" v-if="!$loadingRouteData">
    <div class="header flex">
        <avatar :user="work.user" :size="90"></avatar>
        <div class="font-30 margin-left flex-1">
            <p>{{work.user.nickname}}</p><p class="gray margin-top">{{work.user.title}}</p>
        </div>
        <follow :user="work.user.id" :follow="work.user.is_followed" :has-border="true"></follow>
    </div>
    <div class="line font-26 flex margin-top">作品展示</div>
    <div class="cover img" v-bg="cover" @click="coverflow(work.pictures, 0)"></div>
    <div class="medias">
        <div v-for="pic in pictures" v-bg="pic" class="media" @click="coverflow(pictures, $index + 1)"></div>
    </div>
    <div class="desc">
        <div class="font-36">{{work.title}}</div>
        <div class="font-30 gray prize">{{work.prize}}</div>
    </div>
    <div class="footer flex font-30 gray border-top bg-white" :class="{'fixed': !env.isShare}">
        <like :target="work.id" :type="90" :active="work.is_liked" :count="work.like_count"></like>
        <div class="comment border-left" @click="$refs.comment.comment()">
            <i class="icon-comment-solid"></i><span>写评论</span>
        </div>
        <share class="border-left"></share>
    </div>
    <div class="separator-20-no"></div>
    <comments type="90" :id="work.id" :display-input="false" v-ref:comment></comments>
</div>
</template>
<script>
import follow from 'component/Follow.vue';
import like from 'component/Like.vue';
import share from 'component/Share.vue';
import comments from 'component/Comments.vue';
import shareable from 'shareable';
export default {
    name: 'WorkView',
    mixins: [shareable],
    components: {
        follow,
        like,
        share,
        comments
    },
    computed: {
        cover() {
            return this.work.pictures[0];
        },
        pictures() {
            return _.drop(this.work.pictures);
        }
    },
    data() {
        return {
            work: {
                user: {},
                pictures: []
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`sns/works/${to.params.id}`).then((work) => {
                this.work = work;
                this.work.pictures = ['7db50e20-98af-4f04-8700-12343754bb8d', '0399ef20-568f-48f1-b3b8-a3f3df991aca', '5801641c-6fd8-4be2-bea6-c5912b7fb133', '0f142e37-63be-44ec-bebb-71971ee8f0fa'];
                this.setShareData({name: this.work.user.nickname, title: this.work.title, logo: this.cover}, true);
            });
        }
    }
}
</script>