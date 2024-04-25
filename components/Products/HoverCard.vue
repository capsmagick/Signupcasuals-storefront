<template>
  <div class="group">
    <div class="relative">
<!--      <div>
        {{product.product}}
      </div>-->
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          v-if="product.product && product.product.images.length !==0"
          :src="product.product.images[0]"
          @error="imageError"
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
        <img v-else src="~/assets/images/product.png" alt="" srcset="" />
      </div>
      <div
        class="invisible group-hover:visible flex w-full flex-col gap-4 absolute items-end right-2 justify-end top-2"
      >
        <button
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <Eye :size="18" />
        </button>
        <button
          class="w-8 h-8 bg-second-red text-white rounded-full flex items-center justify-center"
        >
          <HeartOutline :size="18" />
        </button>
      </div>

      <div class="absolute flex w-full bottom-4 px-4">
        <button
          class="invisible group-hover:visible bg-white flex-1 text-sm py-2 text-head flex items-center justify-center"
        >
          ADD TO CART
        </button>
      </div>
    </div>
    <div class="flex justify-between pt-4">
      <div>
<!--        <div class="text-xs text-second leading-5">Dresses</div>-->
        <div class="text-sm text-head leading-5">{{ product.product.name }}</div>
<!--        <div class="text-sm text-head leading-5">-->
<!--&lt;!&ndash;          {{ getProductPrice.price | priceAmount }}&ndash;&gt;-->
<!--          {{ product.price }}-->
<!--        </div>-->
        <div class="text-sm text-head leading-5">
          ₹{{ product.product.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import Eye from "vue-material-design-icons/EyeOutline.vue";
export default {
  name: "ProductHoverCard",
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  components: {
    HeartOutline,
    Eye,
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
    // getProductPrice() {
    //   if (
    //     this.product &&
    //     this.product.variants &&
    //     this.product.variants.length
    //   ) {
    //     const variant = this.product.variants[0];
    //     return variant.prices[0];
    //   }
    // },
  },
  methods: {
    imageError(e) {
      e.target.src = require("/assets/images/product.png");
    },
  },
};
</script>

<style></style>
