const id = _.query('id') || 1;
_.request(`jianbao/applies/${id}`)
.then(resp => {
    console.debug(resp);
    const jadeTemplate = Handlebars.compile($('#jade-template').html())(resp.data);
    $('body').append($(jadeTemplate));
});