<template>
<div class="bg-default">
    <tags :tags="tags" :show-title="false" :nowrap="true"></tags>
    <div v-for="item in items">
        <div class="separator-20"></div>
        <story-item v-if="item.type === 6" :item="item.entry"></story-item>
        <evaluation-item v-if="item.type === 3" :item="item.entry"></evaluation-item>
        <jade-item v-if="item.type === 8" :item="item.entry"></jade-item>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
import EvaluationItem from 'component/EvaluationItem.vue';
import JadeItem from 'component/JadeItem.vue';
import Tags from 'component/Tags.vue';
export default {
    name: 'TagView',
    mixins: [paging],
    components: {
        StoryItem,
        EvaluationItem,
        JadeItem,
        Tags
    },
    data() {
        return {
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
        data({to, next}) {
            this.action('updateTitle', {text: decodeURIComponent(to.params.name)});
            this.tagId = to.params.id;
            this.$get(`dc/tags/${this.tagId}/same`).then(tags => {
                this.tags = tags.tags;
            });
            next();
        }
    }
}
</script>
