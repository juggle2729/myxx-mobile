<style lang="sass">
.level-comp {
    display: inline-block;
    img + img {
        margin-left: 5px;
    }
}
</style>
<template lang="jade">
.level-comp
    img(v-for="i in count", :src="icon | qn")
</template>
<script>
const icons = 'heart,diamond-blue,diamond-yellow,crown-blue,crown-yellow'.split(',').map(i => `icon/lv/${i}.png`)
export default {
    name: 'LevelComponent',

    props: {
        lv: {
            type: Number,
            default: 1
        }
    },

    computed: {
        icon() {
            return icons[Math.floor((this.lv - 1) / 3)]
        },

        count() {
            return this.lv % 3 || 3
        }
    }
}
</script>