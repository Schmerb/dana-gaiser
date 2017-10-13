'use strict';

const state = {
    isMobile: false,
    yPos: 0,
    up: false,
    baseYPos: 0,
    downBaseYPos: 0,
    images: []
};
 

// SELECTOR CONSTANTS
// NAV
const HEADER          = '.main-header';
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
const SLIDER              = '.uncorked-slider';
   
// INSTAGRAM
const INSTAGRAM_SCETION = '#instagram';

// CONTACT
const CONTACT_SECTION = '#contact-section';
const CONTACT_FORM    = '#contact-form';

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
// Expands and collapses mobile menu
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function toggleMobileMenu() {
    $('.menu-list').add($(BURGER_ICON))
                   .toggleClass('open');
    $('body').toggleClass('no-scroll');

    if(!$('.menu-list').hasClass('open') && $('body').hasClass('no-scroll')) {
        $('body').removeClass('no-scroll');
    }
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
// displays instagram feed images to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function displayInstaImages(feed) {
    let images = feed.items.map(entry => getImgTemplate(entry));
    state.images = images;
    let toScreen = [];
    for(let i = 0; i < 8; i++) {
        toScreen.push(images[i]);
        console.log('inside');
    }
    $('.insta-content').append(toScreen.join(''));
    $('.insta-img').each((index, el) => {
        let url = $(el).attr('data-url');
        $(el).css({background: `url('${url}')`, 'background-size': 'cover', height: '290px'});
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Displays more instagram feed images to screen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function displayMoreInstaImages() {
    let toScreen = [];
    for(let i = 8; i < 16; i++) {
        toScreen.push(state.images[i]);
        console.log('inside');
    }
    $('.insta-content').append(toScreen.join(''));
    $('.insta-img').each((index, el) => {
        let url = $(el).attr('data-url');
        $(el).css({background: `url('${url}')`, 'background-size': 'cover', height: '290px'});
    });
    hide('.insta-more-btn');
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

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Gets instagram feed images
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
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
        success: res => {
            $form[0].reset();
            alert('Success! Your email has been sent.');
        },
        error: (jqXHR, status, err) => {
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
        variableWidth: false,
        prevArrow: $('.icon-chevron-thin-left'),
        nextArrow: $('.icon-chevron-thin-right'),
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    arrows: false
                }
            }
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
    (window.innerWidth <= 414) ? state.isMobile = true : state.isMobile = false;
    
    // removes vertical lines from last word in row of work list 
    removeEndLines();

    // make sure that user can scroll in case menu disappears
    checkIfUserCanScroll();

    // set min/max width of forms elements
    setFormMaxWidth();
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// checks scroll position 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScrollPos() {
    $(window).scroll(() => {
        checkScreenWidth();
        fixBanner();
    });
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// hides/shows service info on
// devices with a screen width of 737px or less
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkScreenWidth() {
    if(window.innerWidth <= 737) {
        revealServices();
    } else {
        // console.log('not mobile');
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Sets form min and max width to current width
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function setFormMaxWidth() {
    let $tArea = $('textarea[name="message"]');
    let maxW = parseInt($(CONTACT_FORM).css('width'));
    $tArea.css('max-width', maxW + 'px');
}



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// fixes the banner nav on upward scroll
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function fixBanner() {
    let current = $(window).scrollTop();

    if(current > 200) {
        $('.banner').addClass('fixed');
    } else {
        $('.banner').removeClass('fixed');
    }


    // if current yPos is less than previous, scrolling upwards
    if(current <= state.yPos) {
        
        // scrolled upwards for 10 or more px
        if(state.baseYPos - current >= 2) {
        }
        $('.banner').addClass('show');

        // just started going up, keep track of beginning of upwards distance
        if(state.up === false) {
            state.baseYPos = current;
        }
        state.up = true;
    } else {// scrolling downwards

        // just started going dowm, keep track of beginning of downwards distance
        if(state.up === true) {
            state.downBaseYPos = current; 
        }

        // scrolled downwards for 15 or more px
        if(current - state.downBaseYPos >= 35) {
            $('.banner').removeClass('show');
        }
        
        state.up = false;
        state.baseYPos = 0;
    }
    state.yPos = current;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// removes vertical lines from word on the end of each row
// in previous work list, recalculating on window resize
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function removeEndLines() {
    // loop through each <li> and get its scroll yPos.
    // when yPos increases, push previous <li> to an array
    // once loop finishes, apply style to each el in array
    // to remove | 
    $('.work-list li').removeClass('end-of-row');
    let places = $('.work-list li');
    let endEls = [];
    let prevyPos = 0;
    places.each((index, el) => {
        let yPos = $(el).offset().top;
        if(yPos > prevyPos && index - 1 >= 0) {
            endEls.push(places[index - 1]);
        }
        prevyPos = yPos;
    });
    endEls.forEach(el => {
        $(el).addClass('end-of-row');
    });
}   

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// make sure that user can scroll in case menu disappears
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
function checkIfUserCanScroll() {
    if($('.menu-list').hasClass('open') && !$('.banner').hasClass('show')) {
        $('body').removeClass('no-scroll');
    }
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
    $(INTRO).on('click', function(e) {
        e.preventDefault();
        let offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function() {
            smoothScroll(INTRO_SECTION, 2000, 'easeInOutQuart', offset);
        }, 400);
    });
}

// service item
function servicesClick() {
    $(SERVICES).on('click', function(e) {
        e.preventDefault();
        let offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function() {
            smoothScroll(SERVICES_SECTION, 2000, 'easeInOutQuart', offset);
        }, 400);
    });
}

// experiecnes item
function experiencesNavClick() {
    $(EXPERIENCES).on('click', function(e) {
        e.preventDefault();
        let offset = $(this).parents('.f-nav').length > 0 ? 80 : 0;
        setTimeout(function() {
            smoothScroll(EXPERIENCES_SECTION, 2000, 'easeInOutQuart', offset);
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

// email click
function emailBtnClick() {
    $(EMAIL_BTN).on('click', function(e) {
        e.preventDefault();
        let offset = $(this).parents('.main-footer').length > 0 ? 80 : 0;
       setTimeout(function() {
            smoothScroll(CONTACT_SECTION, 2000,  'easeInOutQuart', offset);
            $(CONTACT_FORM).find('input[name=name]').focus();
       }, 400);
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
function expMoreClick() {
    $(EXP_ARROW).on('click', e => {
        e.preventDefault();
        smoothScroll(INSTAGRAM_SCETION, 2000, 'easeInOutQuart');
    });
}

// * * * * * * * * *
//   INSTAGRAM
// * * * * * * * * *

function moreInstaImageClick() {
    $('.insta-more-btn').on('click', e => {
        e.preventDefault();
        displayMoreInstaImages();
    });
}

// * * * * * * * * *
//   CONTACT FORM
// * * * * * * * * *

// form submit
function contactFormSubmit() {
    $(CONTACT_FORM).on('submit', function(e) {
        e.preventDefault();
        sendEmail($(this));
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

// Instagram
function instagramClicks() {
    moreInstaImageClick();
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
    instagramClicks();
    contactFormClicks();
    footerClicks();
    init();
});
