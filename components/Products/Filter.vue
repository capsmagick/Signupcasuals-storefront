<template>
  <div class="w-full flex flex-col gap-10">
    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head"
      >
        <span>PRODUCT CATEGORIES</span>
        <span>
          <ChevronUp class="text-head" />
        </span>
      </div>
      <ul class="text-sm text-head pt-6">
        <li
          v-for="category in productCategories"
          :key="category"
          class="capitalize leading-8"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>

    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head"
      >
        <span>COLOR</span>
        <span>
          <ChevronUp class="text-head" />
        </span>
      </div>
      <div class="flex gap-4 flex-wrap pt-6">
        <div
          v-for="color in colors"
          :key="color"
          :class="{
            'ring-2 ring-head': selectedColor == color,
          }"
          class="h-7 w-7 rounded-full flex items-center justify-center"
          @click="onSelectColor(color)"
        >
          <div
            class="h-5 w-5 rounded-full"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
      </div>
    </div>

    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head"
      >
        <span>SIZES</span>
        <span>
          <ChevronUp class="text-head" />
        </span>
      </div>
      <div class="flex gap-4 flex-wrap pt-6">
        <button
          v-for="size in sizes"
          :key="size"
          class="text-sm uppercase w-[50px] border py-2 flex-shrink-0"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head"
      >
        <span>BRANDS</span>
        <span>
          <ChevronUp class="text-head" />
        </span>
      </div>
      <div class="pt-6">
        <div class="flex items-center">
          <input
            id="search-field"
            class="h-full w-full border border-footer py-3 pl-3 pr-8 text-head placeholder-second focus:border-head focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
            v-model="searchBrand"
          />
          <Magnify class="-ml-7 relative text-second" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsFilter",
  components: {
    ChevronDown: () => import("vue-material-design-icons/ChevronDown.vue"),
    ChevronUp: () => import("vue-material-design-icons/ChevronUp.vue"),
    Magnify: () => import("vue-material-design-icons/Magnify.vue")
  },
  data() {
    return {
      filters: {},
      selectedColor: null,
      searchBrand:null,
      sizes: ["xs", "s", "m", "l", "xl", "xxl"],
      productCategories: [
        "dresses",
        "sweatshirts",
        "jackets",
        "jeans",
        "men",
        "shorts",
        "swimwear",
        "t-shirts",
        "&",
        "tops",
        "trousers",
        "jumpers",
        "&",
        "cardigans",
      ],
      colors: [
        "#0A2472",
        "#E6AE95",
        "#D7BB4F",
        "#BABABA",
        "#282828",
        "#D76B67",
        "#B1D6E8",
        "#BFDCC4",
        "#9C7539",
        "#D29B48",
      ],
    };
  },
  methods: {
    onSelectColor(color) {
      this.selectedColor = color;
    },
    async getProductCategories() {
      try {
        const { product_categories } = await this.$axios.$get(
          "/api/product-categories"
        );
        // if(!product_categories.length) this.categories = this.dummyCat
        if(product_categories) this.productCategories = product_categories
        
      } catch (error) {}
    },
  },
  async mounted(){
    await this.getProductCategories();
  }
};
</script>

<style></style>
