<template lang="jade">
.story-item.bg-white(v-link="{name: post ? 'post' : 'story', params: {id: item.entry.post_id}}")
    div(v-if="!post")
        topic(:item="item.entry")
    div(v-else)
        post(:item="item.entry")
</template>
<script>
import topic from 'component/Topic.vue'
import post from 'component/Post.vue'
export default {
    name: 'story-item',
    components: {
        topic,
        post
    },
    computed: {
        post() {
            return this.item.type == 10
        }
    },
    props: {
        item: Object
    }
}
</script>
