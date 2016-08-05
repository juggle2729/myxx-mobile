<style lang="sass">
.purchases-view {
    .xxx {
        text-align: center;
        height: 200px;
        line-height: 200px;
    }
}
</style>
<template>
<div class="purchases-view">
    <div v-for="i in 'aaaaaaa'" v-link="{name: 'purchase', params: {id: $index}}">
        <div class="xxx">求购#{{$index}}</div>
        <div class="separator"></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'PurchasesView'
}
</script>
