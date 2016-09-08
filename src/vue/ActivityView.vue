<style lang="stylus">
.activity-view
    padding-bottom: 112px
    .cover
        width: 100%
        height: 536px
        background-position: center
        background-size: cover
</style>
<template lang="jade">
.activity-view
    .cover(v-bg="activity.cover")
    template(v-for="item in items")
        .hr
        story-item(:item="item.entry")
</template>
<script>
import shareable from 'shareable'
import paging from 'paging'
import StoryItem from 'component/StoryItem.vue'
export default {
    name: 'activity-view',
    mixins: [paging, shareable],
    data() {
        return {
            activity: {}
        }
    },
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
            return this.$get(`cms/activities/${this.$route.params.id}`)
                .then(activity => {
                    this.activity = activity
                    this.action('updateTitle', {text: activity.share_title})
                    this.setShareData({
                        title: activity.share_title,
                        desc: activity.share_desc,
                        icon: activity.share_icon,
                        text: '下载美玉秀秀参与活动'
                    })
                })
        }
    }
}
</script>