
        $(".hamburger-toggle").click(function () {
            $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
            $(".hamburger-toggle").toggleClass("is-opened");
        });

$(".hamburger-toggle-2").click(function () {
    $("body").toggleClass("sidebar-is-reduced-2 sidebar-is-expanded-2");
    $(".hamburger-toggle-2").toggleClass("is-opened-2");
});

$(".js-menu li").click(function () {
    //$(this).siblings().removeClass("active");
    $('.fa-angle-up').removeClass('fa-angle-up').addClass('fa-angle-down');
    if ($(this).find('.c-menu__submenu:visible').length == 0) {
        $(this).find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up');
    }
    else {
        $(this).find('.fa-angle-up').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    $(".c-menu__item").removeClass("is-active");
    $(this).addClass("is-active");
    $('.js-menu li').not(this).find('ul').hide();
    $(this).find(".c-menu__submenu").toggle();
});
$(".one").scroll(function () {
    var scroll = $(".one").scrollTop();
    if (scroll >= 30) {
        $(".header").addClass("change");
    }
    else {
        $(".header").removeClass("change");
    }
});

//$(function () { jQuery.scrollSpeed(50, 900); });
