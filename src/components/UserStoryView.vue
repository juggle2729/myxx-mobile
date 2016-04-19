<template>
<div class="user-story bg-default">
    <story-list :items="items"></story-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
import paging from 'paging';
export default {
    name: 'UserStoryView',
    mixins: [PagingMixin],
    data() {
        return {
            emptyTitle: '你还没有晒宝'
        }
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/topics',
                list: 'topics'
            }
        }
    },
    components: {
        StoryList
    },
    route: {
        data() {
            return this.fetch();
        }
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
<style lang="sass">
.user-story {
    .tabs {
        display: -webkit-box;
        height: 80px;
        > div {
            -webkit-box-flex: 1;
            margin: 24px 0;
        }
        label {
            width: 100%;
            display: inline-block;
        }
        input {
            display: none;
        }
    }
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
            background-position: center;
        }
    }
}
</style>
