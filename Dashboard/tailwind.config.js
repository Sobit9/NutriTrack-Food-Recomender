/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
        animation: {
          'text-animation': 'text-animation 0.5s forwards',
          'pop-in': 'pop-in 0.6s ease-out forwards',
          appear: 'appear 1s linear forwards',
          translater: 'translater 0.6s ease-in-out forwards',
        translater2: 'translater2 0.6s ease-in-out forwards',
        abtext: 'abtext 1s linear forwards',
        abtext2: 'abtext2 1s linear forwards',
        },
        keyframes: {
          'pop-in': {
          '0%': { opacity: 0, transform: 'translate(-4rem) scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
          'text-animation': {
            '0%': { transform: 'scale(1)', letterSpacing: 'normal' },
            '50%': { transform: 'scale(1.2)', letterSpacing: '2px' },
            '100%': { transform: 'scale(1)', letterSpacing: 'normal' },
          },
          'translater': {
            '0%': { opacity: 0, transform: 'scale(0.5) translateX(-100px)' },
            '100%': { opacity: 1, transform: 'scale(1) translateX(0)' },
          },
          'translater2': {
            '0%': { opacity: 0, transform: 'scale(0.5) translateX(100px)' },
            '100%': { opacity: 1, transform: 'scale(1) translateX(0)' },
          },
          'abtext': {
            '0%': { opacity: 0, transform: 'scale(0.5) translateX(100px)' },
            '50%': { opacity: 0.5, transform: 'translateX(0)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
          'abtext2': {
            '0%': { opacity: 0, transform: 'translateX(-100px)' },
            '100%': { opacity: 1, transform: 'translateX(0)' },
          },
        },
        screens: {
            'sm': '800px', // Custom small breakpoint
            'md': '1000px', // Custom medium breakpoint
          },
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth : "thin",
          scrollbarColor : "#678479 #99ada6"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar" : {
            width: "3px"
          },
          "&::-webkit-scrollbar-track": {
            background: "white"
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

