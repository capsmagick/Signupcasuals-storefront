<template>
  <div
    class="xl:max-w-7xl lg:max-w-4xl mx-auto md:pt-20 pt-10 pb-6 md:px-0 px-4"
  >
    <h1 class="md:block hidden text-head text-3xl font-bold mb-4">SHOP</h1>
    <!-- Shop cat tab -->
    <div
      class="md:flex hidden items-center gap-6 uppercase text-sm text-head font-medium"
    >
      <div>#stayhome</div>
      <div class="" v-for="(tab, idx) in categoryTabs" :key="idx">
        {{ tab.title }}
      </div>
    </div>
    <!-- Shop items section -->
    <div class="flex gap-14 md:mt-16">
      <aside class="md:block hidden w-[300px] flex-shrink-0">
        <ProductsFilter @onUpdateFilter="onUpdateFilter" />
      </aside>
      <div class="flex-1">
        <!-- head -->
        <div class="flex items-center justify-between">
          <div class="md:block hidden text-xs font-medium">HOME / SHOP</div>
          <div
            @click="openSideFilter = !openSideFilter"
            class="md:hidden flex items-center gap-2 text-sm font-medium"
          >
            <FilterVariant :size="18" /> FILTER
          </div>

          <div class="flex text-xs font-medium gap-4 divide-x-2">
            <div class="flex items-center border-b-2 border-head">
              DEFAULT SORT
              <ChevronDown />
            </div>
            <div class="md:flex hidden items-center gap-2 pl-4">
              VIEW
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>
        </div>
        <div v-if="products && products.length" class="grid grid-cols-2 md:gap-8 gap-4 pt-6">
          <ProductCard v-for="item in products" :product="item" :key="item" />
        </div>
        <div v-else class="flex justify-center items-center text-lg text-head h-72">Oops!. No products found</div>
        <div v-if="products && products.length" class="pagination-shop-list grid grid-cols-3 w-full pt-10">
          <div class="text-xs text-head flex items-center font-medium">
            <span><ChevronLeft :size="18" /></span>PREV
          </div>
          <div
            class="flex items-center justify-center gap-2 text-sm font-medium"
          >
            <button
              v-for="(page, idx) in paginate.pages"
              @click="onSelectPage(idx)"
              :key="idx"
              :class="[
                checkPage(idx) ? 'bg-head text-white' : 'text-head',
                'px-1.5 rounded',
              ]"
            >
              {{ page }}
            </button>
          </div>
          <div
            class="text-xs text-head flex items-center font-medium justify-end"
          >
            NEXT<span><ChevronRight :size="18" /></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Side Filter Mobile view -->
    <div
      v-if="openSideFilter"
      class="fixed w-full bg-white h-screen top-0 left-0 z-50"
    >
      <div
        class="flex bg-primary items-center justify-between px-6 py-5 rounded-t"
      >
        <h3 class="text-base text-head font-medium uppercase">Filter By</h3>
        <button
          class="p-1 ml-auto border-0 text-appText float-right leading-none font-semibold outline-none focus:outline-none"
        >
          <Close @click="openSideFilter = !openSideFilter" :size="18" />
        </button>
      </div>
      <div class="px-6 pt-6 overflow-y-auto" style="height: calc(100vh - 66px)">
        <ProductsFilter />
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
    FilterVariant: () => import("vue-material-design-icons/FilterVariant.vue"),
    Close: () => import("vue-material-design-icons/Close.vue"),
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
      limit: 6,
      paginate: {
        offset: 0,
        count: 0,
        pages: 0,
      },
      openSideFilter: false,
      filterQuery: null,
    };
  },
  methods: {
    async fetchProductsList(offset = 0) {
      try {
        let url = `/api/products?limit=${this.limit}&offset=${offset}`;
        if (this.filterQuery) url = url.concat("&", this.filterQuery);
        console.log(url);
        const {
          products,
          count,
          offset: dataOffset,
        } = await this.$axios.$get(url);
        this.products = products;

        this.paginate.count = count;
        this.paginate.pages = Math.ceil(count / this.limit);
        this.paginate.offset = dataOffset;
      } catch (error) {
        console.log(error);
      }
    },
    async onSelectPage(page) {
      const offset = this.limit * page;
      await this.fetchProductsList(offset);
    },
    async onUpdateFilter(filters) {
      if (filters.category && filters.category.length) {
        this.filterQuery =
          "category_id[]=" + filters.category.join("&category_id[]=");
      }

      // Refetch Products
      await this.fetchProductsList();
    },
    checkPage(page) {
      const currentPage = this.limit * page;
      if (currentPage == page) return true;
    },
  },
  async mounted() {
    const query = this.$route.query;
    if(query.category) await this.onUpdateFilter({category:[query.category]})
    else this.fetchProductsList();
  },
};
</script>

<style></style>
