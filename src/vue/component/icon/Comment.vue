<template lang="jade">
.comment-icon.fz-30.light
    i.icon-comment
    span {{count}}
</template>
<script>
export default {
    name: 'comment-icon',

    props: {
        count: Number
    }
}
</script>
