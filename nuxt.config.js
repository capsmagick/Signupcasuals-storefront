require("./config");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&family=Poppins&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "~/modules/material-design-icons.js",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: `${process.env.API_URL}/store`,
      pathRewrite: { "^/api/": "" },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
        },
        user: {
          property: "user",
        },
        endpoints: {
          login: { url: "/auth", method: "post" },
          logout: { url: "/auth", method: "delete" },
          user: { url: "/customers/me", method: "get" },
        },
      },
      // customStrategy: {
      //   schema: "@/schemas/custom",
      //   token: {
      //     property: "accessToken",
      //   },
      //   user: {
      //     property: "user",
      //   },
      //   endpoints: {
      //     login: { url: "/auth", method: "post" },
      //     logout: { url: "/auth", method: "delete" },
      //     user: { url: "/customers/me", method: "get" },
      //   },
      // },
    },
  },
};
