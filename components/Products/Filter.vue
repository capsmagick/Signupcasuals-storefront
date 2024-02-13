<template>
  <div class="w-full flex flex-col gap-10">
    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head cursor-pointer"
        @click="isShowCategories = !isShowCategories"
      >
        <span>PRODUCT CATEGORIES</span>
        <span class="transform" :class="[isShowCategories ? 'rotate-180' : '']">
          <ChevronDown class="text-head" />
        </span>
      </div>
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          v-show="isShowCategories"
          class="text-sm text-head pt-6 flex flex-col gap-2"
        >
          <li
            v-for="category in productCategories"
            :key="category"
            :class="[
              filters.category.includes(category.id)
                ? 'bg-footer bg-opacity-50'
                : '',
            ]"
            class="capitalize flex items-center gap-2 leading-8 cursor-pointer px-2 py-0.5 rounded"
            @click="onSelectCategory(category)"
          >
            <span class="flex-1">{{ category.name }}</span>
            <MdiCheckboxMarkedCircleOutline
              v-if="filters.category.includes(category.id)"
              :size="18"
            />
          </li>
        </ul>
      </transition>
    </div>

    <div>
      <div
        class="flex justify-between items-center text-lg font-medium text-head cursor-pointer"
        @click="isShowColors = !isShowColors"
      >
        <span>COLOR</span>
        <span class="transform" :class="[isShowColors ? 'rotate-180' : '']">
          <ChevronDown class="text-head" />
        </span>
      </div>
      <div v-show="isShowColors" class="flex gap-4 flex-wrap pt-6">
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
        class="flex justify-between items-center text-lg font-medium text-head cursor-pointer"
        @click="isShowSizes = !isShowSizes"
      >
        <span>SIZES</span>
        <span class="transform" :class="[isShowSizes ? 'rotate-180' : '']">
          <ChevronDown class="text-head" />
        </span>
      </div>
      <div v-show="isShowSizes" class="flex gap-4 flex-wrap pt-6">
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
        class="flex justify-between items-center text-lg font-medium text-head cursor-pointer"
        @click="isShowBrands = !isShowBrands"
      >
        <span>BRANDS</span>
        <span class="transform" :class="[isShowBrands ? 'rotate-180' : '']">
          <ChevronDown class="text-head" />
        </span>
      </div>
      <div v-show="isShowBrands" class="pt-6">
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
    Magnify: () => import("vue-material-design-icons/Magnify.vue"),
  },
  data() {
    return {
      filters: {
        category: [],
        colors: [],
        sizes: [],
      },
      selectedColor: null,
      searchBrand: null,
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
      isShowCategories: true,
      isShowColors: false,
      isShowSizes: false,
      isShowBrands: false,
    };
  },
  methods: {
    onSelectColor(color) {
      this.selectedColor = color;
    },
    async getProductCategories() {
      try {
        const { product_categories } = await this.$axios.$get(
          "/api/product-categories?parent_category_id=null"
        );
        if (product_categories) this.productCategories = product_categories;
      } catch (error) {}
    },
    onSelectCategory(category) {
      if (this.filters.category.includes(category.id))
        this.filters.category = this.filters.category.filter((v) => v !== category.id)
      else this.filters.category.push(category.id);
      this.onUpdateFilter();
    },
    onUpdateFilter() {
      this.$emit("onUpdateFilter", this.filters);
    },
  },
  async mounted() {
    await this.getProductCategories();
  },
};
</script>

<style></style>
