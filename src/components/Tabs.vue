<style lang="sass">
.tabs {
    display: -webkit-box;
    height: 80px;
    > div {
        -webkit-box-flex: 1;
        margin: 24px 0;
    }
    label {
        width: 100%;
        display: inline-block;
    }
    input {
        /*display: none;*/
        height: 50px;
        width: 50px;
    }
}
</style>
<template>
<div class="tabs">
    <div v-for="tab in tabs.items" :class="{'red': tab.active}" class="font-26 center border-right">
        <label for="tab-{{$index}}">{{tab.name}}</label>
        <input id="tab-{{$index}}" name="tab" v-model="tabs.active" type="radio" value='{{tab.value}}' />
    </div>
</div>
</template>
<script>
export default {
    name: 'Tabs',
    props: {
        items: Array
    }
}
</script>