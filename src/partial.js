export default {
    install(Vue, options) {
        Vue.partial('load-more',
            `<div class="load-more center font-22 gray padding-vertical border-top">
                <img :src="'loading.svg' | qn" alt="loading">
            </div>`);
        Vue.partial('empty-page',
            `<div class="empty-page font-30 gray bg-white">
                <div class="center-vertical">
                    <div class="empty-img center-horizontal"></div>
                    <div class="center">{{emptyTitle || '暂无数据'}}</div>
                </div>
            </div>`);
    }
}
