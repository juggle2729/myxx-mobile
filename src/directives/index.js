import config from '../config';
export const bg = {
    bind() {
        this.modifier = Object.keys(this.modifiers).filter(modifier => {
            return typeof config.img[modifier] === 'function';
        }).pop() || 'lg';
    },
    update(imgId) {
        const bgUrl = config.img[this.modifier](imgId || undefined);
        this.el.style.backgroundImage = `url(${bgUrl})`;
    }
};