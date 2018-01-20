<style lang="stylus">
.promise-detail
    .btn
        border-radius: 45px
    .icon-selected
        display: block
        margin: 160px auto 40px
</style>
<template lang="pug">
.promise-detail.pdb
    template(v-if="!result")
        help-ziliao-feature(v-if="$route.params.type === 'ziliao_feature'")
        help-desc(v-else, :type="$route.params.type", :title="true")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
import HelpZiliaoFeature from 'component/HelpZiliaoFeature.vue'
export default {
    name: 'promise-detail',

    components: {
        HelpDesc,
        HelpZiliaoFeature
    }
}
</script>