<style lang="stylus">
.like-icon
    &.active
        color: #cc3f4f
</style>
<template lang="jade">
.like-icon.fz-30.light(:class="{active: active}", @click="like")
    i.icon-like
    span {{count || zero}}
</template>
<script>
export default {
    name: 'like-icon',
    props: {
        active: [Boolean],
        count: [Number],
        target: [Number],
        type: [Number],
        readonly: [Boolean],
        zero: {
            type: String,
            default: () => 0
        }
    },
    computed: {
        api() {
            this.target = this.target || this.$route.params.id
            this.type = this.type || _.get(_.find(this.config.types, {route: this.$route.name}), 'id')
            if(!(this.target && this.type)) {
                throw Error('缺少参数')
            }
            return `users/target/${this.target}/type/${this.type}/like`
        }
    },
    methods: {
        like(e) {
            if(!this.readonly) {
                e.stopPropagation()
                this[this.active ? '$delete' : '$post'](this.api)
                    .then(() => {
                        this.active = !this.active
                        this.count = +this.count + (this.active ? 1 : -1)
                    })
            }
        }
    }
}
</script>
