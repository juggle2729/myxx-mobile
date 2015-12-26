<template>
    <div class="master-studio-site bg-default">
        studio
        <master-tab :master-info="masterBaseData" :current-tab="'master-studio'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    export default {
        name: 'MasterStudioView',
        mixins: [masterMixin]
    };
</script>
