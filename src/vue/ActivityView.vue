<style lang="sass">
.activity-view {
    .cover {
        width: 100%;
        height: 536px;
        background-position: center;
        background-size: cover;
    }
    .placeholder {
        height: 100px;
    }
}
</style>
<template>
    <div class="activity-view">
        <div class="cover" v-bg='activity.cover'></div>
        <div v-for="item in items">
            <div class="separator"></div>
            <story-item :item="item.entry"></story-item>
        </div>
        <div class="placeholder"></div>
        <div class="share-bottom flex bg-red white font-30">
            <img :src="'share/left.png' | qn" alt="left">
            <a class="flex-1 center bold" :href="config.download">下载美玉秀秀参与活动</a>
            <img :src="'share/right.png' | qn" alt="right">
        </div>
    </div>
</template>
<script>
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';

export default {
    name: 'ActivityView',
    data() {
        return {
            activity: {}
        }
    },
    mixins: [paging],
    components: {
        StoryItem
    },
    computed: {
        paging() {
            return {
                path: 'cms/activities/' + this.$route.params.id + '/contents',
                list: 'entries',
                id: 'id',
                params: {
                    limit: 10
                }
            }
        }
    },
    route: {
        data() {
            return this.$get(`cms/activities/${this.$route.params.id}`).then((activity) => {
                this.activity = activity;
                this.fetch();
            });
        }
    }
}
</script>