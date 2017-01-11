<style lang="stylus">
for $size in 240 222 180 120 108 90 80 68 50 36
    .avatar[size={"'"+$size+"'"}]
        width: $size px
        height: @width
$min-width =  24px
$width = 35%
$max-width = 40px
.avatar
    position: relative
    .vip
        position: absolute
        right: 0
        bottom: 0
        min-height: $min-width
        min-width: $min-width
        width: $width
        height: $width
        max-height: $max-width
        max-width: $max-width
</style>
<template lang="jade">
.avatar.round(:size="size", v-bg.sm="user.photo || 'app/avatar.png'", @click.stop="viewProfile")
    //- img.vip(:src="'vip/' + user.role + '.svg' | qn", v-if="user.vip_flag")
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
