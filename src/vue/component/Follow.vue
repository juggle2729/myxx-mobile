<style lang="sass">
.follow-component {
    padding: 0 .5em;
    height: 52px;
    font-size: 26px;
    color: #9c9c9c;
    text-align: center;
    line-height: 48px;
    &.active {
        i {
            color: #cc3f4f;
            transform: scale(1.5);
            display: inline-block;
        }
    }
}
</style>
<template>
<div v-if="!isSelf" class="follow-component flex" :class="{active: !follow}" @click.stop="toggle">
    <i class="icon-plus"></i><span>{{follow ? '已关注' : '关注'}}</span>
</div>
</template>
<script>
export default {
    name: 'Follow',
    props: {
        follow: Boolean,
        user: {
            type: Number,
            required: true
        }
    },
    computed: {
        api() {
            if(!this.user) {
                throw Error('缺少参数');
            }
            return `users/follow/${this.user}`;
        },
        isSelf() {
            return _.get(this, 'self.id') == this.user;
        }
    },
    methods: {
        toggle() {
            this[this.follow ? '$delete' : '$post'](this.api)
                .then(() => {
                    this.follow = !this.follow;
                });
        }
    }
}
</script>
