'use strict';

var state = {
    isMobile: false,
    yPos: 0,
    up: false,
    baseYPos: 0
};

// SELECTOR CONSTANTS
// NAV
var HEADER = '.main-header';
var BURGER_BTN = '.burger-btn';
var BURGER_ICON = '.burger-icon';
var NAV = '.nav';
var INTRO = '.intro';
var SERVICES = '.services';
var EXPERIENCES = '.experiences';
var CONTACTME = '.contact';
var HEADER_MORE_BTN = '.header-more';

// INTRO
var INTRO_SECTION = '#intro-section';
var INTRO_ARROW = '.intro-arrow';
var EMAIL_BTN = '.email-link';

// SERVICES
var SERVICES_SECTION = '#services';
var CIRCLE = '.circle';
var CONSULTING = '.consulting';
var PAIRINGS = '.pairings';
var TASTINGS = '.tastings';
var SERVICE_ARROW = '.service-arrow';

// EXPERIENCES
var EXPERIENCES_SECTION = '#experiences';
var EXP_ARROW = '.exp-arrow';
var SLIDER = '.uncorked-slider';

// INSTAGRAM
var INSTAGRAM_SCETION = '#instagram';

// CONTACT
var CONTACT_SECTION = '#contact-section';
var CONTACT_FORM = '#contact-form';

//FOOTER
var SOCIAL_LINKS = '.social-links';
var UP_ARROW = '.arrow-up';

//================================================================================
// HTML Template literals
//================================================================================


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns instagram feed image template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getImgTemplate(entry) {
    var caption = entry.caption ? entry.caption.text : null,
        created = entry.created_time,
        id = entry.id,
        link = entry.link,
        location = entry.location ? entry.location.name : null,
        type = entry.type,
        url = entry.images.standard_resolution.url,
        likes = entry.likes.count;

    return '\n            <a class="insta-link" href="' + link + '" target="_blank">\n                <div class="insta-img-wrap">\n                    <div class="likes">\n                        <i class="fa fa-heart-o" aria-hidden="true"></i>\n                        ' + likes + '\n                    </div>\n                    <div class="insta-img" \n                        id="' + id + '"\n                        data-url="' + url + '"\n                        data-created="' + created + '"\n                        data-link="' + link + '"\n                        data-location="' + location + '"\n                        data-likes="' + likes + '"\n                        data-img-id="' + id + '"\n                    ></div>\n                    <div class="caption">\n                        ' + (caption !== null ? caption : '') + '\n                    </div>\n                </div>\n            </a>';
}

