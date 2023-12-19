<template>
  <div>
    <div class="h-80 bg-second">
      <button class="" @click="login">login</button>
    </div>
  </div>
</template>

<script>
import SiteHeader from "~/components/SiteHeader.vue";
// import Medusa from "@medusajs/medusa-js";
export default {
  name: "IndexPage",
  layout: "main",
  components: {
    SiteHeader,
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
