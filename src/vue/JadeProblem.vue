<template lang="jade">
.jade-problem.bg
    help-desc(type="jade_problem")
    .help.red.fz-30.center.bg-white.pdv-50(v-link="{name: 'mall-help'}")
        span 查看帮助
        icon.fz-24(name="enter")
</template>
<script>
import HelpDesc from 'component/HelpDesc.vue'
export default {
    name: 'jade-problem',

    components: {
        HelpDesc
    }
}
</script>
