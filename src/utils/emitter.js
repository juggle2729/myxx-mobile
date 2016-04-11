import eventemitter from 'event-emitter';
const emitter = eventemitter({});
export default emitter;

// 处理滚动
const scrollListener = ((w) => {
    const threshold = 100;
    let lastPos = w.scrollY;
    return (event) => {
        // 滚动方向检测
        const delta = w.scrollY - lastPos;
        emitter.emit('scroll', event);
        // 滚动触底检测
        function getDocHeight() {
            const doc = w.document;
            return Math.max(
                doc.body.scrollHeight, doc.documentElement.scrollHeight,
                doc.body.offsetHeight, doc.documentElement.offsetHeight,
                doc.body.clientHeight, doc.documentElement.clientHeight
            );
        }
        const bottom = getDocHeight() - w.scrollY - w.innerHeight;
        if(delta > 0 && bottom <= threshold) {
            emitter.emit('scroll-to-bottom', event);
        } else if (delta < 0 && w.scrollY === 0) {
            emitter.emit('scroll-to-top', event);
        }
        lastPos = window.scrollY;
    };
})(window);
window.document.addEventListener('scroll', _.throttle(scrollListener, 100), false);
