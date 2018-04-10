<template lang="pug">
.help-desc-view
    help-desc(:type="type", :title="true")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'help-desc-view',

    components: {
        HelpDesc
    },

    computed: {
        type() { // IOS webview 未能正确解码，需要手动解码
            return _.split(decodeURIComponent(this.$route.params.type), '#', 1)[0]
        }
    }
}
</script>