//================================================================================
// DOM / Display functions
//================================================================================


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Expands and collapses mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {
    $('.menu-list').add($(BURGER_ICON)).toggleClass('open');
    $('body').toggleClass('no-scroll');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// closes slide menu and allows scrolling on body
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeMenu() {
    $('body').removeClass('no-scroll');
    $('.menu-list').removeClass('open');
    $(BURGER_ICON).removeClass('open');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets height of background image on page load and sets 
// the max height to the current height
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixBackgroundImgHeight() {
    state.isMobile ? $(HEADER).css('max-height', $(HEADER).css('height')) : null;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Reveals service info on center hover and hides others
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function revealServices() {
    var reveal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var scrollTop = $(window).scrollTop();
    var middle = $(window).height() / 2;
    var consulting = $(CONSULTING).offset().top - scrollTop,
        pairings = $(PAIRINGS).offset().top - scrollTop,
        tastings = $(TASTINGS).offset().top - scrollTop;

    var $tastingsP = $(TASTINGS).siblings('.info'),
        $consultingP = $(CONSULTING).siblings('.info'),
        $pairingsP = $(PAIRINGS).siblings('.info');

    var $pairP_consultP = $pairingsP.add($consultingP),
        $consultP_tasteP = $consultingP.add($tastingsP),
        $pairP_tasteP = $pairingsP.add($tastingsP),
        $allP = $pairingsP.add($consultingP).add($tastingsP);

    var $pair_consult = $(PAIRINGS).add(CONSULTING),
        $consult_taste = $(CONSULTING).add(TASTINGS),
        $pair_taste = $(PAIRINGS).add(TASTINGS),
        $all = $(PAIRINGS).add(CONSULTING).add(TASTINGS);

    if (reveal) {
        // console.log('middle:', middle);
        // console.log('consulting:', consulting, 'pairings:', pairings, 'tastings:', tastings);
        if (consulting > middle * 1.3) {
            $allP.removeClass('show');
            $all.removeClass('current');
        } else if (tastings < middle) {
            $tastingsP.addClass('show');
            $(TASTINGS).addClass('current');
            $pairP_consultP.removeClass('show');
            $pair_consult.removeClass('current');
        } else if (pairings < middle) {
            $pairingsP.addClass('show');
            $(PAIRINGS).addClass('current');
            $consultP_tasteP.removeClass('show');
            $consult_taste.removeClass('current');
        } else if (consulting < middle) {
            $consultingP.addClass('show');
            $(CONSULTING).addClass('current');
            $pairP_tasteP.removeClass('show');
            $pair_taste.removeClass('current');
        }
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// toggles service information for circle clicked
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleServiceInfo($circle) {
    $circle.toggleClass('current');
    $circle.siblings('.info').toggleClass('show');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// displays instagram feed images to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function displayInstaImages(feed) {
    var images = feed.items.map(function (entry) {
        return getImgTemplate(entry);
    });
    $('.insta-content').append(images.join(''));
    $('.insta-img').each(function (index, el) {
        var url = $(el).attr('data-url');
        $(el).css({ background: 'url(\'' + url + '\')', 'background-size': 'cover', height: '290px' });
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    Object.values(arguments).forEach(function (target) {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    Object.values(arguments).forEach(function (target) {
        $(target).removeClass('hidden');
    });
}

//================================================================================
// API handlers 
//================================================================================


// TODO


//================================================================================
// API calls
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets instagram feed images
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getInstaFeed() {
    var maxId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    $.ajax({
        url: '/insta?maxId=' + maxId,
        type: 'GET',
        dataType: 'json',
        success: function success(res) {
            displayInstaImages(res);
        },
        error: function error() {}
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Sends email to Dana Gaiser on form submit
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function sendEmail($form) {
    hide('.error');
    $.ajax({
        url: "https://formspree.io/mikeschmerbeck@gmail.com",
        method: "POST",
        data: $form.serialize(),
        dataType: 'json',
        success: function success(res) {
            $form[0].reset();
        },
        error: function error(jqXHR, status, err) {
            // console.log({jqXHR, status, err});
            // console.log(jqXHR.responseJSON.error);
            show('.error');
            $(CONTACT_FORM).find('input[name=name]').focus();
        }
    });
}

// ================================================================================
// Slick Carousel
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone banner carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initSlider() {
    $(SLIDER).slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 600,
        // autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'linear',
        responsive: [{
            breakpoint: 736,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Intializes slider and sets height to zero
// before and unsets height after it is 'slicked'
// to avoid FOUC
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function displaySlider() {
    $('.slick-slider').css('height', '0px');
    initSlider();
    $('.slick-slider').css('height', '');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//          Destroys slick carousels
// @params   Slider element to be destroyed
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function unslick(SLIDER) {
    if ($(SLIDER).hasClass('slick-initialized')) {
        $(SLIDER).slick('unslick');
    }
}

// * * * * * * * * * * * * * * * * * * * * * * * * * 
//  Used to reslick sliders on window resize 
//  inccrease. 
//  Slick settings handles unslick for mobile 
//  but does not reslick when window size increases
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function responsiveReslick() {
    $(window).resize(function () {
        var width = parseInt($('body').css('width'));
        if (!$(SLIDER).hasClass('slick-initialized')) {
            initSlider();
        }
    });
}

//================================================================================
// Scrollify Settings
//================================================================================

function scrollifyInit() {
    $.scrollify({
        section: ".s-section",
        sectionName: "section-name",
        interstitialSection: "partial",
        easing: "easeOutExpo",
        scrollSpeed: 2000,
        offset: 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: false,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function before() {},
        after: function after() {},
        afterResize: function afterResize() {},
        afterRender: function afterRender() {}
    });
}

function move(target) {
    $.scrollify.move(target);
}

function next() {
    $.scrollify.next();
}

function prev() {
    $.scrollify.previous();
}

//================================================================================
// Utility functions
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1200;
    var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "swing";
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration, easing);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(function () {
        checkSize();
        $(window).resize(checkSize);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not (Portrait view)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    window.innerWidth <= 414 ? state.isMobile = true : state.isMobile = false;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// checks scroll position 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScrollPos() {
    $(window).scroll(function () {
        checkScreenWidth();
        fixBanner();
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// hides/shows service info on
// devices with a screen width of 737px or less
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScreenWidth() {
    if (window.innerWidth <= 737) {
        revealServices();
    } else {
        // console.log('not mobile');
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// fixes the banner nav on upward scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixBanner() {
    var current = $(window).scrollTop();

    if (current > 200) {
        $('.banner').addClass('fixed');
    } else {
        $('.banner').removeClass('fixed');
    }

    // if current yPos is less than previous, scrolling upwards
    if (current <= state.yPos) {

        // scrolled upwards for 10 or more px
        if (state.baseYPos - current >= 2) {}
        $('.banner').addClass('show');

        // just started going up, keep track of beginning of upwards distance
        if (state.up === false) {
            state.baseYPos = current;
        }
        state.up = true;
    } else {
        $('.banner').removeClass('show');

        state.up = false;
        state.baseYPos = 0;
    }
    state.yPos = current;
    // console.log(state.up ? 'up' : 'down');
}

//================================================================================
// Event Listeners
//================================================================================

// * * * * * * * * *
//   NAV
// * * * * * * * * *

// Burger icon click
function burgerIconClick() {
    $(BURGER_BTN).on('click', function (e) {
        e.preventDefault();
        toggleMobileMenu();
    });
}

// all nav item clicks
function navItemClick() {
    $('.menu-list a').on('click', function (e) {
        e.preventDefault();
        closeMenu();
    });
}

// intro item
function introClick() {
    $(INTRO).on('click', function (e) {
        e.preventDefault();
        var offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function () {
            smoothScroll(INTRO_SECTION, 2000, 'easeInOutQuart', offset);
        }, 400);
    });
}

// service item
function servicesClick() {
    $(SERVICES).on('click', function (e) {
        e.preventDefault();
        var offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function () {
            smoothScroll(SERVICES_SECTION, 2000, 'easeInOutQuart', offset);
        }, 400);
    });
}

// experiecnes item
function experiencesNavClick() {
    $(EXPERIENCES).on('click', function (e) {
        e.preventDefault();
        var offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function () {
            smoothScroll(EXPERIENCES_SECTION, 2000, 'easeInOutQuart', offset);
        }, 400);
    });
}

// more BTN
function checkMoreClick() {
    $(HEADER_MORE_BTN).on('click', function (e) {
        e.preventDefault();
        smoothScroll(INTRO_SECTION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   INTRO
// * * * * * * * * *

// intro more BTN
function introMoreClick() {
    $(INTRO_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll(SERVICES_SECTION, 2000, 'easeInOutQuart');
    });
}

// email click
function emailBtnClick() {
    $(EMAIL_BTN).on('click', function (e) {
        e.preventDefault();
        var offset = $(this).parents('.main-footer').length > 0 ? 80 : 0;
        smoothScroll(CONTACT_SECTION, 2000, 'easeInOutQuart', offset);
        $(CONTACT_FORM).find('input[name=name]').focus();
    });
}

// * * * * * * * * *
//   SERVICES
// * * * * * * * * *

// circle click
function circleClick() {
    $(CIRCLE).on('click', function (e) {
        e.preventDefault();
        toggleServiceInfo($(this));
    });
}

// service arrow click
function serviceMoreClick() {
    $(SERVICE_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll(EXPERIENCES_SECTION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   EXPERIENCES
// * * * * * * * * *

// exp arrow click
function expMoreClick() {
    $(EXP_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll(INSTAGRAM_SCETION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   CONTACT FORM
// * * * * * * * * *

// form submit
function contactFormSubmit() {
    $(CONTACT_FORM).on('submit', function (e) {
        e.preventDefault();
        sendEmail($(this));
    });
}

// * * * * * * * * *
//   FOOTER
// * * * * * * * * *

function upArrowClick() {
    $(UP_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll('header');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================

// Nav
function navClicks() {
    burgerIconClick();
    navItemClick();
    introClick();
    servicesClick();
    experiencesNavClick();
    checkMoreClick();
}

// Intro
function introClicks() {
    introMoreClick();
    emailBtnClick();
}

// Service
function serviceClicks() {
    circleClick();
    serviceMoreClick();
}

// Experience
function experienceClicks() {
    expMoreClick();
}

// Contact 
function contactFormClicks() {
    contactFormSubmit();
}

// Footer
function footerClicks() {
    upArrowClick();
}

//================================================================================
// Utility and Initialization handlers
//================================================================================

function utils() {
    checkSizeHandler();
    checkScrollPos();
}

function init() {
    checkSize();
    getInstaFeed();
    fixBackgroundImgHeight();
    // scrollifyInit();
    displaySlider(); // initializes slick slider
    // responsiveReslick(); // tears down and reslicks slider on window resize
}

//================================================================================
// Entry point -- Main
//================================================================================

$(function () {
    utils();
    navClicks();
    introClicks();
    serviceClicks();
    experienceClicks();
    contactFormClicks();
    footerClicks();
    init();
});