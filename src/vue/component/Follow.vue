<style lang="stylus">
@import '~style/partials/mixin'
.follow-component {
    padding: 10px .5em 0
    height: 52px
    color: #9c9c9c
    border-radius: 12px
    background-color: transparent
    &.bd-light {
        background-color: #eeeeee
    }

    &.active {
        i {
            color: #cc3f4f
            transform: scale(1.5)
            display: inline-block
        }
    }
}
</style>
<template>
<div v-if="!isSelf" class="follow-component fz-26 center" @click.stop="toggle"
    :class="{active: !follow, 'bd-light': hasBorder&&follow, 'bd-red': hasBorder&&!follow}">
    <i class="icon-plus" v-if="!follow"></i><span>{{follow ? '已关注' : '关注'}}</span>
</div>
</template>
<script>
export default {
    name: 'Follow',
    props: {
        user: {
            type: Number,
            required: true
        },
        follow: Boolean,
        oneway: Boolean,
        hasBorder: Boolean // 是否需要边框和背景色
    },
    computed: {
        api() {
            return `users/follow/${this.user||this.route.params.id}`
        },
        isSelf() {
            return _.get(this, 'self.id') == this.user
        }
    },
    methods: {
        toggle() {
            if(this.env.isApp && (!this.oneway || !this.follow)) {
                this[this.follow ? '$delete' : '$post'](this.api)
                    .then(() => {
                        this.follow = !this.follow
                    })
            } else {
                window.location.href = this.config.download
            }
        }
    }
}
</script>
