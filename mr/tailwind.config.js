/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Custom small screen size if needed
      },
      colors: {
        'dark-black': '#000000',
        'blue-shade': '#003366', // Example blue shade
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      fontFamily: {
        // 'Playfair Display' example. Replace with your preferred font.
        serif: ['"Playfair Display"', 'serif'], 
      },
      // ...
    },
  },
  // ...
};



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Yeh line zaruri hai
  ],
  theme: {
    extend: {
        // Perspective utility for 3D
        perspective: {
            '1000': '1000px',
        },
    },
  },
  plugins: [],
}