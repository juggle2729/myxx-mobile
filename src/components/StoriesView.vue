<template>
<div class="stories-view">
    <story-list :items="items"></story-list>
    <partial name="load-more" v-show="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import StoryList from './StoryList.vue';
export default {
    name: 'StoriesView',
    mixins: [paging],
    components: {
        StoryList
    },
    computed: {
        paging() {
            return {
                path: 'sns/topics',
                list: 'topics',
                params: {
                    limit: 10
                }
            }
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    }
}
</script>
<style lang="sass">
.stories-view {
    .tabs {
        display: -webkit-box;
        height: 80px;
        > div {
            -webkit-box-flex: 1;
            padding: 25px 0 23px;
            &:active {
                color: #cc3f4f;
            }
        }
        label {
            width: 100%;
            display: inline-block;
        }
        input {
            display: none;
        }
    }
}
</style>
