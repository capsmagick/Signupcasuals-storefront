<template>
  <div
    v-if="cartProducts && cartProducts.length"
    class="checkout_cart_parent lg:grid flex flex-col gap-[60px] lg"
  >
    <div class="flex flex-col">
      <div
        class="grid text-sm text-head font-medium uppercase border-b border-footer py-3"
        style="grid-template-columns: 4fr 1fr 1fr 1fr 40px"
      >
        <div>Product</div>
        <div>Price</div>
        <div>quantity</div>
        <div>subtotal</div>
        <div></div>
      </div>
      <!-- Products list -->
      <div
        v-for="item in cartProducts"
        :key="item"
        class="grid text-sm text-head font-medium border-b border-footer py-7"
        style="grid-template-columns: 4fr 1fr 1fr 1fr 40px"
      >
        <div class="flex gap-7">
          <div class="w-20 h-[100px]">
            <img
              v-if="
                item.product_variant.images &&
                item.product_variant.images.length
              "
              :src="`${apiUrl}${item.product_variant.images[0].thumbnail}`"
              class="w-full h-full object-cover"
              alt=""
            />
            <img
              v-else
              src="~/assets/images/product.png"
              class="w-[100px]"
              alt=""
              srcset=""
            />
          </div>
          <div class="flex items-center">
            <span class="text-head text">{{
              item.product_variant.product.name
            }}</span>
            <span></span>
          </div>
        </div>
        <div class="flex items-center text-second">
          {{ item.product_variant.selling_price | priceAmount }}
        </div>
        <div class="flex items-center">
          <div
            class="px-4 py-4 text-second border border-footer text-sm flex items-center gap-4"
          >
            <button @click="updateLineItem(item, 'remove')">-</button>
            {{ item.quantity }}
            <button @click="updateLineItem(item, 'add')">+</button>
          </div>
        </div>
        <div class="flex items-center">
          {{ item.total_amount | priceAmount }}
        </div>
        <div class="flex items-center text-second">
          <mdi-window-close @click="deleteLineItem(item)" :size="18" />
        </div>
      </div>

      <!-- Coupon -->
      <div class="flex items-center justify-between mt-6">
        <div class="text-sm flex items-center border border-footer px-6 py-4">
          <span class="text-second w-48">Coupon Code</span>
          <span class="font-medium text-head uppercase">APPLY COUPON </span>
        </div>
        <button
          class="text-sm font-medium text-head bg-footer px-6 py-4 flex items-center justify-center"
        >
          UPDATE CART
        </button>
      </div>
    </div>
    <div v-if="cartDetails">
      <div class="border border-head px-10 pt-9 pb-4 mb-6">
        <h6 class="text-sm font-medium mb-6">CART TOTALS</h6>
        <div class="flex flex-col divide-y divide-footer">
          <div
            class="flex py-4 gap-4 items-center text-xs font-medium text-head"
          >
            <div class="w-1/2">SUBTOTAL</div>
            <div class="w-1/2">
              {{ cartDetails.total_amount | priceAmount }}
            </div>
          </div>
          <div class="flex py-4 gap-4 text-xs font-medium text-head">
            <div class="w-1/2">SHIPPING</div>
            <div class="w-1/2">
              <ul class="font-normal">
                <li class="mb-4">Free shipping</li>
                <li class="mb-4">Flat rate: $49</li>
                <li class="mb-4">Local pickup: $8</li>
              </ul>
            </div>
          </div>
          <div
            class="flex py-4 gap-4 items-center text-xs font-medium text-head"
          >
            <div class="w-1/2">TAX</div>
            <div class="w-1/2">{{ cartDetails.tax_total | priceAmount }}</div>
          </div>
          <div
            class="flex py-4 gap-4 items-center text-xs font-medium text-head"
          >
            <div class="w-1/2">TOTAL</div>
            <div class="w-1/2">
              {{ cartDetails.total_amount | priceAmount }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <ReusableLoaderButton
          label="PROCEED TO CHECKOUT"
          :width="'w-full'"
          @click="gotToCheckout"
        />
      </div>
    </div>
  </div>
  <div v-else class="flex h-20 items-center justify-center">
    Oops, Your cart is empty.
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      cartProducts: [],
      cartDetails: {},
    };
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
    ...mapState(["isLoggedIn"]),
    apiUrl() {
      return this.$config.API_URL;
    },
  },
  methods: {
    async getCartProductList() {
      try {
        const { data } = await this.$api.get("/customer/cart/user-cart/");
        this.cartDetails = data;
        this.cartProducts = data.items;
      } catch (error) {
        console.log("fetch-cart:", error);
      }
    },
    async updateLineItem(lineItem, action) {
      try {
        let qty;
        if (action === "add") qty = 1;
        if (action === "remove") {
          if (lineItem.quantity - 1 === 0) {
            await this.deleteLineItem(lineItem);
            return;
          } else {
            qty = -1;
          }
        }
        const updatedCart = await this.$api.post(
          `/customer/cart/update-cart-product/`,
          {
            product_variant: lineItem.product_variant.id,
            quantity: qty,
          }
        );

        await this.getCartProductList();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLineItem(lineItem) {
      try {
        const updatedCart = await this.$api.delete(
          `/customer/cart/${lineItem.id}/remove-cart/`
        );
        await this.getCartProductList();
      } catch (error) {}
    },
    gotToCheckout() {
      this.$router.push({ query: { step: "address" } });
    },
  },
  async mounted() {
    if(this.isLoggedIn) await this.getCartProductList();
  },
};
</script>

<style></style>
