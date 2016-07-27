<template>
<div class="bg-default">
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
            next();
        }
    }
}
</script>
