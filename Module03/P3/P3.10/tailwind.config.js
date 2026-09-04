/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f0fdfa",
                    100: "#ccfbf1",
                    500: "#06b6d4",
                    600: "#0891b2",
                    700: "#0e7490",
                },
            },
        },
    },
    plugins: [],
};
