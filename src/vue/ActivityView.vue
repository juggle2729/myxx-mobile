<style lang="stylus">
.activity-view
    .cover
        width: 100%
        height: 536px
        background-position: center
        background-size: cover
</style>
<template lang="jade">
.activity-view.bg
    .cover(v-bg="activity.cover")
    .hr
    activities(:path="'cms/activities/' + $route.params.id + '/contents'")
</template>
<script>
import shareable from 'shareable'
import List from 'component/List.vue'
export default {
    name: 'activity-view',

    mixins: [shareable],

    components: {
        activities: new List('Story')
    },

    data() {
        return {
            activity: {}
        }
    },

    route: {
        data() {
            return this.$fetch(`cms/activities/${this.$route.params.id}`)
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