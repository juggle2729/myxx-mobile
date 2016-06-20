import { EventEmitter } from 'events';

const scroll = new EventEmitter();

const touchEvent = {
    sPos: { x: 0, y: 0 },
    mPos: { x: 0, y: 0 },
    control: false,
    threshold: 60,
    preventDirection: 'all',
    moveDistance: () => {
        const xDiff = touchEvent.mPos.x - touchEvent.sPos.x;
        const yDiff = touchEvent.mPos.y - touchEvent.sPos.y;
        return { xDiff, yDiff };
    },
    touchstart: (evt) => {
        const point = evt.touches ? evt.touches[0] : evt;

        touchEvent.sPos.x = point.screenX;
        touchEvent.sPos.y = point.screenY;
    },
    touchmove: (evt) => {
        touchEvent.control = true;

        var point = evt.touches ? evt.touches[0] : evt;
        touchEvent.mPos.x = point.screenX;
        touchEvent.mPos.y = point.screenY;

        const { xDiff, yDiff } = touchEvent.moveDistance();
        if (touchEvent.preventDirection === 'all') {
            evt.preventDefault();
        } else if (touchEvent.preventDirection === 'vertical' && Math.abs(xDiff) < Math.abs(yDiff)) {
            evt.preventDefault();
        } else if (touchEvent.preventDirection === 'horizontal' && Math.abs(xDiff) > Math.abs(yDiff)) {
            evt.preventDefault();
        }
    },
    touchend: (evt) => {
        if (touchEvent.control) {
            const { xDiff, yDiff } = touchEvent.moveDistance();
            if (Math.abs(xDiff) < touchEvent.threshold && Math.abs(yDiff) < touchEvent.threshold) {
                touchEvent.control = false;
                return;
            }

            if (Math.abs(xDiff) > Math.abs(yDiff))  {
                scroll.emit('touch-scroll', xDiff > 0 ? 'right' : 'left');
            } else {
                scroll.emit('touch-scroll', yDiff > 0 ? 'down' : 'up');
            }

            touchEvent.control = false;
        }
    }
};

scroll.install = (container, preventDirection = 'all') => {

    if (!container) {
        throw new Error('Not found container');
    }

    touchEvent.preventDirection = preventDirection;

    container.addEventListener('touchstart', touchEvent.touchstart, false);
    container.addEventListener('touchmove', touchEvent.touchmove, false);
    container.addEventListener('touchend', touchEvent.touchend, false);
};

export default scroll;
