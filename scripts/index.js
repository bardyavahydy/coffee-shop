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

let theme = null

// FUNCTIONS

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

const showMobileMenuOrSoppingCart = (elm) =>{
    settingClassesForOverlayElm('opacity-0', 'invisible', 'opacity-100','visible')
    setTimeout(() => settingClassesForMenuOrShoppingCart(elm, '-right-64', 'right-0'), 250);
}

const hideMobileMenuOrSoppingCart = (elm) =>{
    settingClassesForMenuOrShoppingCart(elm, 'right-0', '-right-64')
    setTimeout(() => settingClassesForOverlayElm('opacity-100', 'visible', 'opacity-0','invisible'), 250);
}

// EVENTS

menuHamburgerElm.addEventListener('click', () => showMobileMenuOrSoppingCart(mobileMenuElm))

overlayElm.addEventListener('click', () =>{
    if(mobileMenuElm.classList.contains('right-0')) hideMobileMenuOrSoppingCart(mobileMenuElm)
})

crossMenuElm.addEventListener('click', () => hideMobileMenuOrSoppingCart(mobileMenuElm))

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