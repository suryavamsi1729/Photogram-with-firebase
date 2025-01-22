const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
		transformOrigin: {			
			'top-center': 'top center',	
			'bottom-center': 'bottom center',
		},
		rotate: {
			'0': '0deg',
			'30': '30deg',
			'60': '60deg',
			'120': '120deg',
			'150': '150deg',
			'210': '210deg',
			'240': '240deg',
			'300': '300deg',
			'330': '330deg',
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		keyframes:{
			scaleinout :{
				'0%,100%':{transform:'scale(1)'},
				'50%':{transform:'scale(1.25)'},
			},
			dropdownAnimation:{
				'0%,20%':{
					transform:'translatex(-16px)',
					opacity: '0',
				},
				'100%':{
					transform:'translatex(0px)',
					opacity: '1',
				}
			}
		},
		animation:{
			scaleinout: 'scaleinout 1.5s ease-in-out infinite',
			dropdownAnimation: 'dropdownAnimation 0.4s ease-in-out',
			dropdownRemoveAnimation : 'dropdownAnimation 0.5s ease-in-out reverse',
		},

  	}
  },
  plugins: [require("tailwindcss-animate")],
}
