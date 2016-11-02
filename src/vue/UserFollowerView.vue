<style lang="stylus">
.user-follower-view
    .user-item
        margin-bottom: 20px
</style>
<template lang="jade">
.user-follower-view.bg
    .hr
    user-list.bg(:path="'users/'+ $route.params.id +'/fans_list'")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'user-following-view',

    components: {
        UserList: new List('User')
    }
}
</script>
