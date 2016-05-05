<template>
    <div v-if="isSelf" class="avatar-{{size}}"  @click="coverflow(0)" v-bg.sm="user.photo">
        <div v-if="user.vip_flag" class="vip-{{size}}"></div>
    </div>
    <div v-else class="avatar-{{size}}" @click="goToProfile(user)" v-bg.sm="user.photo">
        <div v-if="user.vip_flag" class="vip-{{size}}"></div>
    </div>
</template>
<script>
export default {
    name: 'Avatar',
    props: {
        user: {
            type: Object,
            default: function() {
                return {}
            }
        },
        isSelf: {
            type: Boolean
        },
        size: {
            type: Number,
            default: 68
        }
    },
    methods: {
        goToProfile(user) {
            if(this.env.version > 1.2) {
               // this.action('profile', {user.id});
            } else {
                const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
                this.$router.go({name: 'user', params: {id, tab}});
            }
        },
        coverflow(index=0) {
            this.user.photo && this.action('coverflow', {ids: [this.user.photo], index});
        }
    }
}
</script>