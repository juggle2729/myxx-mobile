<style lang="sass">
.update-view {
    height: 100%;
    a {
        width: 560px;
        height: 350px;
        display: block;
        margin: 0 auto;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<template>
<div class="update-view bg-default">
    <a class="center-vertical" :href="tel:13505152966">
        <img :src="config.www+'update.png'" alt="请更新至最新版本">
    </a>
</div>
</template>
<script>
export default {
    name: 'UpdateView'
}
</script>

