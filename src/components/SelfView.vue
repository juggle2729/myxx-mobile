<template>
    <div>Self View</div>
</template>
<script>
import request from 'superagent';
const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
export default {
  name: 'Self',
  data() {
    return {};
  },
  route: {
    data() {
        return this.$http
            .get('users/info/1')
            .success(function(res) {
            console.debug('xxx');
            this.$data = res.data;
            this.roleName = roles[this.role];
        });
    }
  }
}
</script>

