<style lang="sass">
.works-view {
    padding-bottom: 112px;
    .works {
        padding: 20px 20px 0;
        .media {
            height: 468px;
        }
        .desc {
            line-height: 90px;
            height: 90px;
            padding: 0 24px;
            .comment-component, .like-component {
                color: #d8d8d8;
                margin-left: 50px;
                &.active {
                    color: #cc3f4f;
                }
            }
        }
        &:not(:first-child) {
            margin-top: 12px;
        };
    }
}
</style>
<template>
<div class="works-view bg-default">
    <div class="works bg-white" v-for="item in items"  v-link="{name: 'work', params: {id: item.id}}">
        <div class="media img" v-bg="item.picture"></div>
        <div class="desc flex">
            <div class="font-26 gray flex-1 omit">{{item.title}}</div>
            <div class="flex">
                <like :target="item.id" :type="90" :active="item.is_liked" :count="item.like_count" class="margin-left"></like>
                <comment :count="item.comment_count"></comment>
            </div>
        </div>
    </div>
    <div class="separator-20-no"></div>
</div>
</template>
<script>
import paging from 'paging';
import shareable from 'shareable';
import like from 'component/Like.vue';
import comment from 'component/Comment.vue';
export default {
    name: 'WorksView',
    mixins: [paging, shareable],
    components: {
        like,
        comment
    },
    computed: {
        paging() {
            return {
                path: 'sns/works',
                list: 'works',
                params: {
                    user_id: this.$route.params.id
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`users/${to.params.id}/profile`).then((user) => {
                this.setShareData({name: user.nickname, photo: user.photo}, true);
            });
        }
    }
}
</script>