<style lang="sass">
@import '~style/partials/var';
.user-story {
}
</style>
<template>
<div class="user-story">
    <div v-for="item in items" track-by="$index" v-link="{name: 'story', params: {id: item.entry.post_id}}" class="item">
        <div class="separator"></div>
        <story-item :item="item.entry"></story-item>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty"></empty>
</div>
</template>
<script>
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
export default {
    name: 'UserStory',
    mixins: [paging],
    components: {
        StoryItem
    },
    activate(done) {
        this.fetch().then(done);
    },
    computed: {
        paging() {
            return {
                path: 'sns/topics|v4',
                list: 'topics',
                id: 'entry.post_id',
                params: {
                    limit: 10,
                    user_id: this.$route.params.id
                }
            }
        }
    }
}
</script>
