<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6 md:px-0 px-4">
    <h5 class="text-2xl uppercase text-center mb-8">Our top collection</h5>
    <div class="flex items-center justify-center gap-4">
      <a
        v-for="tab in collectionsTabs"
        href="#"
        :class="[
          selectedTab.handle == tab.handle
            ? 'text-head border-b-head'
            : 'text-second border-b-transparent',
          'capitalize text-sm font-medium px-2 py-2 border-b-2',
        ]"
        :key="tab.handle"
        >{{ tab.title }}</a
      >
    </div>
    <div class="pt-8 flex items-center gap-4">
      <!-- prev button -->
      <div class="md:block hidden">
        <button class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronLeft />
        </button>
      </div>

      <!-- prev button -->
      <div v-if="collectionProducts && collectionProducts.length" class="flex justify-center  gap-6 flex-1">
        <div v-for="item in collectionProducts" :key="item.title" class="w-1/5">
          <HoverCard :product="item"/>
        </div>
      </div>
      <!-- prev button -->
      <div class="md:block hidden">
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
      collectionsTabs: [
        { title: "all", handle: "all" },
        { title: "Featured", handle: "Featured" },
        { title: "Popular", handle: "popular" },
        { title: "Sale", handle: "sale" },
        { title: "Best Rated", handle: "best-rated" },
      ],
      selectedTab: "all",
      collectionProducts:[]
    };
  },
  methods:{
    async getCollections(){
      try {
        const { collections } = await this.$axios.$get(
          "/api/collections"
        );
        this.collectionsTabs = collections
        this.selectedTab = this.collectionsTabs[0]
        await this.getSelectedCollectionProducts(this.selectedTab.id)
      } catch (error) {
        console.log(error)
      }
    },
    async getSelectedCollectionProducts(collectionId = null){
      try {
        const url =
          "/api/products?" +
          `collection_id[]=${collectionId}`
        const { products } = await this.$axios.$get(url);
        this.collectionProducts = products
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted(){
    await this.getCollections()
  }
};
</script>

<style></style>
