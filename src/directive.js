import config from './config';
export const bg = {
    bind() {
        this.modifier = Object.keys(this.modifiers).filter(modifier => {
            return typeof config.img[modifier] === 'function';
        }).pop() || 'lg';
    },
    update(id) {
        let placeholder = config.img.img_placeholder;
        if(this.modifier === 'video') {
            placeholder = config.img.video_placeholder;
        } else if(this.modifier === 'play') {
            placeholder = config.img.play_placeholder;
        } else if(this.modifier === 'sm') {
            placeholder = config.img.avatar_placeholder;
        }
        if(id) {
            const bgUrl = config.img[this.modifier](id);
            this.el.style.backgroundImage = `url(${bgUrl}), url(${placeholder})`;
        } else {
            this.el.style.backgroundImage = `url(${placeholder})`;
        }
    }
};