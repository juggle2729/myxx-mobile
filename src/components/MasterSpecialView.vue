<template>
    <div class="master-special-site bg-default">
        special
        <master-tab :master-info="masterBaseData" :current-tab="'master-special'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    export default {
        name: 'MasterSpecialView',
        mixins: [masterMixin]
    };
</script>
