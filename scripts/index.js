const $ = document
const themeBtnElm = $.querySelector('.theme-btn')
const themeSvgElm = themeBtnElm.querySelector('svg')

let theme = null

const setTheme = () =>{
    if($.documentElement.classList.contains('dark')) setLightTheme()
    else setDarkTheme()
}

const setLightTheme = () =>{
    $.documentElement.classList.remove('dark')
    SaveTheThemeToLocalStorage('light')
    themeSvgElm.innerHTML = '<use href="#moon-svg"></use>'
}

const setDarkTheme = () =>{
    $.documentElement.classList.add('dark')
    SaveTheThemeToLocalStorage('dark')
    themeSvgElm.innerHTML = '<use href="#sun-svg"></use>'
}

const SaveTheThemeToLocalStorage = (data) => localStorage.setItem('theme', data)

themeBtnElm.addEventListener('click', setTheme)
window.addEventListener('load', () =>{
    if(!localStorage.theme || localStorage.theme === 'light') setLightTheme()
    else setDarkTheme()
})