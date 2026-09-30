/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#003B73',
        darknavy: '#002B52',
        royal: '#1746D1',
        gold: '#FFD600',
        paper: '#F5F8FC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

