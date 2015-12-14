export default {
    api: {
        dev: 'http://120.26.113.13/'
    },
    img: {
        root: 'http://7xo8aj.com2.z0.glb.qiniucdn.com/',
        img_placeholder: 'http://7xp1h7.com2.z0.glb.qiniucdn.com/img-placeholder.png',
        video_placeholder: 'http://7xp1h7.com2.z0.glb.qiniucdn.com/video-placeholder.png',
        lg(id) {
            if(id) {
                return this.root + id + '?imageView2/1/w/600/h/350/interlace/1';
            } else {
                return 'http://7xp1h7.com2.z0.glb.qiniucdn.com/img-placeholder.png';
            }
        },
        md(id) {
            if(id) {
                return this.root + id + '?imageView2/3/w/300/h/300/interlace/1';
            } else {
                return 'http://7xp1h7.com2.z0.glb.qiniucdn.com/img-placeholder.png';
            }
        },
        sm(id) {
            if(id) {
                return this.root + id + '?imageView2/1/w/200/h/200/interlace/1';
            } else {
                return 'http://7xp1h7.com2.z0.glb.qiniucdn.com/avatar-defaut.jpg';
            }
        },
        video(id) {
            return 'http://7xo88d.media1.z0.glb.clouddn.com/' + id + '?vframe/jpg/offset/2/w/600/h/500/rotate/auto';
        }
    },
    video: {
        root: 'http://7xo88d.media1.z0.glb.clouddn.com/'
    },
    types: ['xxx', '大师', '权威', '鉴宝', '玉石', '商家', '社区']
};
