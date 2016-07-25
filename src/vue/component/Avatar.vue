<style lang="sass">
.avatar-component {
    > div {
        position: relative;
        .vip {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 30%;
            height: 30%;
        }
    }
}
</style>
<template>
<div class="avatar-component">
    <div v-if="isSelf" class="avatar-{{size}}"  @click.stop="$root.coverflow([user.photo])" v-bg.sm="user.photo">
        <img :src="vip() | qn" class="vip" v-if="user.vip_flag" />
    </div>
    <div v-else class="avatar-{{size}}" @click.stop="go()" v-bg.sm="user.photo">
        <img :src="vip() | qn" class="vip" v-if="user.vip_flag" />
    </div>
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
        go() {
            this.$route.name === 'user' ? this.$root.coverflow([this.user.photo]) : this.$router.go({name: 'user', params: {id: this.user.id}});
        },
        vip() {
            return `vip/${this.user.role}.svg`;
        }
    }
}
</script>
