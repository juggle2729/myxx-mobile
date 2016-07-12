<style lang="sass">
@import '~style/partials/mixin';
.follow-component {
    padding: 1px .5em 0;
    height: 52px;
    font-size: 26px;
    color: #9c9c9c;
    text-align: center;
    border-radius: 12px;
    background-color: transparent;
    &.border-light {
        background-color: #eeeeee;
    }

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
<div v-if="!isSelf" class="follow-component flex" @click.stop="toggle"
    :class="{active: !follow, 'border-light': hasBorder&&follow, 'border-red': hasBorder&&!follow}">
    <i class="icon-plus" v-if="!follow"></i><span>{{follow ? '已关注' : '关注'}}</span>
</div>
</template>
<script>
export default {
    name: 'Follow',
    props: {
        follow: [Boolean],
        user: {
            type: Number,
            required: true
        },
        oneway: [Boolean],
        hasBorder: [Boolean] // 是否需要边框和背景色
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
            if(!this.oneway || !this.follow) {
                this[this.follow ? '$delete' : '$post'](this.api)
                    .then(() => {
                        this.follow = !this.follow;
                    });
            }
        }
    }
}
</script>
