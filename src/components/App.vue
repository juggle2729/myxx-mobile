<template>
  <main>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </main>
</template>
<script>
  console.log('App.vue');
</script>
