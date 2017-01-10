<template lang="jade">
.chat-icon.fz-26.gray(@click.stop="chat(id, name, jade)")
    icon(name="chat")
    span.red 私信
</div>
</template>
<script>
import Q from 'q'
import Icon from './Icon.vue'
export default {
    name: 'chat-icon',

    components: {Icon},

    props: {
        id: [Number],
        name: [String],
        jade: [Number] // 商品id
    },
    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.id
        }
    },
    methods: {
        chat(id, name, jade) {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能和自己聊天'})
            } else{
                this.action('chat', {id: id, name: name, product: jade})
            }
        }
    }
}
</script>
