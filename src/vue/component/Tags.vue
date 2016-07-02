<style lang="sass">
.tags-component {
    margin: 32px;
    .tag-list {
        font-size: 0;
        .tag-item {
            display: inline-flex;
            align-items: center;
            height: 53px;
            line-height: 54px;
            padding: 0 28px;
            border-radius: 18px;
            background-color: #ffecea;
            margin: 0 28px 24px 0;
        }
    }
}
</style>
<template>
    <div class="tags-component bg-white" v-if="tags && tags.length">
        <div class="tag-list">
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