<style lang="sass">
.product-card {
    display: inline-block;
    width: 345px;
    .media {
        width: 345px;
        height: 345px;
    }
    .data-info {
        padding: 32px 20px;
        .desc {
            margin-bottom: 32px;
        }
        .price::first-letter {
            font-size: .9em;
        }
    }
}
</style>
<template lang="jade">
.product-card.bg-white
    .media.img(v-bg='entry.first_picture')
    .data-info
        p.font-26.omit.desc {{entry.title}}
        p.font-30.red.price {{entry.price | price}}
</template>
<script>
export default {
    name: 'ProductCard',

    props: {
        entry: Object
    }
}
</script>