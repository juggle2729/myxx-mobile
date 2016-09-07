<style lang="sass">
.b-zone-help {
    background-color: #f4f4f4;
    img {
        width: 100%;
    }
}
</style>
<template lang="jade">
.b-zone-help
    img(:src="'bzone/help.png' | qn")
</template>
<script>
export default {
    name: 'BZoneHelp'
}
</script>