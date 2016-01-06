<template>
<div class="ua-view">{{ua}}</div>
</template>
<script>
export default {
    name: 'UA',
    data() {
        return {
            ua: navigator.userAgent
        };
    }
}
</script>
