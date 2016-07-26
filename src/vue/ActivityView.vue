<style lang="sass">
.activity-view {
    padding-bottom: 100px;
    .cover {
        width: 100%;
        height: 536px;
        background-position: center;
        background-size: cover;
    }
}
</style>
<template>
<div class="activity-view">
    <div class="cover" v-bg='activity.cover'></div>
    <template v-for="item in items">
        <div class="separator"></div>
        <story-item :item="item.entry"></story-item>
    </template>
</div>
</template>
<script>
import shareable from 'shareable';
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
export default {
    name: 'ActivityView',
    data() {
        return {
            activity: {}
        }
    },
    mixins: [paging, shareable],
    components: {
        StoryItem
    },
    computed: {
        paging() {
            return {
                path: 'cms/activities/' + this.$route.params.id + '/contents'
            }
        }
    },
    route: {
        data() {
            return this.$get(`cms/activities/${this.$route.params.id}`).then((activity) => {
                this.activity = activity;
                this.action('updateTitle', {text: activity.share_title});
                this.setShareData({
                    title: activity.share_title,
                    desc: activity.share_desc,
                    icon: activity.share_icon,
                    text: '下载美玉秀秀参与活动',
                    hasDownloadLink: false
                });
            });
        }
    }
}
</script>