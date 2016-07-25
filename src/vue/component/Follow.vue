<style lang="sass">
@import '~style/partials/mixin';
.follow-component {
    padding: 10px .5em 0;
    height: 52px;
    color: #9c9c9c;
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
<div v-if="!isSelf" class="follow-component font-26 center" @click.stop="toggle"
    :class="{active: !follow, 'border-light': hasBorder&&follow, 'border-red': hasBorder&&!follow}">
    <i class="icon-plus" v-if="!follow"></i><span>{{follow ? '已关注' : '关注'}}</span>
</div>
</template>
<script>
export default {
    name: 'Follow',
    props: {
        follow: Boolean,
        user: Number,
        oneway: Boolean,
        hasBorder: Boolean // 是否需要边框和背景色
    },
    computed: {
        api() {
            return `users/follow/${this.user||this.route.params.id}`;
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
