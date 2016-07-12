<style lang="sass">
.like-component {
    i {
        transform: scale(1.5) translateY(.5pX); // translate3d will cause blurry
    }
    &.active {
        color: #cc3f4f;
    }
}
</style>
<template>
<div class="like-component font-30 gray" :class="{active: active}" @click.stop="like">
    <i class="icon-like"></i><span>{{count}}</span>
</div>
</template>
<script>
export default {
    name: 'Like',
    props: {
        active: [Boolean],
        count: [Number, String],
        target: [Number],
        type: [Number],
        readonly: [Boolean]
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
            if(!this.readonly) {
                this[this.active ? '$delete' : '$post'](this.api)
                    .then(() => {
                        this.active = !this.active;
                        this.count = +this.count + (this.active ? 1 : -1);
                    });
            }
        }
    }
}
</script>
