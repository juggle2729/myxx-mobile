<template  lang="pug">
.collection-follower-view.bg
    user-list(:path="'users/target/'+ $route.params.id +'/type/cl/fans_list'")
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'collection-following-view',

    components: {
        UserList: new List('User')
    }
}
</script>