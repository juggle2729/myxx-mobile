<script>
export default {
    name: 'Play',
    props: {
        params: {
            type: Object,
            required: true
        }
    },

    ready() {
        this.params.cb(this.start)
    },

    methods: {
        start() {
            const video = document.createElement('video')
            video.controls = 'controls'
            video.src = this.config.video + this.params.id
            video.play().then(this.close).catch(this.close)
        },

        close() {
            this.params.handler = undefined
        }
    }
}
</script>
