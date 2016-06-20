<style lang="sass">
.tags {
    min-height: 108px;
    .tag-list {
        padding: 0 32px 28px;
        .tag-item {
            display: inline-block;
            margin-left: 24px;
            line-height: 60px;
            padding: 0 26px;
            border-radius: 26px;
            background-color: #ffecea;
        }
    }
}
</style>
<template>
    <div class="tags border-bottom bg-white" v-if="tags && tags.length">
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