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
    <i class="icon-like"></i><span>{{count || (zero ? '' : 0)}}</span>
</div>
</div>
</template>
<script>
export default {
    name: 'Like',
    props: {
        active: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
        zero: Boolean,
        count: [Number],
        target: [Number],
        type: [Number],
        mode: {
            type: String,
            default: function() {
                return ''; // readonly
            }
        }
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
            if(this.mode === 'readonly') {
                return;
            }

            this[this.active ? '$delete' : '$post'](this.api)
                .then(() => {
                    this.active = !this.active;
                    (this.count === undefined) && (this.count = 0);
                    this.count += (this.active ? 1 : -1);
                });
        }
    }
}
</script>
