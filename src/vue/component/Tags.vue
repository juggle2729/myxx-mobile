<style lang="sass">
.tags-component {
    padding: 0px 32px 24px;
    font-size: 0;
    .tag-title {
        height: 90px;
        line-height: 90px;
    }
    .tag {
        display: inline-block;
        height: 60px;
        line-height: 54px;
        padding: 0 38px;
        margin-bottom: 16px;
        border-radius: 30px;
        &:not(:last-child) {
            margin-right: 20px;
        }
        border: 1px solid #c6c6c6;
    }
    .nowrap {
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        .tag {
            margin-top: 40px;
        }
    }
}
</style>
<template>
<div class="tags-component bg-white" v-if="tags && tags.length">
    <div class="tag-title font-26 gray" v-if="showTitle">
        标签
    </div>
    <div class="tags" :class="nowrap ? 'nowrap' : ''">
        <div class="tag font-26 center bg-default" v-for="tag in tags" v-link="{name: 'tag', params: {id: tag.id, name: tag.name}}">{{tag.name}}</div>
    </div>
    
</div>
</template>
<script>
export default {
    name: 'Tags',
    props: {
        tags: [Array],
        showTitle: {
            type: Boolean,
            default: true
        },
        nowrap: {
            type: Boolean,
            default: false
        }
    }
}
</script>