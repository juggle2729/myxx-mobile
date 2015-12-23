import config from './config';
let preset = {
    lg: 'imageView2/1/w/600/h/350/interlace/1',
    md: 'imageView2/3/w/300/h/300/interlace/1',
    sm: 'imageView2/1/w/200/h/200/interlace/1',
    video: 'vframe/jpg/offset/0/w/300/h/250/rotate/auto'
};
export const bg = {
    params: ['query'],
    bind() {
        this.query = this.params.query || preset[Object.keys(this.modifiers).pop() || 'lg'] || '';
    },
    update(id) {
        if(id) {
            let host = /^image/i.test(this.query) ? config.img : config.video;
            let background = host + id + '?' + this.query;
            this.el.style.backgroundImage = `url(${background})`;
        }
    }
};