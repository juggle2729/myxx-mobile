<style lang="sass">
.tags-component {
    margin: 40px 32px 24px;
    font-size: 0;
    .tag {
        display: inline-block;
        height: 54px;
        line-height: 54px;
        padding: 0 1em;
        border-radius: 18px;
        background-color: #ffecea;
        margin-bottom: 16px;
        &:not(:last-child) {
            margin-right: 1em;
        }
    }
}
</style>
<template>
<div class="tags-component bg-white" v-if="tags && tags.length">
    <div class="tag font-26 center" v-for="tag in tags" v-link="{name: 'tag', params: tag}">{{tag.name}}</div>
</div>
</template>
<script>
export default {
    name: 'Tags',
    props: {
        tags: [Array]
    }
}
</script>