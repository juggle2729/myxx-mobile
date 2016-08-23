<style lang="sass">
@import '~style/partials/var';
.recommend-component {
    .recommend-title {
        line-height: 84px;
        margin-left: 32px;
    }
    .data-list {
        padding: 0 15px;
        font-size: 0;
    }
}
</style>
<template>
<div v-if="data && data.length > 0" class="recommend-component bg-default" :class="{'padding-top': !name}">
    <div class="recommend-title font-26 gray">{{name}}</div>
    <div class="data-list">
        <card v-for="item in data" :entry="item.entry" :type="item.type"></card>
        <partial name="load-more" v-if="data.hasMore"></partial>
    </div>
</div>
</template>
<script>
import Card from 'component/Card.vue';
export default {
    name: 'Recommend',
    components: [
        Card
    ],
    props: {
        name: String,
        data: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
}
</script>
