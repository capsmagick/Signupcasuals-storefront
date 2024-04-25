<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6 md:px-0 px-4">
    <h5 class="text-2xl uppercase text-center mb-8">Our top collection</h5>
    <div class="flex items-center justify-center gap-4">
      <button
        v-for="(collection, index) in collectionsTabs"
        :class="[
          selectedTab === index
            ? 'text-head border-b-head'
            : 'text-second border-b-transparent',
          'capitalize text-sm font-medium px-2 py-2 border-b-2',
        ]"
        :key="index"
        @click="onSelectCollection(collection, index)"
      >{{ collection.name }}
      </button
      >
    </div>
    <div v-if="loading" class="pt-8 flex justify-center  gap-6 flex-1">
      <div class="block w-10 h-10"></div>
      <div v-for="item in 5" :key="item.title" class="w-1/5">
        <SkeletonCardLoader/>
      </div>
      <div class="block w-10 h-10"></div>
    </div>
    <div v-if="!loading && collectionProducts && collectionProducts.length !==0" class="pt-8 flex items-center gap-4">
      <!-- prev button -->
      <div class="md:block hidden">
        <button v-if="hideButtons" @click="onClickPrev()"
                class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronLeft/>
        </button>
        <div v-else class="block w-10 h-10"></div>
      </div>

      <!-- prev button -->
      <div class="flex justify-center  gap-6 flex-1">
        <div v-for="(item, index) in collectionProducts" :key="index" class="w-1/5">
          <HoverCard :product="item"/>
        </div>
      </div>
      <!-- prev button -->
      <div class="md:block hidden">
        <button v-if="hideButtons" @click="onClickNext()"
                class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second">
          <MdiChevronRight/>
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
      collectionsTabs: [],
      selectedTab: null,
      collectionProducts: [],
      paginateStart: 0,
      paginateEnd: 5,
      loading: false
    };
  },

  computed: {
    hideButtons() {
      return this.collectionProducts.length <= 5;
    }
  },
  methods: {
    async getCollections() {
      try {
        const {data} = await this.$api.get("/customer/collections");
        this.collectionsTabs = data.results;
        this.selectedTab = 0;
      } catch (error) {
        console.log(error);
      }
    },

    async onSelectCollection(collection, index) {
      this.loading = true;
      this.selectedTab = index;
      console.log('index', index)
      console.log('collection', collection)
      if (collection) {
        this.collectionProducts = collection.collection_items; // Update 'collectionProducts' with 'collection_items'
      } else {
        this.collectionProducts = [];
      }
      this.loading = false;
    },
    onClickPrev() {
      if (this.paginateStart > 0) {
        this.paginateStart--;
        this.paginateEnd--;
      }
    },
    onClickNext() {
      if (this.paginateEnd < this.collectionProducts.length) {
        this.paginateStart++;
        this.paginateEnd++;
      }
    }
  },
  mounted() {
    this.getCollections();
  }
};
</script>


<style></style>
