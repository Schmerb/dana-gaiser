'use strict';

const state = {
    isMobile: false
};



// SELECTOR CONSTANTS
// NAV
const BURGER_BTN      = '.burger-btn';
const BURGER_ICON     = '.burger-icon';
const NAV             = '.nav';
const INTRO           = '.intro';
const SERVICES        = '.services';
const EXPERIENCES     = '.experiences';
const CONTACTME       = '.contact';
const HEADER_MORE_BTN = '.header-more';

// INTRO
const INTRO_SECTION = '#intro-section';
const INTRO_ARROW   = '.intro-arrow';
const EMAIL_BTN     = '.email-link';

// SERVICES
const SERVICES_SECTION = '#services';
const CIRCLE           = '.circle';
const CONSULTING       = '.consulting';
const PAIRINGS         = '.pairings';
const TASTINGS         = '.tastings';
const SERVICE_ARROW    = '.service-arrow';

// EXPERIENCES
const EXPERIENCES_SECTION = '#experiences';
const EXP_ARROW           = '.exp-arrow';

// INSTAGRAM
const INSTAGRAM_SCETION = '#instagram';

// CONTACT
const CONTACT_SECTION = '#contact-section';

//FOOTER
const SOCIAL_LINKS  = '.social-links';
const UP_ARROW      = '.arrow-up';




//================================================================================
// HTML Template literals
//================================================================================


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// returns instagram feed image template
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function getImgTemplate(entry) {
    let caption  = entry.caption ? entry.caption.text : null,
        created  = entry.created_time,
        id       = entry.id,
        link     = entry.link,
        location = entry.location ? entry.location.name : null,
        type     = entry.type,
        url      = entry.images.standard_resolution.url,
        likes    = entry.likes.count;
    
    return `
            <a class="insta-link" href="${link}" target="_blank">
                <div class="insta-img-wrap">
                    <div class="likes">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        ${likes}
                    </div>
                    <div class="insta-img" 
                        id="${id}"
                        data-url="${url}"
                        data-created="${created}"
                        data-link="${link}"
                        data-location="${location}"
                        data-likes="${likes}"
                        data-img-id="${id}"
                    ></div>
                    <div class="caption">
                        ${caption !== null ? caption : ''}
                    </div>
                </div>
            </a>`;
}


