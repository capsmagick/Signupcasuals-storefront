<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto pt-12 pb-6 px-4">
    <h1 class="text-head text-3xl font-bold mb-4">CART</h1>
    <!-- Cart steps -->
    <div class="md:grid hidden grid-cols-3">
      <div
        v-for="(tab, idx) in checkoutTabs"
        :key="idx"
        class="text-lg text-head flex gap-2 font-medium border-b-[2px] border-head py-5 cursor-pointer"
      >
        0{{ idx + 1 }}
        <div @click="selectedTab = tab.value">
          <h6>{{ tab.title }}</h6>
          <p class="text-second text-sm font-normal">{{ tab.description }}</p>
        </div>
      </div>
    </div>

    <div class="md:hidden flex">
      <template v-for="(tab, idx) in checkoutTabs">
        <div
          v-if="step == tab.value"
          :key="idx"
          class="text-lg text-head flex flex-1 gap-2 font-medium border-b-[2px] border-head py-5 cursor-pointer"
        >
          0{{ idx + 1 }}
          <div @click="selectedTab = tab.value">
            <h6>{{ tab.title }}</h6>
            <p class="text-second text-sm font-normal">{{ tab.description }}</p>
          </div>
        </div>
      </template>
    </div>
    <!-- Cart steps -->

    <div class="py-10">
      <!-- Shopping bags -->
      <Cart v-if="step == 'checkout'" />
      <!-- Shopping bags -->
      <Address v-if="step == 'address'" />
      <!-- Checkout form -->
      <Confirmation v-if="step == 'confirmation'"/>
      <!--  -->

      <!-- Confirmation -->
      
    </div>
  </div>
</template>

<script>
import Address from "~/components/Cart/Address.vue";
import Cart from "~/components/Cart/index.vue";
import Confirmation from "~/components/Cart/Confirmation.vue";
export default {
  name: "CartPage",
  layout: "main",
  components: {
    Confirmation,
    Cart,
    Address,
  },
  data() {
    return {
      selectedTab: "shopping-bag",
      checkoutTabs: [
        {
          title: "SHOPPING BAG",
          description: "Manage Your Items List",
          value: "checkout",
          component: "Checkout",
        },
        {
          title: "SHIPPING AND CHECKOUT",
          description: "Checkout Your Items List",
          value: "address",
          component: "Address",
        },
        {
          title: "CONFIRMATION",
          description: "Review And Submit Your Order",
          value: "confirmation",
        },
      ],
      cartDetails: {},
      cartProducts: [],
      step: "checkout",
    };
  },
  watch: {
    $route: {
      handler(v) {
        const query = v.query;
        if (query.step) this.step = query.step;
      },
    },
  },
  methods: {
    proceedCheckout() {
      if (this.step == 1) {
        this.step = 2;
      }
    },
  },
  async mounted() {
    const query = this.$route.query;
    if (query.step) this.step = query.step;
  },
};
</script>

<style></style>
