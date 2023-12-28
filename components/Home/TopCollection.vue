<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
    <h5 class="text-2xl uppercase text-center mb-8">Our top collection</h5>
    <div class="flex items-center justify-center gap-4">
      <a
        v-for="tab in categoryTabs"
        href="#"
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
    <div class="pt-8 flex items-center gap-4">
      <!-- prev button -->
      <div>
        <button class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronLeft />
        </button>
      </div>

      <!-- prev button -->
      <div class="grid md:grid-cols-5 gap-6 ">
        <div v-for="item in 5" class="" :key="item">
          <HoverCard />
        </div>
      </div>
      <!-- prev button -->
      <div>
        <button class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronRight />
        </button>
      </div>

      <!-- prev button -->
    </div>
  </div>
</template>

<script>
import HoverCard from "../Products/HoverCard.vue";
export default {
  name: "HomeTopCollection",
  components: {
    HoverCard,
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
