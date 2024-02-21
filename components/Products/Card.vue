<template>
  <div
    class="relative flex flex-col group cursor-pointer"
    @click="goToProductDetails"
  >
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-72"
    >
      <img
        v-if="product.thumbnail"
        :src="product.thumbnail"
        @error="imageError"
        class="h-full w-full object-cover object-center"
      />
      <img v-else src="~/assets/images/product.png" alt="" srcset="" />
    </div>
    <div class="flex justify-between pt-4">
      <div>
        <div class="text-xs text-second leading-5">Dresses</div>
        <div class="text-sm text-head leading-5">
          {{ product.title }}
        </div>
        <div v-if="getProductPrice" class="text-sm text-head leading-5">
          {{ getProductPrice.amount | priceAmount }}
        </div>
      </div>
      <div>
        <img src="~/assets/images/icons/heart-small.svg" />
      </div>
    </div>
    <button
      v-if="isWislist"
      class="invisible group-hover:visible absolute top-4 left-4 p-2 bg-white text-head rounded"
    >
      <MdiWindowClose :size="18" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: {},
    },
    isWislist: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  filters: {
    priceAmount(price) {
      const amount = Math.round(price / 100);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "inr",
      }).format(amount);
    },
  },
  computed: {
    getProductPrice() {
      if (
        this.product &&
        this.product.variants &&
        this.product.variants.length
      ) {
        const variant = this.product.variants[0];
        return variant.prices[0];
      }
    },
  },
  methods: {
    goToProductDetails() {
      this.$router.push(`/shop/${this.product.id}`);
    },
    imageError(e) {
      e.target.src = require("/assets/images/product.png");
    },
  },
};
</script>

<style></style>
