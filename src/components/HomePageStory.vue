<style lang="sass">
.homepage-story {
    height: 100%;
}
</style>
<template>
<div class="homepage-story bg-white">
    <story-list :items="items"></story-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'HomePageStory',
    mixins: [PagingMixin],
    props: {
        id: {
            type: String,
            required: true
        }
    },
    created() {
        this.fetch();
    },
    components: {
        StoryList
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.id +'/topics',
                list: 'topics'
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
