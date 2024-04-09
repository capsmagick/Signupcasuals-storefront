<template>
  <div class="grid gap-[60px]" style="grid-template-columns: 2fr 1fr">
    <div>
      <h5 class="text-[16px] text-head font-medium mb-4">BILLING DETAILS</h5>
      <div>
        <form action="" class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <div class="w-1/2">
              <FormTextField
                placeholder="Full name"
                v-model="shipping_address.full_name"
              />
            </div>
            <div class="w-1/2">
              <FormTextField
                placeholder="Contact Number"
                v-model="shipping_address.contact_number"
              />
            </div>
          </div>
          <FormTextField
            placeholder="Address 1"
            v-model="shipping_address.address_line_1"
          />
          <FormTextField
            placeholder="Address 2"
            v-model="shipping_address.address_line_2"
          />
          <FormTextField
            placeholder="Land mark"
            v-model="shipping_address.land_mark"
          />
          <FormTextField
            placeholder="district *"
            v-model="shipping_address.district"
          />
          <FormTextField
            placeholder="state *"
            v-model="shipping_address.state"
          />
          <FormTextField
            placeholder="country *"
            v-model="shipping_address.country"
          />
          <FormTextField
            placeholder="Pin code *"
            v-model="shipping_address.pin_code"
          />

          <ReusableSelectableMenu
            :placeholder="'Address type'"
            :items="addressTypes"
            :itemText="'name'"
            :itemValue="'value'"
            :selected="shipping_address.address_type"
            v-model="shipping_address.address_type"
            :search="false"
            class="w-full"
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
      addressTypes: [
        {
          name: "Shipping",
          value: "Shipping",
        },
        {
          name: "Billing",
          value: "Billing",
        },
      ],
      cart: [],
    };
  },
  computed: {},
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
        const { data } = await this.$api.post(
          "/account/user-address/create_record/",
          this.shipping_address
        );

        const { data: order } = await this.$api.post(
          "/orders/placeorder/place-order/",
          {
            address: data.data.id,
          }
        );

        this.$router.push({
          path: this.$route.path,
          query: { step: "confirmation", order: order.data.id },
        });
      } catch (error) {
        console.log();
      }
    },
  },
};
</script>

<style></style>
