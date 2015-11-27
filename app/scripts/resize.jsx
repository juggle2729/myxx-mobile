(() => {
    let first = true;
    let resizing = null;
    function adjustBase() {
        let clientWidth = document.body.clientWidth;
        if(first && !/mobile/.test(navigator.userAgent)) {
            // 如果页面有纵向滚动条，会占去clientWidth的空间，极端情况下会导致页面布局混乱，故减去滚动条宽度 15
            clientWidth = clientWidth - 15;
            first = false;
        }
        document.querySelector('html').style['font-size'] = (clientWidth / 10) + 'px';
        resizing = null;
    }
    adjustBase();
    window.onresize = function() {
        if (resizing) {
            clearTimeout(resizing);
        }
        resizing = setTimeout(adjustBase, 50);
    };
})();
