export default {
    install(Vue, options) {
        Vue.partial('load-more', 
            `<div class="load-more center font-22 gray padding-vertical">
                <img :src="'loading.gif' | qn" alt="loading">
            </div>`);
    }
}