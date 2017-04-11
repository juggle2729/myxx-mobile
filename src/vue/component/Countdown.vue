<style lang="stylus">
.countdown-component {
    display: inline-block
    b {
        fz-weight: normal
    }
}
</style>
<template  lang="pug">
.countdown-component {{{txt}}}
</template>
<script>
export default {
    name: 'Countdown',

    props: {
        msecs: Number
    },

    computed: {
        txt() {
            const d = Math.round((this.msecs - Date.now()) / 1000)
            const arr = [['<b>天</b>', 24*60*60], ['<b>小时</b>', 60*60], ['<b>分</b>', 60], ['<b>秒</b>', 1]]
            return arr
                .filter(([, v]) => v <= d)
                .map(([k, v], i, arr) => Math.floor((i ? d%arr[i-1][1] : d)/v)+k)
                .join('')
        }
    },

    ready() {
        const timer = setInterval(() => {
            this.msecs += 1
            if(!Math.round((this.msecs - Date.now()) / 1000)) {
                this.$dispatch('timeup')
                clearInterval(timer)
            }
        }, 1000)
    }
}
</script>
