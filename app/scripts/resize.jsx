(() => {
    let resizing = null;
    function adjustBase() {
        const clientWidth = document.body.clientWidth;
        document.querySelector('html').style['font-size'] = (clientWidth / 10) + 'px';
        resizing = null;
    }
    adjustBase();
    window.onresize = function() {
        if (resizing) {
            clearTimeout(resizing);
        }
        resizing = setTimeout(adjustBase, 100);
    };
})();
