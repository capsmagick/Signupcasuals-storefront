<template>
  <div class="border border-footer flex flex-col divide-y divide-footer">
    <div
      class="grid uppercase text-sm font-medium bg-footer text-head"
      style="grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr"
    >
      <div class="pl-8 py-4">order</div>
      <div class="py-4">date</div>
      <div class="py-4">status</div>
      <div class="py-4">total</div>
      <div class="pr-8 py-4">actions</div>
    </div>

    <!-- Orders -->
    <div
      v-for="order in orders"
      :key="order.orderId"
      class="grid text-sm text-head"
      style="grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr"
    >
      <div class="pl-8 py-4 flex items-center">{{ order.order_id }}</div>
      <div class="py-4 flex items-center">
        {{ order.created_at | formatDate }}
      </div>
      <div class="py-4 flex items-center">{{ order.status }}</div>
      <div class="py-4 flex items-center">
        {{ order.total_amount | totalAmount }}
      </div>
      <div class="pr-8 py-4 flex items-center">
        <button class="px-8 py-4 bg-head text-white text-sm">VIEW</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "AccountOrders",
  data() {
    return {
      orders: [],
    };
  },
  filters: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    totalAmount(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "inr",
      }).format(price);
    },
  },
  methods: {
    async getUserOrders() {
      try {
        const { data } = await this.$api.get("/customer/orders/");
        if (Array.isArray(data.results) && data.results.length > 0)
          this.orders = data.results;
      } catch (error) {
        console.log("user-orders:", error);
      }
    },
  },
  async mounted() {
    await this.getUserOrders();
  },
};
</script>

<style></style>
