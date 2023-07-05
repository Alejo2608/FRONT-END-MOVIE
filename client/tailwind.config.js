/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'test': "url('../src/Home/test.jpg')",
      }
    },
    textColor: { 
      'titNav':"#04740c",
    },
  },
  plugins: [
  ],
}