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
  plugins: ["~/plugins/axios", "~/plugins/global", "~/plugins/alert"],

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
  server: {
    port: process.env.PORT ?? 8000, // default: 3000
  },
  auth: {
    fetchUser: true,
    strategies: {
      local: {
        token: {
          property: "access_token",
        },
        user: {
          property: "customer",
        },
        endpoints: {
          login: { url: "/api/auth/token", method: "post" },
          logout: { url: "/auth", method: "delete" },
          user: { url: "/api/customers/me", method: "get" },
        },
      },
    },
    redirect:{
      home: false
    }
  },
};
