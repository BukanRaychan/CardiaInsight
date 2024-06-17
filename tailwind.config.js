import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                kaisei: "Kaisei Decol, serif",
                kanit: "Kanit, sans-serif",
            },
            colors: {
                "custom-green": "#428C97",
            },
            aspectRatio: {
                '4/3': '4 / 3',
            },
        },
    },

    plugins: [forms],
};
