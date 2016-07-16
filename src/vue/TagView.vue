<template>
<div>
    <div v-for="item in items">
        <div class="separator"></div>
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
export default {
    name: 'TagView',
    mixins: [paging],
    components: {
        StoryItem,
        EvaluationItem,
        JadeItem
    },
    computed: {
        paging() {
            return {
                path: 'cms/promotes|v4',
                list: 'entries',
                params: {
                    tag_id: this.tagId,
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}) {
            this.action('updateTitle', {text: decodeURIComponent(to.params.name)});
            this.tagId = to.params.id;
            return this.fetch();
        }
    }
}
</script>
