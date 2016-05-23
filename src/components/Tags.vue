<style lang="sass">
.tags {
    min-height: 108px;

    .tag-item {
        display: inline-block;
        margin: 28px 0 28px 16px;
        line-height: 60px;
        padding: 0 26px;
        border-radius: 26px;
        background-color: #ffecea;

        &:not(.first-line) {
             margin-top: 0;
         }
    }

    .row-separator + .tag-item {
        margin-left: 32px;
    }
}
</style>
<template>
    <div class="tags border-bottom" v-if="tags && tags.length">
        <div class="tag-list">
            <template v-for="tag in tags">
                <div class="row-separator" v-if="$index % 4 === 0"></div>
                <div class="tag-item font-26" :class="{'first-line' : $index < 4}">{{tag.name}}</div>
            </template>
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