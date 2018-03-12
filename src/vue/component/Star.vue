<template>
    <svg :height="getSize" :width="getSize" viewBox="0 0 1024 1024" @mousemove="mouseMoving" @click="selected" style="overflow:visible;">
        <linearGradient :id="grad" x1="0" x2="100%" y1="0" y2="0">
            <stop :offset="getFill" :stop-color="(rtl) ? inactiveColor : activeColor" />
            <stop :offset="getFill" :stop-color="(rtl) ? activeColor : inactiveColor" />
        </linearGradient>
        <path d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z" p-id="1917" :fill="getGradId"></path>
        <!-- <polygon :points="starPointsToString" :fill="getGradId" :stroke="borderColor" :stroke-width="borderWidth" />
        <polygon :points="starPointsToString" :fill="getGradId" /> -->
    </svg>
</template>

<script type="text/javascript">
export default {
    props: {
        fill: {
            type: Number,
            default: 0
        },
        size: {
            type: Number,
            default: 50
        },
        starId: {
            type: Number,
            required: true
        },
        activeColor: {
            type: String,
            required: true
        },
        inactiveColor: {
            type: String,
            required: true
        },
        borderColor: {
            type: String,
            default: '#000'
        },
        borderWidth: {
            type: Number,
            default: 0
        },
        padding: {
            type: Number,
            default: 0
        },
        rtl: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.calculatePoints
        this.grad = Math.random().toString(36).substring(7)
    },
    computed: {
        calculatePoints() {
            this.starPoints = this.starPoints.map((point) => {
                return ((this.size / 43) * point) + (this.borderWidth * 1.5)
            })
        },
        starPointsToString() {
            return this.starPoints.join(',')
        },
        getGradId() {
            return 'url(#' + this.grad + ')'
        },
        getSize() {
            return parseInt(this.size) + parseInt(this.borderWidth * 3) + this.padding
        },
        getFill() {
            return (this.rtl) ? 100 - this.fill + '%' : this.fill + '%'
        }
    },
    methods: {
        mouseMoving($event) {
            this.$emit('star-mouse-move', {
                event: $event,
                position: this.getPosition($event),
                id: this.starId
            })
        },
        getPosition($event) {
            // calculate position in percentage.
            var starWidth = (92 / 100) * this.size
            const offset = (this.rtl) ? Math.min($event.offsetX, 45) : Math.max($event.offsetX, 1)
            var position = Math.round((100 / starWidth) * offset)
            return Math.min(position, 100)
        },
        selected($event) {
            this.$emit('star-selected', {
                id: this.starId,
                position: this.getPosition($event)
            })
        }
    },
    data() {
        return {
            starPoints: [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
            grad: ''
        }
    }
}
</script>