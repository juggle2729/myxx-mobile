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
            user: {}
        }
    },
    created() {
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });
    }
}
</script>
