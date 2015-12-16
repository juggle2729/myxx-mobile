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
import emitter from '../utils/emitter';
import bridge from '../utils/jsbridge';
export default {
    name: 'App',
    data() {
        return {
            user: bridge.user
        }
    },
    created() {
        // this.action('done');
        this.$http
            .get(`users/info/${bridge.user.user_id}`)
            .success(({data: user}) => {
                console.debug('user', user);
                Object.assign(bridge.user, user);
                console.debug(bridge.user);
            });
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });
    }
}
</script>
