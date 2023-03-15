/* eslint-disable no-undef */
/* eslint-disable indent */
window.onload = function () {
    let aside = document.createElement('aside');
    const form = document.querySelector('form');
    form.append(aside);
    aside.setAttribute('id', 'melding');

    document.querySelector('aside').classList.add('animatietijd');
    document.querySelector('aside').innerHTML = '<img src="images/filter.gif">';
};


