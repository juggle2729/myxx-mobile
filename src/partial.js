export default {
    install(Vue, options) {
        Vue.partial('load-more',
            `<div class="load-more center fz-22 gray pdv bdt">
                <img :src="'loading.svg' | qn" alt="loading">
            </div>`)
    }
}
