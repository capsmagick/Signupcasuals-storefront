<template>
  <div class="py-12">
    <h5 class="text-head text-2xl font-bold mb-6 text-center uppercase">
      <span class="font-normal">Limited</span> Editions
    </h5>
    <div class="grid grid-cols-2 gap-4 relative">
      <div class="" v-for="item in products.slice(start, end)" :key="item.id">
        <ProductCard :product="item" />
      </div>
      <!-- prev -->
      <div class="absolute -left-2 transform top-[40%] -translate-y-[40%]">
        <button
          class="w-8 h-8 flex items-center justify-center bg-white border border-footer rounded-full text-second"
          @click="onPrev"
        >
          <MdiChevronLeft :size="18" />
        </button>
      </div>
      <!-- next -->
      <div class="absolute -right-2 transform top-[40%] -translate-y-[40%]">
        <button
          class="w-8 h-8 flex items-center justify-center bg-white border border-footer rounded-full text-second"
          @click="onNext"
        >
          <MdiChevronRight :size="18" />
        </button>
      </div>
    </div>
    <!-- Paginations -->
    <div class="flex items-center justify-center gap-2 pt-4">
      <span
        v-for="page in paginationCount"
        :key="page"
        :class="[(page+1) == (start/2) ? 'border-head text-head' : 'border-transparent text-[#DDC2B9]', 'px-0.5 py-0.5 rounded-full border']"
      >
        <CircleSmall />
      </span>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
export default {
  name: "LimitedEditions",
  components: {
    ProductCard,
    CircleSmall: () => import("vue-material-design-icons/CircleSmall.vue"),
  },
  data() {
    return {
      products: [],
      start: 0,
      end: 2,
    };
  },
  computed: {
    paginationCount() {
      return Math.ceil(this.products.length / 2);
    },
  },
  methods: {
    async getLimitedEditionsProducts() {
      try {
        const { products } = await this.$axios.$get(`/api/store/products`);
        this.products = products;
      } catch (error) {}
    },
    onNext() {
        if( this.end != this.products.length){
            this.start = this.start + 2;
            this.end = this.end + 2;
            return
        }
        return
    },
    onPrev() {
        if( this.start != 0){
            this.start = this.start - 2;
            this.end = this.end - 2;
            return
        }
        return
    },
  },
  mounted() {
    this.getLimitedEditionsProducts();
  },
};
</script>

<style></style>
