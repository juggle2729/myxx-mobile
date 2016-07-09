<style lang="sass">
.hairline-view {
    .border {
        border-width: 1px;
        border-style: solid;
        border-color: #CC3F4F;
        border-radius: 8px;
        .hairline & {
            border-width: 0.5px;
        }
    }
    div {
        text-align: center;
        height: 50px;
        background-color: whitesmoke;
        margin: 10px 30px;

    }
}
</style>
<template>
<div class="hairline-view font-30">
    <div class="border">.5px</div>
    <div class="border">.5px</div>
    <div class="border">.5px</div>
    <div class="border">.5px</div>
    <div class="border">.5px</div>
    <div class="border">1px</div>
</div>
</template>
<script>

export default {
    name: 'HairlineView'
}
</script>
