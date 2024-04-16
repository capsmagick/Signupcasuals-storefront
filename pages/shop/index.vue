<template>
  <div
    class="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl mx-auto md:pt-20 pt-10 pb-6 md:px-0 px-4"
    ref="intersection"
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
        <ProductsFilter
          :storeCategories="storeCategories"
          :childCategories="childCategories"
          @onUpdateFilter="onUpdateFilter"
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
            <ReusableDropdown :right="true">
              <template #menu-activator="{ toggleMenu }">
                <button
                  class="flex items-center justify-end border-b-2 border-head w-32"
                  @click="toggleMenu"
                >
                  {{ filters.sort ? filters.sort : "DEFAULT SORT" }}
                  <ChevronDown />
                </button>
              </template>
              <template #menu-content="{ toggleMenu }">
                <div class="flex flex-col px-[20px] py-2 gap-2 capitalize">
                  <div
                    v-for="sort in sorts"
                    :key="sort.value"
                    @click="
                      toggleMenu();
                      onUpdateFilter({ sort: sort.value });
                    "
                    class="cursor-pointer"
                  >
                    {{ sort.name }}
                  </div>
                </div>
              </template>
            </ReusableDropdown>

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
              :product="item.product"
              :variant="item"
              :key="item.id"
              @refresh-products="fetchProducts"
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
import { mapState, mapActions } from "vuex";
import ProductCard from "~/components/Products/Card.vue";
import SkeletonCardLoader from "~/components/Loader/SkeletonCardLoader.vue";
import axios from "~/plugins/axios";
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
    SkeletonCardLoader,
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
      filters: {
        category: [],
        sort: "",
      },
      filterQuery: "",
      loading: false,
      sorts: [
        {
          name: "Name",
          value: "title",
        },
      ],
      handle: null,
      category: null,
      storeCategories: [],
      parentCategory: {},
      childCategories: [],
    };
  },
  computed: {
    ...mapState("store", ["categories"]),
  },
  watch: {
    "$route.query": {
      async handler(to, from) {
        if (to.handle) this.handle = to.handle;
        else this.handle = null;
        await this.fetchStoreCategories();
        await this.handleProductsListing();
      },
    },
  },
  methods: {
    // ...mapActions("store", ["fetchStoreCategories"]),
    async fetchProductsList(offset = 0) {
      try {
        this.loading = true;
        let url = `/api/products?limit=${this.limit}&offset=${offset}`;

        if (this.filterQuery) url = url.concat("&", this.filterQuery);
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
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    async onSelectPage(page) {
      const offset = this.limit * page;
      await this.fetchProductsList(offset);
    },
    async onUpdateFilter(filters) {
      try {
        if (filters) {
          if (filters.sort) {
            this.filters.sort = filters.sort;
          }
          if (this.filters.sort)
            this.filterQuery = `${this.filterQuery}order=${filters.sort}`;

          await this.fetchProductsList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    createCategoryQuery(parent_category) {
      if (parent_category.id) this.filters.category.push(parent_category.id);
      if (
        parent_category.category_children &&
        parent_category.category_children.length
      )
        parent_category.category_children.forEach((e) =>
          this.createCategoryQuery(e)
        );
    },
    async handleProductsListing() {
      const query = this.$route.query;
      if (query && Object.keys(query).length) this.handleFilters();
      else await this.fetchProducts();
    },
    async handleFilters() {
      const query = this.$route.query;
      const { handle, category } = query;
      this.handle = handle;
      this.category = category;

      if (this.handle) {
        this.parentCategory = this.storeCategories.find(
          (c) => c.handle == this.handle
        );
        this.childCategories = this.parentCategory.sub_category;
      }
      if (this.handle && !this.category) this.fetchMainHandle();
      else if (this.handle && this.category) this.fetchHandleAndCategories();
      else if (!this.handle && this.category) this.fetchCategories();
    },
    fetchMainHandle() {
      let handle = {};
      let url = "";
      if (this.handle) {
        url = url.concat(`category_id[]=${this.parentCategory.id}`);

        // Handle Sub cat Ids
        const handleChildCat = (cat) => {
          url = url.concat(`&category_id[]=${cat.id}`);
          if (cat.category_children && cat.category_children)
            cat.category_children.forEach((c) => handleChildCat(c));
        };

        if (
          this.parentCategory.category_children &&
          this.parentCategory.category_children.length
        )
          this.parentCategory.category_children.forEach((c) =>
            handleChildCat(c)
          );
        // url = url.concat(`&category_id[]=${handle.id}`);
      }

      this.filterQuery = url;

      this.fetchProductsList();
    },
    async fetchHandleAndCategories() {
      let queryCats = this.category.split("_");
      console.log(this.childCategories);

      const childCategoriesId = [];

      if (this.childCategories && this.childCategories.length) {
        this.childCategories.forEach((c) => {
          if (c.category_children && c.category_children.length) {
            c.category_children.forEach((v) => {
              if (queryCats.includes(v.handle)) childCategoriesId.push(v.id);
            });
          }
        });

        this.filterQuery =
          "category_id[]=" + childCategoriesId.join("&category_id[]=");

        await this.fetchProductsList();
      }
    },
    async fetchCategories() {
      const queryCat = this.category.split("_");
      console.log;
      const categoriesId = [];

      // const handleSubCat = (cat) => {
      //   if (cat && cat.length) {
      //     cat.forEach((c) => {
      //       categoriesId.push(c.id);
      //       if (c.category_children && c.category_children.length)
      //         handleSubCat(c.category_children);
      //     });
      //   }
      // };

      // this.storeCategories.forEach((p) => {
      //   if (queryCat.includes(p.handle)) {
      //     categoriesId.push(p.id);

      //     if (p.category_children && p.category_children.length)
      //       handleSubCat(p.category_children);
      //   }
      // });

      // await this.fetchProductsList();
      // const { data } = await this.$api.get("/customer/category/");
    },
    async fetchStoreCategories() {
      try {
        const { data } = await this.$api.get("/customer/category");
        if (Array.isArray(data?.results) && data.results)
          this.storeCategories = data.results;
      } catch (error) {
        console.log("shop:", error);
      }
    },
    async fetchProducts() {
      try {
        const res = await this.$api.get("/customer/product/");
        this.products = Array.isArray(res.data?.results)
          ? res.data.results
          : [];
      } catch (error) {
        console.log("products:", error);
        this.products = [];
      }
    },
  },
  async mounted() {
    await this.fetchStoreCategories();
    await this.handleProductsListing();

    // const observer = document.getElementById("observer");

    // const intersection = new IntersectionObserver((entries) => {
    //   if(entries[0].intersectionRatio <= 0){
    //     console.log("Not here");
    //     return
    //   }

    //   console.log(entries)
    // })

    // intersection.observe(observer)

    // await this.fetchCategories();
    // await this.fetchProducts();
  },
};
</script>

<style></style>
