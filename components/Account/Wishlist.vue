<template>
  <div>
    <div v-if="products && products.length" class="grid grid-cols-3 gap-6">
      <div v-for="product in products" :key="product" class="">
        <ProductCard :isWislist="true" :product="product.product_variant.product" :variant="product.product_variant" @refresh-products="getUserWishlist"/>
      </div>
    </div>
    <div v-else class="flex h-20 justify-center items-center">
      Oops. no products in your wishlist.
    </div>
  </div>
</template>

<script>
import ProductCard from "../Products/Card.vue";
export default {
  name: "AccountWishlist",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
   async getUserWishlist() {
        try {
            const { data } = await this.$api.get("/customer/wishlist/")
            this.products = Array.isArray(data?.results) ? data.results : []
        } catch (error) {
            console.log("Account:wishlist:", error)
        }
    },
  },
  async mounted(){
    await this.getUserWishlist()
  }
};
</script>

<style></style>
