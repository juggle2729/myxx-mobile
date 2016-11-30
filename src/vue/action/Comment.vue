<style lang="stylus">
.comment-action
    position: fixed
    &.pop-transition
        opacity: 1
        // transition: opacity .3s ease
        transition: bottom  .2s ease
    &.pop-enter, &.pop-leave
        opacity: 0
    width: 100%
    top: 0
    bottom: 0
    z-index: 999
    overflow-y: auto
    background-color: #efefef
    .container
        margin: 0 auto
        position: relative
        padding-top: 100px
        .comment-item:last-child
            padding: 26px 0 0 32px
        .tip
            position: fixed
            top: 0
            height: 100px
            line-height: 100px
            width: 100%
            z-index: 999
            > div
                margin: 0 auto
            img
                position: absolute
                height: 36px
                width: 36px
                right: 32px
                top: 32px
</style>
<template lang="jade">
.comment-action(@click.self="close", :class="{'none': closed}")
    .container
        .tip.center.fz-34.bg-white.pdr-32.bdb.flex
            div 查看评论
            img(:src="'close.svg' | qn", @click="close")
        comments(:path="path", :params="{'order_by': 'new'}", transform="comments")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'Comment',

    components: {
        Comments: new List('Comment')
    },

    data() {
        return {
            closed: false
        }
    },

    computed: {
        path() {
            const id = this.params.id || this.$route.params.id
            const type = this.params.type || this.$route.params.type || _.find(this.config.types, {route: this.$route.name}).id
            return `users/target/${id}/type/${type}/comments`
        }
    },
    
    props: {
        params: {
            type: Object
        }
    },
    
    methods: {
        close() {
            this.closed = true
            this.$root.popup.handler = undefined
        }
    }
}
</script>
