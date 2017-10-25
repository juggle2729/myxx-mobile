<style lang="stylus">
.shop-school-view
    .tabs
        width 100%
        padding 36px 32px 15px
        overflow hidden
        .option
            float left
            width 164px
            border-radius 30px
            margin-bottom 20px
            &:not(:nth-child(4n))
                margin-right 10px
    .pic
        width 148px
        height @width
        background-size cover
        background-position center
</style>
<template  lang="pug">
.shop-school-view.bg
    .tabs
        .option.center.fz-26.bg-white.line-height-60.bd(v-for="category in categories", @click="changeCurrent(category)",
            :class="category.id===current ? 'red-e5': 'black-24'") {{ category.name }}
    .pdh-20.pdb-20
        .bg-white.mgb.flex.pd-40.bd(v-for="item in items", @click="goLink(item)")
            .pic.bg(:style="{backgroundImage: `url(${item.better_featured_image.source_url})`}")
            .flex-1.mgl-28.fz-34.black-24.line-clamp-3 {{ item.title.rendered }}
</template>
<script>
import paging from 'paging'
export default {
    name: 'shop-school-view',

    data() {
        return {
            current: '',
            categories: [],
            items: []
        }
    },

    route: {
        data({from, to, next}) {
            return this.$cms('categories', { parent: 2, orderby: 'id' }).then(data => {
                this.categories = data
                this.current = this.categories[0].id
                return this.cms()
            })
        }
    },

    methods: {
        changeCurrent(tab) {
            this.current = tab.id
            this.cms()
        },

        cms() {
            this.$cms('posts', { categories: [this.current], context: 'embed' }).then(data => {
                this.items = data
            })
        },

        goLink(item) {
            location.href = item.link
        }
    }
}
</script>