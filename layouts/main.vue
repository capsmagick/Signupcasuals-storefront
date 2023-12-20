<template>
  <div class="w-full h-screen">
    <SiteHeader />
    <div class="pt-[72px]">
      <main>
        <nuxt />
      </main>
    </div>
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
export default {
  components: {
    SiteHeader,
    SiteFooter,
  },
};
</script>

<style>
body {
  font-family: 'Jost', sans-serif;
}
</style>
