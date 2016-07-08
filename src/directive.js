import config from './config';
let preset = {
    lg: '_750',
    md: '_320',
    sm: '_240',
    video: '?vframe/jpg/offset/0/rotate/auto|imageView2/0/w/375'
};
const bg = {
    params: ['query', 'holder'],
    bind() {
        this.query = this.params.query || preset[Object.keys(this.modifiers).pop() || 'lg'] || '';
        this.holder = this.params.holder === 'false' ? false : true;
    },
    update(id) {
        if(id) {
            let bgImgStr;
            let host = config.img;
            if(!/^[?|_]/.test(this.query)) {
                this.query = '?' + this.query;
            }
            if(/^\?vframe/.test(this.query)) {
                host = config.video;
                bgImgStr = `url(${host + id + this.query})`;
            } else {
                bgImgStr = `url(${host + id + this.query})`;
                if (this.holder) {
                    bgImgStr += `, url('//o0x80w5li.qnssl.com/placeholder/img.png')`;
                }
            } 
            this.el.style.backgroundImage = bgImgStr;
        }
    }
};
export default {
    install(Vue, options) {
        Vue.directive('bg', bg);
    }
}
