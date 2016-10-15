<style lang="stylus">
.follow-icon {
    padding: 10px .5em 0
    height: 52px
    border-radius: 6px
    background-color: transparent
    &.bd-light {
        background-color: #eeeeee
    }

    &.active {
        i {
            color: #cc3f4f
            display: inline-block
        }
    }
}
</style>
<template lang="jade">
.follow-icon.fz-26.center(v-if="!isSelf", @click.stop="toggle", :class="{active: !follow, 'bd-light': hasBorder&&follow, 'bd-red': hasBorder&&!follow}")
    i.icon-plus(v-if="!follow")
    span {{follow ? '已关注' : '关注'}}
</div>
</template>
<script>
export default {
    name: 'follow-icon',

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