//================================================================================
// DOM / Display functions
//================================================================================

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// displays instagram feed images to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function displayInstaImages(feed) {
    let images = feed.items.map(entry => getImgTemplate(entry));
    $('.insta-content').append(images.join(''));
    $('.insta-img').each((index, el) => {
        let url = $(el).attr('data-url');
        $(el).css({background: `url('${url}')`, 'background-size': 'cover', height: '290px'});
    });
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Expands and collapses mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {

    $('.menu-list').add($(BURGER_ICON))
                   .toggleClass('open');
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// closes slide menu and allows scrolling on body
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function closeMenu() {
    $('body').removeClass('no-scroll');
    $('.menu-list').removeClass('open');
    $(BURGER_ICON).removeClass('open');
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Reveals service info on center hover and hides others
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function revealServices(reveal = true) {
    let scrollTop  = $(window).scrollTop();
    let middle     = $(window).height() / 2;
    let consulting = $(CONSULTING).offset().top - scrollTop,
        pairings   = $(PAIRINGS).offset().top - scrollTop,
        tastings   = $(TASTINGS).offset().top - scrollTop;

    let $tastingsP   = $(TASTINGS).siblings('.info'),
        $consultingP = $(CONSULTING).siblings('.info'),
        $pairingsP   = $(PAIRINGS).siblings('.info');
    
    let $pairP_consultP  = $pairingsP.add($consultingP),
        $consultP_tasteP = $consultingP.add($tastingsP),
        $pairP_tasteP    = $pairingsP.add($tastingsP),
        $allP            = $pairingsP.add($consultingP).add($tastingsP);
    
    let $pair_consult  = $(PAIRINGS).add(CONSULTING),
        $consult_taste = $(CONSULTING).add(TASTINGS),
        $pair_taste    = $(PAIRINGS).add(TASTINGS),
        $all           = $(PAIRINGS).add(CONSULTING).add(TASTINGS);

    if (reveal) {
        // console.log('middle:', middle);
        // console.log('consulting:', consulting, 'pairings:', pairings, 'tastings:', tastings);
        if (consulting > middle * 1.3) {
            $allP.removeClass('show');
            $all.removeClass('current');
        } else if (tastings < middle) {
            $tastingsP.addClass('show')
            $(TASTINGS).addClass('current');
            $pairP_consultP.removeClass('show');
            $pair_consult.removeClass('current');
        } else if (pairings < middle) {
            $pairingsP.addClass('show')
            $(PAIRINGS).addClass('current');
            $consultP_tasteP.removeClass('show');
            $consult_taste.removeClass('current');
        } else if (consulting < middle) {
            $consultingP.addClass('show')
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
    $circle.siblings('.info')
           .toggleClass('show');
}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Adds hidden class to all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function hide() {
    Object.values(arguments).forEach((target) => {
        $(target).addClass('hidden');
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Removes hidden class from all classes passed in as args
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function show() {
    Object.values(arguments).forEach((target) => {
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


function getInstaFeed(maxId = '') {
    $.ajax({
        url: `/insta?maxId=${maxId}`,
        type: 'GET',
        dataType: 'json',
        success: res => {
            displayInstaImages(res);
        },
        error: () => {

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
        dots: false,
        arrows: true,
        infinite: false,
        speed: 2400,
        slidesToShow: 4,
        slidesToScroll: 4,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 415,
                settings: {
                    speed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'ease-in-out'
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
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
        let width = parseInt($('body').css('width'));
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
        section : ".s-section",
        sectionName : "section-name",
        interstitialSection : "partial",
        easing: "easeOutExpo",
        scrollSpeed: 2000,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: false,
        overflowScroll: true,
        updateHash: true,
        touchScroll:true,
        before:function() {},
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
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
function smoothScroll(target, duration = 1200, easing = "swing", offset = 0) {
    $('body, html').animate({
        scrollTop: $(target).offset().top - offset
    }, duration, easing);
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Check screen size to determine Mobile Vs. Desktop
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSizeHandler() {
    $(document).ready(() => {
        checkSize();
        $(window).resize(checkSize);
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Called by checkSizeHandler to set state if mobile view
// or not (Portrait view)
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkSize() {
    (window.matchMedia("(max-width: 415px)").matches) ? state.isMobile = true : state.isMobile = false;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// checks scroll position and hides/shows service info on
// devices with a screen width of 737px or less
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScrollPos() {
    $(window).scroll(() => {
        if(window.matchMedia("(max-width: 737px)").matches) {
            revealServices();
        } else {
            console.log('not mobile');
        }
    });
}


//================================================================================
// Event Listeners
//================================================================================

// * * * * * * * * *
//   NAV
// * * * * * * * * *

// Burger icon click
function burgerIconClick() {
    $(BURGER_BTN).on('click', e => {
        e.preventDefault();
        toggleMobileMenu();
    });
}

// all nav item clicks
function navItemClick() {
    $('.menu-list a').on('click', e => {
        e.preventDefault();
        closeMenu();
    });
}

// intro item
function introClick() {
    $(INTRO).on('click', e => {
        e.preventDefault();
        smoothScroll(INTRO_SECTION, 2000, 'easeInOutQuart');
    });
}

// service item
function servicesClick() {
    $(SERVICES).on('click', e => {
        e.preventDefault();
        setTimeout(function() {
            smoothScroll(SERVICES_SECTION, 2000, 'easeInOutQuart');
        }, 400);
    });
}

// experiecnes item
function experiencesNavClick() {
    $(EXPERIENCES).on('click', e => {
        e.preventDefault();
        setTimeout(function() {
            smoothScroll(EXPERIENCES_SECTION, 2000, 'easeInOutQuart');
        }, 400);
    });
}

// more BTN
function checkMoreClick() {
    $(HEADER_MORE_BTN).on('click', e => {
        e.preventDefault();
        smoothScroll(INTRO_SECTION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   INTRO
// * * * * * * * * *

// intro more BTN
function introMoreClick() {
    $(INTRO_ARROW).on('click', e => {
        e.preventDefault();
        smoothScroll(SERVICES_SECTION, 2000, 'easeInOutQuart');
    });
}

// email aside click
function emailBtnClick() {
    $(EMAIL_BTN).on('click', e => {
        e.preventDefault();
        smoothScroll(CONTACT_SECTION, 2000,  'easeInOutQuart');
    });
}

// * * * * * * * * *
//   SERVICES
// * * * * * * * * *

// circle click
function circleClick() {
    $(CIRCLE).on('click', function(e) {
        e.preventDefault();
        toggleServiceInfo($(this));
    });
}

// service arrow click
function serviceMoreClick() {
    $(SERVICE_ARROW).on('click', e => {
        e.preventDefault();
        smoothScroll(EXPERIENCES_SECTION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   EXPERIENCES
// * * * * * * * * *

// exp arrow click
function expMoreClick(){
    $(EXP_ARROW).on('click', e => {
        e.preventDefault();
        smoothScroll(INSTAGRAM_SCETION, 2000, 'easeInOutQuart');
    });
}


// * * * * * * * * *
//   FOOTER
// * * * * * * * * *

function upArrowClick() {
    $(UP_ARROW).on('click', e => {
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
    getInstaFeed();
    // scrollifyInit();
    // displaySlider(); // initializes slick slider
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
    footerClicks();
    init();
});
