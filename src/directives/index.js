import config from '../config';
export const bg = {
    bind() {
        this.modifier = Object.keys(this.modifiers).filter(modifier => {
            return typeof config.img[modifier] === 'function';
        }).pop() || 'lg';
    },
    update(imgId) {
        const bgUrl = config.img[this.modifier](imgId || undefined);
        const placeholderUrl = this.modifier === 'video' ? config.img.video_placeholder : config.img.img_placeholder; 
        this.el.style.backgroundImage = `url(${bgUrl}), url(${placeholderUrl})`;
    }
};