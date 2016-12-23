<style lang="stylus">
.like-icon
    .icon
        height: 2em
        width: @height
</style>
<template lang="jade">
.like-icon.fz-26.gray(@click="like", :class="{'red': active}")
    icon(:name="active ? 'like-solid' : 'like'")
    span {{count || zero}}
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'like-icon',

    components: {Icon},

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
