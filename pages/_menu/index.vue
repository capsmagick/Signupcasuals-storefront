<template>
  <div
    class="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl mx-auto sm:pt-10 pb-6 md:px-0 px-4 relative"
    ref="intersection"
  >
    <h1 class="md:block hidden text-head text-3xl font-bold mb-4">
      {{ category?.name }}
    </h1>

    <!-- Shop items section -->
    <div class="flex gap-14 md:mt-16">
      <aside class="md:block hidden w-[300px] flex-shrink-0">
        <ProductsFilter
          :storeCategories="subCategories"
          :childCategories="[]"
        />
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
            <v-popover :offset="10" placement="bottom">
              <button
                class="flex items-center justify-end border-b-2 border-head w-32"
                ref="sort-btn"
              >
                {{ filterSort.name ? filterSort.name : "DEFAULT SORT" }}
                <ChevronDown />
              </button>
              <template slot="popover">
                <div class="bg-white border text-sm shadow-sm">
                  <div class="flex flex-col px-[20px] py-2 gap-2 capitalize">
                    <div
                      v-for="sort in sorts"
                      :key="sort.value"
                      @click="onUpdateFilter(sort)"
                      class="cursor-pointer"
                    >
                      {{ sort.name }}
                    </div>
                  </div>
                </div>
              </template>
            </v-popover>

            <!-- <div class="md:flex hidden items-center gap-2 pl-4">
                VIEW
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div> -->
          </div>
        </div>

        <div v-if="!loading">
          <div
            v-if="products && products.length"
            class="grid grid-cols-2 md:gap-8 gap-4 pt-6"
          >
            <ProductCard
              v-for="item in products"
              :product="item"
              :variant="item"
              :key="item.id"
              @refresh-products="fetchProductsList"
            />
          </div>
          <div
            v-else
            class="flex justify-center items-center text-lg text-head h-72"
          >
            Oops!. No products found
          </div>
        </div>
        <div v-else>
          <div class="grid grid-cols-2 md:gap-8 gap-4 pt-6">
            <SkeletonCardLoader v-for="item in 6" :key="item" />
          </div>
        </div>
      </div>
      <!-- Observer -->
      <div id="observer" class="observer h-[1px] w-[1px]"></div>
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
import SkeletonCardLoader from "~/components/Loader/SkeletonCardLoader.vue";
export default {
  name: "dynamic-menu",
  layout: "main",
  components: {
    ChevronDown: () => import("vue-material-design-icons/ChevronDown.vue"),
    ChevronLeft: () => import("vue-material-design-icons/ChevronLeft.vue"),
    ChevronRight: () => import("vue-material-design-icons/ChevronRight.vue"),
    ProductsFilter: () => import("~/components/Products/Filter.vue"),
    ProductCard,
    FilterVariant: () => import("vue-material-design-icons/FilterVariant.vue"),
    Close: () => import("vue-material-design-icons/Close.vue"),
    SkeletonCardLoader,
  },
  data() {
    return {
      handle: "",
      category: {},
      subCategories: [],
      sorts: [
        {
          name: "Name",
          value: "name",
        },
        {
          name: "Price: Low to High",
          value: "selling_price",
        },
        {
          name: "Price: Hight to Low",
          value: "selling_price",
        },
        {
          name: "Latest",
          value: "created_at",
        },
      ],
      products: [],
      filters: {
        category: [],
        sort: "",
      },
      filterSort: {},
      filterCategories: [],
    };
  },
  watch: {
    "$route.query": {
      deep: true,
      async handler(to, from) {
        await this.handleProductsListing();
      },
    },
  },
  methods: {
    async fetchCategory() {
      try {
        const { data } = await this.$api.get(
          `customer/category/?handle=${this.handle}`
        );
        if (Array.isArray(data.results) && data.results.length > 0) {
          this.category = data.results[0];
          if (this.category.sub_category.length > 0) {
            this.subCategories = this.category.sub_category;
            this.subCategories = this.subCategories.map((v, idx) => {
              let cat = { ...v };
              if (cat.sub_category) {
                console.log("here in sub");
                cat = {
                  ...cat,
                  isParent: true,
                  fold: idx == 0 ? false : true,
                };
              }
              return cat;
            });
          }
        }
      } catch (error) {
        console.log("menu:category:>>", error);
      }
    },
    async handleProductsListing() {
      const query = this.$route.query;
      if (query.category) this.handleCategoryFilter();
      else {
        this.filterCategories = [];
        await this.fetchProducts();
      }
    },
    async handleCategoryFilter() {
      const { category: categories } = this.$route.query;

      const queryCat = categories.split("_");
      console.log("inside cat");
      let categoryIds = [];
      this.subCategories.forEach((parent) => {
        if (parent.sub_category.length > 0) {
          parent.sub_category.forEach((c) => {
            if (queryCat.includes(c.handle)) categoryIds.push(c.id);
          });
        }
      });
      this.filterCategories = categoryIds;
      await this.fetchProducts();
    },
    async fetchProducts() {
      try {
        let url = `/customer/product/`;

        if (this.filterCategories.length > 0) {
          url = url.concat("?", `categories=${this.filterCategories}`);
        } else {
          const catIds = this.category.sub_category.map((v) => v.id);
          url = url.concat("?", `categories=${catIds}`);
        }

        if (this.filterSort && this.filterSort.value)
          url = url.concat(`&ordering=${this.filterSort.value}`);
        const { data } = await this.$api.get(url);
        if (Array.isArray(data.results) && data.results.length > 0)
          this.products = data.results;
      } catch (error) {
        console.log("products:>>", error);
      }
    },
    onUpdateFilter(sort) {
      this.$refs["sort-btn"].click();
      this.filterSort = sort;
      this.fetchProducts();
    },
  },
  async mounted() {
    const { menu } = this.$route.params;
    this.handle = menu;
    await this.fetchCategory();
    await this.handleProductsListing();
  },
};
</script>

<style></style>
