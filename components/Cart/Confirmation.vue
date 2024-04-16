<template>
  <div class="max-w-3xl flex flex-col gap-9 mx-auto">
    <div class="flex items-center justify-center flex-col">
      <div
        class="h-20 w-20 bg-third flex items-center justify-center rounded-full mb-5"
      >
        <CheckBold :size="30" class="text-white" />
      </div>
      <h1 class="text-head text-4xl mb-2">Review your order</h1>
      <p class="text-second text-sm">
        Please review your order and confirm order by payment.
      </p>
    </div>
    <div class="border border-dashed border-second p-10">
      <div class="grid grid-cols-3 text-sm text-second font-medium mb-4">
        <div>Order id</div>
        <div>Date</div>
        <div>Total</div>
        <!-- <div>Payment Method</div> -->
      </div>
      <div class="grid grid-cols-3 text-[16px] text-head font-medium">
        <div>{{ orderDetails.order_id }}</div>
        <div>{{ orderDetails.created_at }}</div>
        <!-- <div>$40.10</div> -->
        <div>{{ orderDetails.total_amount | priceAmount }}</div>
      </div>
    </div>
    <div class="border border-head p-10">
      <h5 class="text-[16px] font-medium text-head">ORDER DETAILS</h5>
      <div class="flex flex-col divide-y divide-footer">
        <div
          class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
        >
          <span>PRODUCT</span>
          <span>SUBTOTAL</span>
        </div>
        <div class="py-4 flex flex-col gap-4">
          <div
            v-for="item in orderDetails.orderitems"
            :key="item.id"
            class="flex items-center justify-between text-sm font-medium text-second"
          >
            <span class="flex items-center gap-2">
              <span>
                {{ item.product_variant.product.name }}
              </span>
              <MdiWindowClose :size="16" />
              <span>{{ item.quantity }}</span>
            </span>
            <span>{{ item.total_amount | priceAmount }}</span>
          </div>
        </div>

        <div
          class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
        >
          <span>SUBTOTAL</span>
          <span>{{ orderDetails.total_amount | priceAmount }}</span>
        </div>
        <div
          class="py-4 flex items-center justify-between text-sm font-medium text-head"
        >
          <span class="uppercase">SHIPPING</span>
          <span class="font-normal">Free shipping</span>
        </div>
        <div
          class="py-4 hidden items-center justify-between text-sm font-medium uppercase text-head"
        >
          <span>VAT</span>
          <span>$19</span>
        </div>
        <div
          class="py-4 hidden items-center justify-between text-sm font-medium uppercase text-head"
        >
          <span>PAYMENT METHOD</span>
          <span>Direct bank transfer</span>
        </div>
        <div
          class="py-4 hidden items-center justify-between text-sm font-medium uppercase text-head"
        >
          <span>TOTAL</span>
          <span>$1319</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <button
        class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center w-48"
        @click="makePayment"
      >
        PAYMENT
      </button>
    </div>
   <MakePayment v-if="showForm" :paymentPayload="paymentPayload"/>
  </div>
</template>

<script>
import MakePayment from './MakePayment.vue';
import CryptoJs from "crypto-js"
export default {
  name: "CartConfirmation",
  components: {
    CheckBold: () => import("vue-material-design-icons/CheckBold.vue"),
    MakePayment
  },
  data() {
    return {
      orderDetails: {},
      paymentPayload: {},
      showForm: false,
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
  methods: {
    async getOrderDetails() {
      try {
        const query = this.$route.query;
        if (query && query.order) {
          const { data } = await this.$api.get(
            `/orders/placeorder/${query.order}/`
          );
          this.orderDetails = data;
        }
      } catch (error) {
        console.log("Order:", error);
      }
    },
    async makePayment() {
      try {
        const { data } = await this.$api.post(
          `/transaction/payment/initiate/`,
          {
            order: this.orderDetails.id,
          }
        );

        this.paymentPayload = data.payload.payload;
        const payload = JSON.stringify(this.paymentPayload)
        const payloadMain = Buffer.from(payload).toString("base64")
        const key = this.paymentPayload.apiKey;
        const keyIndex = this.paymentPayload.keyINDEX;
        const string = payloadMain + '/pg/'
        // this.showForm = true;
        // const form = document.getElementById("payment-form");
        // form.click()
      } catch (error) {
        console.log("payment:", error);
      }
    },
  },
  mounted() {
    this.getOrderDetails();
  },
};
</script>

<style></style>
