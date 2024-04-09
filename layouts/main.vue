<template>
  <div class="w-full h-screen">
    <SiteHeader />
    <div class="pt-[72px]">
      <main>
        <nuxt />
      </main>
    </div>
    <div class="hidden md:block">
      <SiteFooter />
    </div>
    <div class="md:hidden block">
      <MobileSiteFooter />
    </div>
    <Snackbar />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SiteHeader from "~/components/SiteHeader/index.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import MobileSiteFooter from "~/components/Mobile/SiteFooter.vue";
import Snackbar from "~/components/Utils/Snackbar.vue";
export default {
  middleware: ["verify-auth"],
  components: {
    SiteHeader,
    SiteFooter,
    MobileSiteFooter,
    Snackbar,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("store", ["fetchStoreCategories"]),
  },
  async mounted() {
        }
};
</script>

<style>
body {
  font-family: "Jost", sans-serif;
}
</style>
