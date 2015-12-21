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
                id: 2,
                token: 'f87e7796-9896-4a6f-997e-11b48aebd347',
                photo: "avatar2.jpg",
                role: 0
            }
        }
    },
    created() {
        // 注册滚动触底事件广播
        emitter.on('scroll-to-bottom', (e) => {
            this.$broadcast('scrollToBottom', e);
        });

        this.$watch('user.id', (idNew, idOld) => {
            if(idNew - idOld) { // 避免由类型不同造成的change事件   
                console.debug('user id change', idNew, idOld);
                this.$get(`users/${idNew}/basic`)
                    .then((user) => {
                        this.user = user;
                    });
            } 
        });
    }
}
</script>
