<template>
  <div class="header-search flex flex-col gap-4">
    <h6 class="text-sm font-medium text-second">WHAT ARE YOU LOOKING FOR?</h6>
    <div class="">
      <div class="flex items-center">
        <input
          id="search-field"
          class="h-full w-full border-b border-second py-3 pl-3 pr-8 text-head placeholder-second focus:border-head focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder="Search"
          type="search"
          name="search"
          v-model="searchProduct"
        />
        <Magnify class="-ml-7 relative text-second" />
      </div>
    </div>
    <div v-if="searchProduct" class="pt-4">
      <h6 class="text-sm font-medium text-second uppercase">Search result</h6>
      <div v-if="loading">
        <div class="flex items-center gap-2 justify-center">
          <div class="h-6 w-3 bg-second-red animate-bounce"></div>
          <div class="h-6 w-3 bg-second-red animate-bounce delay-300"></div>
          <div class="h-6 w-3 bg-second-red animate-bounce"></div>
        </div>
      </div>

      <div
        v-if="searchProduct && !products.length && !loading"
        class="flex text-center justify-center"
      >
        <h6 class="text-sm font-medium text-second">
          No matching products found!
        </h6>
      </div>

      <div class="grid grid-cols-4 py-4 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="cursor-pointer"
          @click="goToProductDetails(product)"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-56 h-48"
          >
            <img
              v-if="product.thumbnail"
              :src="product.thumbnail"
              class="h-full w-full object-cover object-center"
            />
            <img v-else src="~/assets/images/product.png" alt="" srcset="" />
          </div>
          <div class="text-sm text-head leading-5 pt-4">
            {{ product.title }}
          </div>
        </div>
      </div>
    </div>
    <h6 class="text-sm font-medium text-second">QUICKLINKS</h6>
    <ul>
      <li
        v-for="link in quickLinks"
        :key="link.title"
        class="text-sm text-head font-normal capitalize leading-7"
      >
        {{ link.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",
  components: {
    Magnify: () => import("vue-material-design-icons/Magnify.vue"),
  },
  data() {
    return {
      quickLinks: [
        {
          title: "new arrivals",
          link: "",
        },
        {
          title: "dresses",
          link: "",
        },
        {
          title: "Accessories",
          link: "",
        },
        {
          title: "Footwear",
          link: "",
        },
        {
          title: "Sweatshirt",
          link: "",
        },
      ],
      searchProduct: "",
      loading: false,
      products: [],
    };
  },
  watch: {
    searchProduct(v) {
      this.loading = true;
      this.searchProducts();
    },
  },
  methods: {
    async searchProducts() {
      try {
        if (!this.searchProduct) {
          this.loading = false;
          return;
        }
        const { hits } = await this.$axios.$post("/api/products/search", {
          q: this.searchProduct,
        });
        this.products = hits;
      } catch (error) {
        console.log("Search error:", error);
      } finally {
        this.loading = false;
      }
    },
    goToProductDetails(product) {
      this.$router.push(`/shop/${product.id}`);
    },
  },
};
</script>

<style></style>
