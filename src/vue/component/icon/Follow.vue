<style lang="stylus">
.follow-icon
    border-radius: 12px
    padding: 0 8px
    background-color: transparent
    height: 60px
    line-height: 58px
    width: 120px
    svg.icon
        vertical-align: -8px
    &.bd-light
        background-color: #eeeeee
    &.active
        i
            color: #cc3f4f
            display: inline-block
    .btn
        height: 60px
        line-height: 58px
</style>
<template  lang="pug">
deep-link.has-icon.follow-icon.fz-26.bd-red.gray.center(v-if="env.isShare")
    icon(name="plus")
    span.red 关注
.follow-icon.fz-26.gray.center(v-else, @click.stop="toggle", :class="{'active': !follow, 'bd-light': hasBorder&&follow, 'bd-red': hasBorder&&!follow}")
    icon(v-if="!follow", name="plus")
    span(:class="{'red': !follow}") {{follow ? '已关注' : '关注'}}
</div>
</template>
<script>
import DeepLink from 'component/DeepLink.vue'
import Icon from './Icon.vue'
export default {
    name: 'follow-icon',

    components: { DeepLink, Icon },

    props: {
        target: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            default: 'us'
        },
        follow: Boolean,
        oneway: Boolean,
        hasBorder: Boolean // 是否需要边框和背景色
    },

    computed: {
        api() {
            return `users/target/${this.target||this.route.params.id}/type/${this.type}/follow`
        }
    },

    methods: {
        toggle() {
            if(this.env.isApp) {
                if(!(this.oneway && this.follow)) {
                    this[this.follow ? '$delete' : '$post'](this.api)
                        .then(() => {
                            this.follow = !this.follow
                        })
                }
            } else {
                this.gotoDownload()
            }
        }
    }
}
</script>