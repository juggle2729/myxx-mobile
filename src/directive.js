import config from './config';
let preset = {
    lg: 'imageView2/1/w/600/h/350/interlace/1',
    md: 'imageView2/3/w/300/h/300/interlace/1',
    sm: 'imageView2/1/w/200/h/200/interlace/1',
    video: 'vframe/jpg/offset/0/rotate/auto|imageView2/1/w/340/h/250'
};
const bg = {
    params: ['query'],
    bind() {
        this.query = this.params.query || preset[Object.keys(this.modifiers).pop() || 'lg'] || '';
    },
    update(id) {
        if(id) {
            let bgImgStr;
            let host = config.video;
            if(/^image/i.test(this.query)) {
                host = config.img;
                bgImgStr = `url(${host + id + '?' + this.query}), url('//7xp1h7.com2.z0.glb.qiniucdn.com/placeholder/img.png')`
            } else {
                bgImgStr = `url(${host + id + '?' + this.query})`
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