<template  lang="pug">
.credit-medal-view.bg-white
    tabs(:tabs="views", :current.sync="view")
    component(:is="view", keep-alive)
</template>
<script>
import Tabs from 'component/Tabs.vue'
import Active from 'component/CreditActive.vue'
import Trade from 'component/CreditTrade.vue'
import Assignment from 'component/CreditAssignment.vue'
export default {
    name: 'credit-view',

    data() {
        return {
            view: ''
        }
    },

    components: {
        Tabs,
        Active,
        Trade,
        Assignment
    },

    computed: {
        views() {
            return {active: '活跃', trade: '交易', assignment: '任务'}
        }
    }
}
</script>