<style lang="sass">
.like-component {
    font-size: 30px;
    i {
        transform: scale(1.2) translate3d(0, 2px, 0);
    }
    &.active {
        color: #cc3f4f;
    }
}
</style>
<template>
<div class="like-component" :class="{active: active}" @click.stop="like">
    <i class="icon-like"></i><span>{{count || 0}}</span>
</div>
</template>
<script>
export default {
    name: 'Like',
    props: {
        active: Boolean,
        count: [Number],
        target: [Number],
        type: [Number]
    },
    computed: {
        api() {
            this.target = this.target || this.$route.params.id;
            this.type = this.type || _.get(_.find(this.config.types, {route: this.$route.name}), 'id');
            if(!(this.target && this.type)) {
                throw Error('缺少参数');
            }
            return `users/target/${this.target}/type/${this.type}/like`;
        }
    },
    methods: {
        like() {
            this[this.active ? '$delete' : '$post'](this.api)
                .then(() => {
                    this.active = !this.active;
                    this.count += (this.active ? 1 : -1);
                });
        }
    }
}
</script>
