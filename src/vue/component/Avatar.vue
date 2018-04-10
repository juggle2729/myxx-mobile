<style lang="stylus">
for $size in 240 222 180 120 108 90 80 68 50 36
    .avatar[size={"'"+$size+"'"}]
        width $size px
        height @width
</style>
<template  lang="pug">
.avatar.round(:size="size", v-bg.sm="user.photo || user.avatarId || 'app/avatar.png'", @click.stop="viewProfile")
</template>
<script>
export default {
    name: 'avatar',

    props: {
        user: Object,
        size: {
            type: Number,
            default: 68
        }
    },

    methods: {
        viewProfile() {
            this.$route.name === 'user' ? this.$root.coverflow([this.user.photo]) : this.$router.go({name: 'user', params: {id: this.user.id}})
        }
    }
}
</script>
