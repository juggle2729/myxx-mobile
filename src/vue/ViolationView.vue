<template lang="pug">
.violation-view.bg-white(v-if="!$loadingRouteData")
    .item.mgl-32.pdr-32.pdv-34.fz-30.bdb(v-for="item in items")
        .gray.bold {{item.title}}
        .mgt-28.user-txt {{{item.desc}}}
    .mgl-32.mgt-24.fz-26.gray {{info.create_at | date 'yyyy-m-dd hh:MM'}}
</template>
<script>
export default {
    name: 'violation-view',

    data() {
        return {
            items: []
        }
    },

    route: {
        data() {
            return this.$fetch(`mall/shop/violation/${this.$route.params.id}`).then((data) => {
                this.info = data
                this.items = [
                    { title: '违反类型', desc: data.type},
                    { title: '涉及商品/订单', desc: data.relate},
                    { title: '违规说明', desc: data.desc},
                    { title: '处罚方式', desc: data.way}
                ]
            })
        }
    }
}
</script>