/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['milkyway', 'sans-serif'], // 사용자 정의 폰트 추가
      },
      colors: {
        'my-color': '#00FF7F',
        'primary': '#81CDFF',
        'primary_deep': '#21A6FF',
        'sub_yel': '#FFF387',
        'sub_yel_deep': '#FFE500',
        'sub_sal': '#FFBD99',
        'gray_01': '#F2F2F2',
        'gray_02': '#D9D9D9',
        'gray_03': '#A6A6A6',
        'gray_04': '#666',
        'black': '#000',
        'white': '#fff'
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}