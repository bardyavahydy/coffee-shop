const $ = document
const themeBtnElms = $.querySelectorAll('.theme-btn')
const themeSvgElm = themeBtnElms[0].querySelector('svg')
const menuHamburgerElm = $.querySelector('.menu-hamburger')
const overlayElm = $.querySelector('.overlay')
const mobileMenuElm = $.querySelector('.mobile-menu')
const crossMenuElm = $.querySelector('.cross-menu')
const storeChevronBtnElm = $.querySelector('.store-chevron-btn')
const storeChevronSvgElm = storeChevronBtnElm.querySelector('svg')
const subMenuMobileElm = $.querySelector('.sub-menu-mobile')
const shoppingCartSvgMobileElm = $.querySelector('.shopping-cart-svg-mobile')
const shoppingCartMobileElm = $.querySelector('.shopping-cart-mobile')
const crossShoppingCartMobileElm = $.querySelector('.cross-shopping-cart-mobile')
const titleOfTheHomeSection = $.querySelector('.arabica-coffee')
const swiperButtonNextBtn = $.querySelector('.swiper-button-next-custom')
const swiperButtonPrevBtn = $.querySelector('.swiper-button-prev-custom')
const numberOfSlides = $.querySelector('.swiper-wrapper').childElementCount

let theme = null
let slide = null;

// FUNCTIONS

(() =>{
    if(window.innerWidth >= 1280) slide = 4
    else if(window.innerWidth >= 640) slide = 3
    else if(window.innerWidth >= 426) slide = 2
    else slide = 1
})()

const setTheme = () =>{
    if($.documentElement.classList.contains('dark')) setLightTheme()
    else setDarkTheme()
}

const setLightTheme = () =>{
    $.documentElement.classList.remove('dark')
    SaveTheThemeToLocalStorage('light')
    themeSvgElm.innerHTML = '<use href="#moon-svg"></use>'
    themeBtnElms[1].innerHTML = `
        <svg class="size-5">
            <use href="#moon-svg"></use>
        </svg>
        تم تیره
    `
}

const setDarkTheme = () =>{
    $.documentElement.classList.add('dark')
    SaveTheThemeToLocalStorage('dark')
    themeSvgElm.innerHTML = '<use href="#sun-svg"></use>'
    themeBtnElms[1].innerHTML = `
        <svg class="size-5">
            <use href="#sun-svg"></use>
        </svg>
        تم روشن
    `
}

const SaveTheThemeToLocalStorage = (data) => localStorage.setItem('theme', data)

const setHeightForSubMenuInMobile = (target) =>{
    let parentElm = target.parentNode 
    if(subMenuMobileElm.style.height){
        subMenuMobileElm.style.height = null
        parentElm.classList.remove('text-orange-300')
    }
    else{
        subMenuMobileElm.style.height = `${subMenuMobileElm.scrollHeight}px` 
        parentElm.classList.add('text-orange-300')
    }
}

const settingClassesForOverlayElm = (initialOpacity, initialVisibility, secondaryOpacity, secondaryVisibility) =>{
    overlayElm.classList.remove(initialOpacity, initialVisibility)
    overlayElm.classList.add(secondaryOpacity, secondaryVisibility)
}

const settingClassesForMenuOrShoppingCart = (elm, initialCoordinatesX, secondaryCoordinatesX) =>{
    elm.classList.remove(initialCoordinatesX)
    elm.classList.add(secondaryCoordinatesX)
}

const showMobileMenuOrSoppingCart = (elm, initialCoordinatesX, secondaryCoordinatesX) =>{
    settingClassesForOverlayElm('opacity-0', 'invisible', 'opacity-100','visible')
    setTimeout(() => settingClassesForMenuOrShoppingCart(elm, initialCoordinatesX, secondaryCoordinatesX), 250);
}

const hideMobileMenuOrSoppingCart = (elm, initialCoordinatesX, secondaryCoordinatesX) =>{
    settingClassesForMenuOrShoppingCart(elm, initialCoordinatesX, secondaryCoordinatesX)
    setTimeout(() => settingClassesForOverlayElm('opacity-100', 'visible', 'opacity-0','invisible'), 250);
}

// typewriter.js

var typewriter = new Typewriter(titleOfTheHomeSection, {
    loop: true,
    delay: 150,
    deleteSpeed: 150
  });
  
  typewriter
    .pauseFor(2500)
    .typeString('قهوه عربیکا تانزانیا')
    .pauseFor(2500)
    .start();

// Swiper.js

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: slide,
    spaceBetween: 14,
    autoplay: {
        pauseOnMouseEnter: true,
        delay: 2500,
    },
    breakpoints: {
        768: {
            spaceBetween: 20,
        },
    },
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
    },
});

swiper.on('slideChange', function() {
    let realIndex = swiper.realIndex;
    if(realIndex == 0) swiperButtonPrevBtn.classList.add('swiper-button-custom-disabled')
    else swiperButtonPrevBtn.classList.remove('swiper-button-custom-disabled')
});

swiper.on('slideChange', function() {
    let realIndex = swiper.realIndex;
    if(realIndex == (numberOfSlides - slide)) swiperButtonNextBtn.classList.add('swiper-button-custom-disabled')
    else swiperButtonNextBtn.classList.remove('swiper-button-custom-disabled')
});

// EVENTS

menuHamburgerElm.addEventListener('click', () => showMobileMenuOrSoppingCart(mobileMenuElm, '-right-64', 'right-0'))

shoppingCartSvgMobileElm.addEventListener('click', () => showMobileMenuOrSoppingCart(shoppingCartMobileElm, '-left-64', 'left-0'))

overlayElm.addEventListener('click', () =>{
    if(mobileMenuElm.classList.contains('right-0')) hideMobileMenuOrSoppingCart(mobileMenuElm, 'right-0', '-right-64')
    else hideMobileMenuOrSoppingCart(shoppingCartMobileElm, 'left-0', '-left-64')
})

crossMenuElm.addEventListener('click', () => hideMobileMenuOrSoppingCart(mobileMenuElm, 'right-0', '-right-64'))
crossShoppingCartMobileElm.addEventListener('click', () => hideMobileMenuOrSoppingCart(shoppingCartMobileElm, 'left-0', '-left-64'))

themeBtnElms.forEach(themeBtnElm => {
    themeBtnElm.addEventListener('click', setTheme)
})

storeChevronBtnElm.addEventListener('click', (event) =>{
    storeChevronSvgElm.classList.toggle('rotate-180')
    setHeightForSubMenuInMobile(event.currentTarget)
})

window.addEventListener('load', () =>{
    if(!localStorage.theme || localStorage.theme === 'light') setLightTheme()
    else setDarkTheme()
})