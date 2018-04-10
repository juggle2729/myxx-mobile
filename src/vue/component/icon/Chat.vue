<template  lang="pug">
.chat-icon.fz-26.gray
    icon(name="chat")
    span.red 私信
</div>
</template>
<script>
import Q from 'q'
import Icon from './Icon.vue'
export default {
    name: 'chat-icon',

    components: { Icon }
}
</script>
