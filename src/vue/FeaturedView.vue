<style lang="sass">
.featured-view {
    .tabs {
        height: 80px;
        width: 100%;
        overflow: scroll;
        white-space: nowrap;
        > div {
            display: inline-block;
            padding: 25px 23px;
            border-bottom: 3px solid white;
            &:first-of-type {
                color: #cc3f4f;
            }
        }
    }
}
</style>
<template>
<div class="featured-view">
    <div class="tabs scrollable font-30">
        <div v-for="section in sections" v-link="{name: 'featured', query: {section: section.code}}">
            {{section.name}}
        </div>
    </div>
    <div v-for="item in items">
        <div class="separator"></div>
        <story-item v-if="item.type===6" :item="item.entry"></story-item>
        <evaluation-item v-if="item.type===3" :item="item.entry"></evaluation-item>
        <jade-item v-if="item.type===8" :item="item.entry"></evaluation-item>
    </div>
    <partial name="load-more" v-show="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import StoryItem from 'component/StoryItem.vue';
import EvaluationItem from 'component/EvaluationItem.vue';
import JadeItem from 'component/JadeItem.vue';
export default {
    name: 'StoriesView',
    mixins: [paging],
    components: {
        StoryItem,
        EvaluationItem,
        JadeItem
    },
    data() {
        return {
            sections: []
        }
    },
    computed: {
        paging() {
            return {
                path: 'cms/promotes?section=recommend|v5',
                list: 'entries'
            }
        }
    },
    route: {
        data() {
            this.$get('cms/promotes/sections|v4')
                .then((resp) => {
                    this.sections = resp.sections;
                });
            return this.fetch();
        }
    }
}
</script>
