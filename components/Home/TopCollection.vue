<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6 md:px-0 px-4">
    <h5 class="text-2xl uppercase text-center mb-8">Our top collection</h5>
    <div class="flex items-center justify-center gap-4">
      <button
        v-for="tab in collectionsTabs"
        :class="[
          selectedTab.handle === tab.handle
            ? 'text-head border-b-head'
            : 'text-second border-b-transparent',
          'capitalize text-sm font-medium px-2 py-2 border-b-2',
        ]"
        :key="tab.handle"
        @click="onSelectCollection(tab)"
        >{{ tab.name }}</button
      >
    </div>
    <div v-if="loading"  class="pt-8 flex justify-center  gap-6 flex-1">
      <div class="block w-10 h-10"></div>
      <div v-for="item in 5" :key="item.title" class="w-1/5">
        <SkeletonCardLoader />
      </div>
      <div class="block w-10 h-10"></div>
    </div>
    <div v-if="!loading && collectionProducts && collectionProducts.length" class="pt-8 flex items-center gap-4">
      <!-- prev button -->
      <div  class="md:block hidden">
        <button v-if="hideButtons" @click="onClickPrev()" class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronLeft />
        </button>
        <div v-else class="block w-10 h-10"></div>
      </div>

      <!-- prev button -->
      <div  class="flex justify-center  gap-6 flex-1">
        <div v-for="item in collectionProducts.slice(paginateStart, paginateEnd)" :key="item.title" class="w-1/5">
          <HoverCard :product="item"/>
        </div>
      </div>
      <!-- prev button -->
      <div  class="md:block hidden">
        <button v-if="hideButtons" @click="onClickNext()" class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronRight />
        </button>
        <div v-else class="block w-10 h-10"></div>
      </div>

      <!-- prev button -->
    </div>
    <div v-else class="text-center h-36 flex items-center justify-center"> Oops!. No products found.</div>
  </div>
</template>

<script>
import HoverCard from "../Products/HoverCard.vue";
import SkeletonCardLoader from "../Loader/SkeletonCardLoader.vue";
export default {
  name: "HomeTopCollection",
  components: {
    HoverCard,
    SkeletonCardLoader
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
      collectionProducts:[],
      paginateStart:0,
      paginateEnd:5,
      loading: true
    };
  },
  computed:{
    hideButtons(){
      if(this.collectionProducts.length < 5) false
      else true
    }
  },
  methods:{
    async getCollections(){
      try {
        const { data } = await this.$api.get(
          "/customer/collections"
        );
        this.collectionsTabs = data.results
        this.selectedTab = this.collectionsTabs[0]
        await this.getSelectedCollectionProducts(this.selectedTab.id)
      } catch (error) {
        console.log(error)
      }
    },
    async getSelectedCollectionProducts(collectionId = null){
      try {
        this.loading = true
        const url =
          "/customer/products?" +
          `collection_id=${collectionId}`
        const { products } = await this.$axios.$get(url);
        this.collectionProducts = products
      } catch (error) {
        console.log(error)
        this.collectionProducts = []
      }finally{
        this.loading = false
      }
    },
    async onSelectCollection(collection){
      this.selectedTab = collection
      await this.getSelectedCollectionProducts(this.selectedTab.id)
    },
    onClickPrev(){
      if(this.paginateStart === 0) return;
      this.paginateStart = this.paginateStart - 1;
      this.paginateEnd = this.paginateEnd - 1;
    },
    onClickNext(){
      console.log("On fn")
      if(this.paginateEnd === this.collectionProducts.length) return;
      this.paginateStart = this.paginateStart + 1;
      this.paginateEnd = this.paginateEnd + 1;
    }
  },
  async mounted(){
    await this.getCollections()
  }
};
</script>

<style></style>
