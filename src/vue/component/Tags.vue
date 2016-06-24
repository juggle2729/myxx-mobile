<style lang="sass">
.tags-component {
    .tag-list {
        font-size: 0;
        .tag-item {
            display: inline-block;
            line-height: 60px;
            padding: 0 26px;
            border-radius: 26px;
            background-color: #ffecea;
            margin: 0 30px 24px 0;
        }
    }
}
</style>
<template>
    <div class="tags-component bg-white" v-if="tags && tags.length">
        <div class="tag-list flex">
            <div class="tag-item font-26 center" v-for="tag in tags" v-link="{name: 'tag', params: {id: tag.id, name: tag.name}}">{{tag.name}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Tags',
        props: {
            tags: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        }
    }
</script>