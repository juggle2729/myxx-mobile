<template lang="pug">
.brand-shop-detail.pdb
    help-desc(:type="$route.params.type", :title="true")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'brand-shop-detail',

    components: {
        HelpDesc
    }
}
</script>