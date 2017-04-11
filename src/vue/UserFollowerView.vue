<template  lang="pug">
.user-follower-view.bg
    user-list(:path="'users/'+ $route.params.id +'/fans_list'")
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
