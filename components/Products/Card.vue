<template>
  <div
    class="relative flex flex-col group cursor-pointer"
    @click="goToProductDetails"
  >
    <div
      class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-72"
    >
      <img
        v-if="thumbImage"
        :src="thumbImage"
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
      @click.stop="removeFromWishlist"
    >
      <MdiWindowClose :size="18" />
    </button>
  </div>
</template>

<script>
import {mapState} from "vuex";

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
    return {
      apiUrl: 'https://manage.signupcasuals.com:8443',
    };
  },
  filters: {
    priceAmount(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "inr",
      }).format(price);
    },
  },
  computed: {
    ...mapState(["isLoggedIn"]),
    thumbImage() {
      if (this.variant.images && this.variant.images.length) {
        const image = this.variant.images[0].image;
        return `${this.apiUrl}${image}`;
      }
    },
  },
  methods: {
    goToProductDetails() {
      this.$router.push(`/shop/${this.variant.id}`);
    },
    imageError(e) {
      e.target.src = require("/assets/images/product.png");
    },
    async addTowishList() {
      try {
        if (!this.isLoggedIn) {
          this.$alert.show({
            isError: true,
            title: "Oops, cannot add to wishlist.",
            description:
              "Please login to add product to your wishlist.",
          });
        }
        if (!this.variant.wish_listed) {
          await this.$api.post(`/customer/wishlist/add-to-wishlist/`, {
            product_variant: this.variant.id,
          });
        } else {
          await this.$api.delete(
            `/customer/wishlist/${this.variant.id}/remove-wishlist/`
          );
        }
        this.$emit("refresh-products");
      } catch (error) {
        console.log("card-wishlist:", error);
      }
    },
    async removeFromWishlist() {
      try {
        await this.$api.delete(
          `/customer/wishlist/${this.variant.id}/remove-wishlist/`
        );

        this.$emit("refresh-products");
      } catch (error) {
        console.log("remove:", error);
      }
    },
  },
};
</script>

<style></style>
