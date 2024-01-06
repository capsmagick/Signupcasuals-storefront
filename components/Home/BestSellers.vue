<template>
  <div class="">
    <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
      <h5 class="text-2xl uppercase text-center mb-8">best sellers</h5>
      <div class="pt-8 flex items-center gap-4">
        <!-- prev button -->
        <div class="grid md:grid-cols-4 grid-cols-2 gap-6">
          <div v-for="lookBook in 4" class="relative" :key="lookBook">
            <ProductCard />
          </div>
        </div>
      </div>
      <!-- Paginations -->
      <div class="flex items-center justify-center pt-10">
        <button v-for="page in pagination.page" :key="page" @click="selectedPage = page">
          <CircleMedium v-if="page == selectedPage" class="text-head"/>
          <CircleSmall v-else :size="26" class="text-[#DDC2B9]" />
        </button>
      </div>
      <!-- Paginations -->
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
export default {
  name: "BestSellers",
  components: {
    ProductCard,
    CircleSmall: () => import("vue-material-design-icons/CircleSmall.vue"),
    CircleMedium: () => import("vue-material-design-icons/CircleMedium.vue"),
  },
  data() {
    return {
      pagination: {
        page: 4,
      },
      selectedPage: 2,
    };
  },
};
</script>

<style></style>
