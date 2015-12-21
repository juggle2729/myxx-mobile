<style lang="sass">
    @import '../styles/myxx';
</style>
<template>
  <main :class="{'loading': $loadingRouteData}">
    <!-- main view -->
    <router-view></router-view>
  </main>
</template>
<script>
import Q from 'q';
import emitter from '../utils/emitter';
export default {
    name: 'App',
    data() {
        return {
            user: {
                user_id: 2,
                token: 'f87e7796-9896-4a6f-997e-11b48aebd347'
            }
        }
    },
    created() {
        // 注册滚动触底事件广播
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });

        this.$watch('user', (user) => {
            console.debug('user changed', user);
        })
    }
}
</script>
