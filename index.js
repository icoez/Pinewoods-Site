window.onload = function(){
    const menuButton = $('.hamburger');
    const mobileNav = $('.mobile-nav');
    menuButton.click(function(){
        $(menuButton).toggleClass('is-active');
        $(mobileNav).toggleClass('is-active');
    })
}