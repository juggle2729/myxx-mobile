<style lang="stylus">
.area-view
    .flex
        height 100px
    .icon-enter
        width 14px
        height 24px
        top 50%
        right 36px
        transform translateY(-50%)
</style>
<template lang="pug">
.area-view.bg-gray-f7.pdt-20
    .list.bdv.bg-white
        .flex.mgl-32.bdb.relative(v-for="area in filterAreas", @click="onSelectArea(area)")
            .fz-32 {{area.name}}
            icon.fz-22.absolute.gray-99(name="enter", v-if="showArrow(area)")
</template>
<script>
export default {
    name: 'area-view',

    data() {
        return {
            areas: [],
            areaName: []
        }
    },

    computed: {
        provinceId() {
            return this.$route.query.p
        },

        cityId() {
            return this.$route.query.c
        },

        enableThird() { // 是否展示区县
            return this.$route.query.t === 'true'
        },

        filterAreas() {
            if (!this.provinceId) {
                return this.areas
            } else if (!this.cityId) {
                return this.findAreas(this.areas, this.provinceId)
            } else {
                return this.findAreas(this.findAreas(this.areas, this.provinceId), this.cityId)
            }
        }
    },

    route: {
        data() {
            const areas = this.$store.get('areas')
            if (areas) {
                return { areas }
            }
            return this.$fetch(`common/areas`).then(({ areas }) => {
                this.$store.set('areas', areas)
                return { areas }
            })
        }
    },

    methods: {
        onSelectArea(area) {
            if (!this.showArrow(area)) {
                this._pushAreaName(area.name)

                // update cache
                let address = this.$store.get('address')
                if (!address) {
                    address = {}
                }
                address['areaName'] = this.areaName.join(' ')
                address['areaId'] = area.id
                this.$store.set('address', address)

                this.action('back', {step: this.enableThird ? 3 : 2, refresh: true})
                return
            }
            const query = this.$route.query
            if (!query.p) {
                query.p = area.id
            } else if (!query.c) {
                query.c = area.id
            }
            this.$router.go({
                name: this.$route.name,
                query
            })
        },

        findAreas(baseAreas, id) {
            if (!baseAreas.length) {
                return []
            }

            const targetAreas = baseAreas.filter(area => area.id === +id)
            if (targetAreas && targetAreas.length) {
                const targetArea = targetAreas[0]
                this._pushAreaName(targetArea.name)
                return targetArea.children
            }
            return []
        },

        showArrow(area) {
            if (this.enableThird) {
                return area.children && area.children.length
            }
            return !this.provinceId
        },

        _pushAreaName(targetName) {
            if (!this.lodash.includes(this.areaName, targetName)) {
                this.areaName.push(targetName)
            }
        }
    }
}
</script>