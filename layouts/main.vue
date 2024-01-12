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
    
  </div>
</template>

<script>
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import MobileSiteFooter from "~/components/Mobile/SiteFooter.vue"
export default {
  components: {
    SiteHeader,
    SiteFooter,
    MobileSiteFooter
  },
};
</script>

<style>
body {
  font-family: 'Jost', sans-serif;
}
</style>
