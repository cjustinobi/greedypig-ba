import { join } from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
  //   join(
  //     __dirname,
  //     '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
  //   ),
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
     extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'gradient-radial2': 'radial-gradient(#5D0976, #300043, #2B0142)',
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-custom': 'linear-gradient(to right, #AE62EE, #FE8A7C)',

      },
      colors: {
        'primary-blue': '#504EBB',
        'dark-blue': '#040419',
        'dark-text': '#09324C',
        'custom-purple': '#AE62EE',
        'light-purple': '#9395D3',
        'custom-orange': '#FE8A7C',
        'custom-orange2': '#E87937',
        'bcolor': '#05051F',
        'custom-gray': '#21242F',
        'custom-gray2': '#373C51',
        'custom-gray3': '#4B5163',
        'custom-gray4': '#9CA0AF',
        'custom-gray5': '#8A8D94',
        'custom-gray6': '#262932',
        'custom-gray7': '#1A1E29',
        'custom-gray8': '#282E3C',
      },
      fontFamily: {
        'Coiny-Regular': ['Coiny-Regular'],
        'Inter_18pt-SemiBold': ['Inter_18pt-SemiBold'],
        'Inter_18pt-Medium': ['Inter_18pt-Medium'],
        'WorkSans-ExtraBold': ['WorkSans-ExtraBold'],
        'WorkSans-Regular': ['WorkSans-Regular'],
        'WorkSans-Medium': ['WorkSans-Medium'],
        'WorkSans-SemiBold': ['WorkSans-SemiBold'],
        'WorkSans-Bold': ['WorkSans-Bold'],
      },
  },
  },
  plugins: [
    // require('@tailwind css/typography'),
    // require('tw-elements/dist/plugin.cjs')
  ]
};
export default config;
