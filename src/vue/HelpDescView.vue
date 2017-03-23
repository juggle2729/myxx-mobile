<template lang="pug">
.help-desc-view
    help-desc(:type="$route.params.type", :title="true")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'help-desc-view',

    components: {
        HelpDesc
    }
}
</script>