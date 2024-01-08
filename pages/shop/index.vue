<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto pt-20 pb-6">
    <h1 class="text-head text-3xl font-bold mb-4">SHOP</h1>
    <!-- Shop cat tab -->
    <div
      class="flex items-center gap-6 uppercase text-sm text-head font-medium"
    >
      <div>#stayhome</div>
      <div class="" v-for="(tab, idx) in categoryTabs" :key="idx">
        {{ tab.title }}
      </div>
    </div>
    <!-- Shop items section -->
    <div class="flex gap-14 mt-16">
      <aside class="w-[300px] flex-shrink-0">
        <ProductsFilter />
      </aside>
      <div>
        <!-- head -->
        <div class="flex items-center justify-between">
          <div class="text-xs font-medium">HOME / SHOP</div>
          <div class="flex text-xs font-medium gap-4 divide-x-2">
            <div class="flex items-center border-b-2 border-head">
              DEFAULT SORT
              <ChevronDown />
            </div>
            <div class="flex items-center gap-2 pl-4">
              VIEW
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 pt-6">
          <ProductCard v-for="item in products" :product="item" :key="item" />
        </div>
        <div class="pagination-shop-list grid grid-cols-3 w-full pt-10">
          <div class="text-xs text-head flex items-center font-medium">
            <span><ChevronLeft :size="18" /></span>PREV
          </div>
          <div
            class="flex items-center justify-center gap-2 text-sm font-medium"
          >
            <button v-for="(page, idx) in paginate.pages" @click="onSelectPage(idx)" :key="idx" :class="[checkPage(idx) ? 'bg-head text-white' : 'text-head','px-1.5 rounded']">{{ page }}</button>
          </div>
          <div
            class="text-xs text-head flex items-center font-medium justify-end"
          >
            NEXT<span><ChevronRight :size="18" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
export default {
  name: "shop-list",
  layout: "main",
  components: {
    ChevronDown: () => import("vue-material-design-icons/ChevronDown.vue"),
    ChevronLeft: () => import("vue-material-design-icons/ChevronLeft.vue"),
    ChevronRight: () => import("vue-material-design-icons/ChevronRight.vue"),
    ProductsFilter: () => import("~/components/Products/Filter.vue"),
    ProductCard,
  },
  data() {
    return {
      categoryTabs: [
        {
          title: "new in",
          value: "new-in",
        },
        {
          title: "Jackets",
          value: "jackets",
        },
        {
          title: "hoodies",
          value: "hoodies",
        },
        {
          title: "men",
          value: "men",
        },
        {
          title: "women",
          value: "women",
        },
        {
          title: "TROUSERS",
          value: "trousers",
        },
        {
          title: "ACCESSORIES",
          value: "accessories",
        },
        {
          title: "shoes",
          value: "shoes",
        },
      ],
      products: [],
      limit:6,
      paginate:{
        offset:0,
        count:0,
        pages:0
      }
    };
  },
  methods: {
    async fetchProductsList(offset = 0) {
      try {
        const { products, count, offset:dataOffset } = await this.$axios.$get(`/api/store/products?limit=${this.limit}&offset=${offset}`);
        this.products = products

        this.paginate.count = count;
        this.paginate.pages = Math.ceil( count/this.limit)
        this.paginate.offset = dataOffset
      } catch (error) {
        console.log(error);
      }
    },
    async onSelectPage(page){
      const offset = this.limit * page;
      await this.fetchProductsList(offset)
    },
    checkPage(page){
      const currentPage = this.limit * page;
      if(currentPage == page) return true
    }
  },
  async mounted() {
    this.fetchProductsList();
  },
};
</script>

<style></style>
