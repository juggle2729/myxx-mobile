(function () {
    "use strict";

    var artistTemplate = Handlebars.compile($('#artist-template').html());
    $('.artist-page').html(artistTemplate({
        theme: '/images/artist/theme.jpg',
        head: '/images/artist/head.png',
        name: '杨曦',
        grade: '江苏省工艺大师'
    }));
})();
