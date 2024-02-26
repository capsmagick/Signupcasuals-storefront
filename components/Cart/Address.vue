<template>
  <div class="grid gap-[60px]" style="grid-template-columns: 2fr 1fr">
    <div>
      <h5 class="text-[16px] text-head font-medium mb-4">BILLING DETAILS</h5>
      <div>
        <form action="" class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div class="w-1/2">
              <FormTextField
                placeholder="First Name"
                v-model="shipping_address.first_name"
              />
            </div>
            <div class="w-1/2">
              <FormTextField
                placeholder="Last Name"
                v-model="shipping_address.last_name"
              />
            </div>
          </div>
          <FormTextField
            placeholder="Address 1"
            v-model="shipping_address.address_1"
          />
          <FormTextField
            placeholder="Address 2"
            v-model="shipping_address.address_2"
          />
          <FormTextField
            placeholder="Company name (Optional)"
            v-model="shipping_address.company"
          />
          <FormTextField
            placeholder="Town / City*"
            v-model="shipping_address.city"
          />
          <FormTextField
            placeholder="Province *"
            v-model="shipping_address.province"
          />
          <FormTextField
            placeholder="Postcode / ZIP *"
            v-model="shipping_address.postal_code"
          />
          <FormTextField
            placeholder="Phone *"
            v-model="shipping_address.phone"
          />
          <!-- <FormTextField
            placeholder="Your Mail"
            v-model="shipping_address.email"
          /> -->
          <div class="text-sm font-medium text-head">
            CREATE AN ACCOUNT? <br />
            SHIP TO A DIFFERENT ADDRESS?
          </div>
          <textarea
            rows="8"
            class="block w-full text-appText appearance-none border border-footer px-3 py-2 text-clip placeholder-gray-400 shadow-sm focus:border-head focus:outline-none focus:ring-head sm:text-sm"
            placeholder="Order Notes (optional)"
          />
        </form>
      </div>
    </div>
    <div>
      <div
        v-if="cart.items && cart.items.length"
        class="border border-head px-10 pt-9 pb-4 mb-6"
      >
        <h6 class="text-sm font-medium mb-6">YOUR ORDER</h6>
        <div class="flex flex-col divide-y divide-footer">
          <div
            class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
          >
            <div class="">PRODUCT</div>
            <div class="">SUBTOTAL</div>
          </div>
          <div class="flex flex-col py-4 gap-4 text-xs font-medium text-head">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex flex-1 items-center justify-between text-xs text-second"
            >
              <div class="flex items-center">
                <span>{{ item.title }}</span>
                &nbsp; x{{ item.quantity }}
              </div>
              <div class="">{{ item.total | priceAmount }}</div>
            </div>
          </div>
          <div
            class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
          >
            <div class="">SUB TOTAL</div>
            <div class="">{{ cart.subtotal | priceAmount }}</div>
          </div>
          <div
            class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
          >
            <div class="">TAX</div>
            <div class="">{{ cart.tax_total | priceAmount }}</div>
          </div>
          <div
            class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
          >
            <div class="">TOTAL</div>
            <div class="">{{ cart.total | priceAmount }}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div
        class="border border-footer px-10 pt-9 pb-4 mb-6 flex flex-col gap-4"
      >
        <div class="flex items-start gap-2">
          <input type="radio" name="payment" id="" class="accent-head mt-1" />
          <div>
            <h6 class="text-sm text-head font-medium">Direct bank transfer</h6>
            <p class="text-xs">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference.Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <input type="radio" name="payment" id="" class="accent-head mt-1" />
          <div>
            <h6 class="text-sm text-head font-medium">Check payments</h6>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <input type="radio" name="payment" id="" class="accent-head mt-1" />
          <div>
            <h6 class="text-sm text-head font-medium">Cash on delivery</h6>
          </div>
        </div>
        <div class="flex items-start gap-2">
          <input type="radio" name="payment" id="" class="accent-head mt-1" />
          <div>
            <h6 class="text-sm text-head font-medium">Paypal</h6>
          </div>
        </div>
        <div class="text-head text-xs">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our <span class="text-red-500">privacy policy.</span>
        </div>
      </div>
      <button
        class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center w-full"
        @click="updateShippingAddress"
      >
        PLACE ORDER
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "cartAddress",
  data() {
    return {
      shipping_address: {
        country_code: "in",
      },
    };
  },
  computed: {
    ...mapState("customer", ["customerProductsCart"]),
    cart() {
      return this.customerProductsCart;
    },
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
  methods: {
    async updateShippingAddress() {
      try {
        const cartId = localStorage.getItem("cartId");
        if (!cartId) return;
        await this.$axios.$post(`/api/carts/${cartId}`, {
          shipping_address: this.shipping_address,
        });
      } catch (error) {}
    },
  },
};
</script>

<style></style>
