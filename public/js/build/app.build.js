'use strict';

var state = {
    isMobile: false
};

// SELECTOR CONSTANTS
// NAV
var BURGER_BTN = '.burger-btn';
var BURGER_ICON = '.burger-icon';
var NAV = '.nav';
var SERVICES = '.services';
var EXPERIENCES = '.experiences';
var CONTACTME = '.contact';
var CHECK_MORE_BTN = '.check-more';

// INTRO
var INTRO_SECTION = '.intro-section';

// SERVICES
var CIRCLE = '.circle';

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
// Expands and collapses mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {

    $('.menu-list').add($(BURGER_ICON)).toggleClass('open');
    $('body').toggleClass('no-scroll');

    // if($(NAV).hasClass('expand')) {
    //     $(NAV).add(INTRO_SECTION)
    //           .add(SOCIAL_LINKS)
    //           .add(BURGER_ICON)
    //           .removeClass('expand');
    //     setTimeout(function() {
    //         $(NAV).removeClass('show');
    //     }, 400);
    // } else {
    //     $(NAV).addClass('show');
    //     setTimeout(function() {
    //         $(NAV).add(INTRO_SECTION)
    //               .add(SOCIAL_LINKS)
    //               .add(BURGER_ICON)
    //               .addClass('expand');      
    //     }, 100);
    // }
}

function closeMenu() {
    if ($('body').hasClass('no-scroll')) {
        $('body').removeClass('no-scroll');
    }
    if ($('.menu-list').hasClass('open')) {
        $('.menu-list').removeClass('open');
    }
    if ($(BURGER_ICON).hasClass('open')) {
        $(BURGER_ICON).removeClass('open');
    }
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

// ================================================================================
// Slick Carousel
// ================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * 
// Drone banner carousel
// * * * * * * * * * * * * * * * * * * * * * * * * * 
function initSlider() {
    $(SLIDER).slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 2400,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 860,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 580,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 415,
            settings: {
                speed: 2000,
                slidesToShow: 1,
                slidesToScroll: 1,
                cssEase: 'ease-in-out'
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
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
// Utility functions
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gives a smooth animation to page navigation bringing the 
// target element to the top of the window
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function smoothScroll(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1200;
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration);
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
    parseInt($("body").css('width')) <= 414 ? state.isMobile = true : state.isMobile = false;

    if (parseInt($("body").css('width')) >= 720) {
        $(NAV).add(INTRO_SECTION).add(SOCIAL_LINKS).add(BURGER_ICON).removeClass('expand');
    }
}

//================================================================================
// Event Listeners
//================================================================================

// Burger icon click
function burgerIconClick() {
    $(BURGER_BTN).on('click', function (e) {
        e.preventDefault();
        toggleMobileMenu();
    });
}

// service item
function servicesClick() {
    $(SERVICES).on('click', function (e) {
        e.preventDefault();
        closeMenu();
        setTimeout(function () {
            smoothScroll('#services');
        }, 400);
    });
}

// experiecnes item
function experiencesClick() {
    $(EXPERIENCES).on('click', function (e) {
        e.preventDefault();
        closeMenu();
        setTimeout(function () {
            smoothScroll('#experiences');
        }, 400);
    });
}

// more BTN
function checkMoreClick() {
    $(CHECK_MORE_BTN).on('click', function (e) {
        e.preventDefault();
        smoothScroll('#intro-section');
    });
}

// circle click
function circleClick() {}
$(CIRCLE).on('click', function (e) {
    e.preventDefault();
    //show service text;
});

function upArrowClick() {
    $(UP_ARROW).on('click', function (e) {
        e.preventDefault();
        smoothScroll('header');
    });
}

//================================================================================
// Event Listener Groups
//================================================================================

function navClicks() {
    burgerIconClick();
    servicesClick();
    experiencesClick();
    checkMoreClick();
}

function serviceClicks() {
    circleClick();
}

function footerClicks() {
    upArrowClick();
}

//================================================================================
// Utility and Initialization handlers
//================================================================================

function utils() {
    checkSizeHandler();
}

function init() {
    getInstaFeed();
    // displaySlider(); // initializes slick slider
    // responsiveReslick(); // tears down and reslicks slider on window resize
}

//================================================================================
// Entry point -- Main
//================================================================================

$(function () {
    utils();
    navClicks();
    footerClicks();
    init();
});