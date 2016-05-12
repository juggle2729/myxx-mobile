<template>
    <div v-if="isSelf" class="avatar-{{size}}"  @click="coverflow([user.photo])" v-bg.sm="user.photo">
        <div v-if="user.vip_flag" class="vip-{{size}}"></div>
    </div>
    <div v-else class="avatar-{{size}}" v-link="{name: 'user', params: {id: user.id, tab: user.shop_status ? 'jade' : 'story'}}" v-bg.sm="user.photo">
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
    }
}
</script>