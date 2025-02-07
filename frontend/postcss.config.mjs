/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config: "./tailwind.config.mjs",
    },
  },
};

export default config;
