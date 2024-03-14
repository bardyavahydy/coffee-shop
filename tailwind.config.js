/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'selector',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          xl: '0.625rem'
        }
      },
      fontFamily:{
        danaBold: 'danaBold',
        danaMedium: 'danaMedium',
        danaRegular: 'danaRegular',
        morabbaLight: 'morabbaLight',
        morabbaMedium: 'morabbaMedium',
        morabbaBold: 'morabbaBold'        
      },
      colors: {
        "brown": {
          100: '#ECE0D1',
          300: '#DBC1AC',
          600: '#967259',
          900: '#634832',
        }
      },
      boxShadow: {
        box: '0px 1px 10px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '4xl': '2rem',
        'circle': '50%'
      },
      size: {
        '8.5': '2.125rem',
      },
      letterSpacing:{
        tightest: '-.065em',
      },
      transitionProperty: {
        'height': 'height',
        'right': 'right',
        'left': 'left',
        'top': 'top',
      },
      gridTemplateColumns:{
        'auto-fit-lg': 'repeat(auto-fit, minmax(237px, 1fr))',
        'auto-fit': 'repeat(auto-fit, minmax(190px, 1fr))'
      },
      lineHeight:{
        '12': '3rem'
      },
      spacing: {
        '4.5': '1.125rem',
      }  
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  plugins: [
    function({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('grandchild', '& > * > *')
    }
  ],
}

