/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
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
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
}

