<style lang="sass">
    .tag-view {
        /* 分享页面底部预留高度，防止下载banner遮挡按钮 */
        .bottom-height {
            width: 100%;
            height: 113px;
        }
    }
</style>
<template>
<div class="tag-view bg-default">
    <tags :tags="tags" :show-title="false" :nowrap="true"></tags>
    <div v-for="item in items">
        <div class="separator-20"></div>
        <story-item v-if="item.type === 6" :item="item.entry"></story-item>
        <evaluation-item v-if="item.type === 3" :item="item.entry"></evaluation-item>
        <jade-item v-if="item.type === 8" :item="item.entry"></jade-item>
    </div>
    <div :class="{ 'bottom-height': env.isShare }"></div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import Q from 'q';
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
import EvaluationItem from 'component/EvaluationItem.vue';
import JadeItem from 'component/JadeItem.vue';
import Tags from 'component/Tags.vue';
import shareable from 'shareable';
export default {
    name: 'TagView',
    mixins: [shareable, paging],
    components: {
        StoryItem,
        EvaluationItem,
        JadeItem,
        Tags
    },
    data() {
        return {
            tagId: 0,
            tags: []
        };
    },
    computed: {
        paging() {
            return {
                path: 'cms/promotes',
                params: {
                    tag_id: this.tagId
                }
            }
        }
    },
    route: {
        data({to}) {
            this.action('updateTitle', {text: decodeURIComponent(to.params.name)});
            this.tagId = to.params.id;

            return Q.all([
                this.$get(`dc/tags/${this.tagId}/same`).then(tags => {
                    this.tags = tags.tags;
                }),
                this.fetch(true)
            ]).then(() => {
                this.setShareData({}, false);  // 显示下载banner但不可分享
            });
        }
    }
}
</script>
