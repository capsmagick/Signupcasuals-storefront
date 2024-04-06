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
          {{ product.name }}
        </div>
        <div v-if="variant.selling_price" class="text-sm text-head leading-5">
          {{ variant.selling_price | priceAmount }}
        </div>
      </div>
      <div>
        <button type="button" @click.stop="addTowishList">
          <MdiHeartOutline
            v-if="!variant.wish_listed"
            :size="20"
            class="text-second"
          />
          <Heart v-else :size="20" class="text-red-500" />
        </button>
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
    variant: {
      type: Object,
      default: () => {},
    },
    product: {
      type: Object,
      default: {},
    },
    isWislist: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Heart: () => import("vue-material-design-icons/Heart.vue"),
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
  computed: {},
  methods: {
    goToProductDetails() {
      this.$router.push(`/shop/${this.variant.id}`);
    },
    imageError(e) {
      e.target.src = require("/assets/images/product.png");
    },
    async addTowishList() {
      try {
        if (!this.variant.wish_listed) {
          await this.$api.post(`/customer/wishlist/add-to-wishlist/`, {
            product_variant: this.variant.id,
          });
        } else {
          await this.$api.delete(
            `/customer/wishlist/${this.variant.id}/remove-wishlist/`
          );
        }
      } catch (error) {
        console.log("card-wishlist:", error);
      }
    },
  },
};
</script>

<style></style>
