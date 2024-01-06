<template>
  <div class="py-12">
    <h5 class="text-head text-2xl font-bold mb-6 text-center uppercase">
      <span class="font-normal">Our trendy</span> PRODUCTS
    </h5>
    <div class="flex items-center justify-center gap-4 flex-wrap pb-4">
      <a
        v-for="tab in categoryTabs"
        @click="selectedTab = tab.value"
        :class="[
          selectedTab == tab.value
            ? 'text-head border-b-head'
            : 'text-second border-b-transparent',
          'capitalize text-sm font-medium px-2 py-2 border-b-2',
        ]"
        :key="tab.value"
        >{{ tab.name }}</a
      >
    </div>

    <div class="grid grid-cols-2 gap-4">
        <ProductCard v-for="item in 4" :key="item" />
    </div>
    <div class="flex justify-center py-4">
        <button class="text-sm font-medium uppercase text-head border-b-2 border-head">SEE all products</button>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
export default {
  name: "TrendyProducts",
  components:{
    ProductCard
  },
  data() {
    return {
      categoryTabs: [
        { name: "all", value: "all" },
        { name: "Featured", value: "Featured" },
        { name: "Popular", value: "popular" },
        { name: "Sale", value: "sale" },
        { name: "Best Rated", value: "best-rated" },
      ],
      selectedTab: "all",
    };
  },
};
</script>

<style></style>
