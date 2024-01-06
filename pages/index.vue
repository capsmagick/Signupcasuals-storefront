<template>
  <div>
    <section id="home-banner">
      <BannerSlider />
    </section>
    <section id="to-categories" class="md:block hidden bg-fourth">
      <TopCategories />
    </section>
    <section id="top-collection" class="md:block hidden">
      <TopCollection />
    </section>
    <section id="look-book" class="md:block hidden">
      <LookBook />
    </section>
    <section id="best-sellers" class="md:block hidden">
      <BestSellers />
    </section>
    <section id="blogs" class="md:block hidden">
      <Blogs />
    </section>
    <section id="bottom-options" class="md:block hidden">
      <Services />
    </section>

    <!-- Mobile Home -->
    <MobileHome class="hidden"/>
  </div>
</template>

<script>
import TopCategories from '~/components/Home/TopCategories.vue';
import TopCollection from '~/components/Home/TopCollection.vue';
import Services from '~/components/Home/Services.vue'
import BannerSlider from '~/components/Home/BannerSlider.vue';
import Blogs from '~/components/Home/Blogs.vue';
import LookBook from '~/components/Home/LookBook.vue';
import BestSellers from '~/components/Home/BestSellers.vue';
import MobileHome from "~/components/Home/Mobile"
// import Medusa from "@medusajs/medusa-js";
export default {
  name: "IndexPage",
  layout: "main",
  components: {
    TopCategories,
    TopCollection,
    Services,
    BannerSlider,
    Blogs,
    MobileHome,
    LookBook,
    BestSellers
  },
  methods: {
    async login() {
      try {
        const res = await fetch("/api/store/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
          email: "user@example.com",
          password: "1234",
        })
      });

      await this.fetchProducts()
      } catch (error) {
        console.log(error)
      }
      
    },
    async fetchProducts() {
      console.log("hii ");
      const res = await fetch("/api/store/products/prod_01HHVZNTKQQ082SS6Z5YFV4Z5H", {
        method: "GET",
      });

      console.log(res)
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
<style>

</style>
