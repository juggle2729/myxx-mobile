<style lang="stylus">
.tag-list
    .tag
        border-radius: 8px
        display: inline-block
</style>
<template lang="pug">
.tag-list.bg-white.pdb-30.pdt-8.pdh-32.bdb
    .tag.line-height-60.fz-26.gray.bd.pdh.mgr-16(v-for="item in items") {{item.name}} {{item.num}}
</template>
<script>
export default {
    name: 'tag-list',

    data() {
        return {
            items: [
                {name: '描述一致', num: 15},
                {name: '态度好', num: 8},
                {name: '货真价实', num: 6},
                {name: '实物', num: 15},
                {name: '服务态度好', num: 8},
                {name: '货真价实', num: 6}
            ]
        }
    }
}
</script>