<template lang="jade">
.story-item.bg-white
    component(:is="config.category[item.type]", keep-alive, :item = "item.entry")
    .hr
</template>
<script>
import topic from 'component/item/Topic.vue'
import post from 'component/item/Post.vue'
export default {
    name: 'story-item',
    components: {
        topic,
        post
    },
    props: {
        item: Object
    }
}
</script>
