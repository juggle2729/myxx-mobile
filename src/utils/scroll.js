import { EventEmitter } from 'events'

const scroll = new EventEmitter();

const touchEvent = {
    sPos: { x: 0, y: 0 },
    mPos: { x: 0, y: 0 },
    control: false,
    threshold: 60,
    preventDefault: false,
    touchstart: (evt) => {
        const point = evt.touches ? evt.touches[0] : evt;

        touchEvent.sPos.x = point.screenX;
        touchEvent.sPos.y = point.screenY;
    },
    touchmove: (evt) => {
        evt.preventDefault();
        touchEvent.control = true;

        var point = evt.touches ? evt.touches[0] : evt;
        touchEvent.mPos.x = point.screenX;
        touchEvent.mPos.y = point.screenY;
    },
    touchend: (evt) => {
        if (touchEvent.control) {
            const xDiff = touchEvent.mPos.x - touchEvent.sPos.x;
            const yDiff = touchEvent.mPos.y - touchEvent.sPos.y;

            if (Math.abs(xDiff) < touchEvent.threshold && Math.abs(yDiff) < touchEvent.threshold) {
                touchEvent.control = false;
                return;
            }

            if (Math.abs(xDiff) > Math.abs(yDiff))  {
                scroll.emit('scroll', xDiff > 0 ? 'right' : 'left');
            } else {
                scroll.emit('scroll', yDiff > 0 ? 'down' : 'up');
            }

            touchEvent.control = false;
        }
    }
};

scroll.init = () => {
    const doc = window.document;

    doc.addEventListener('touchstart', touchEvent.touchstart, false);
    doc.addEventListener('touchmove', touchEvent.touchmove, false);
    doc.addEventListener('touchend', touchEvent.touchend, false);
};

scroll.preventDefault = (isPrevent) => {
    "use strict";

}

// scroll.init();

export default scroll;
