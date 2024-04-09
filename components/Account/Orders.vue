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
      <div class="pl-8 py-4 flex items-center">{{order.orderId}}</div>
      <div class="py-4 flex items-center">{{ order.date }}</div>
      <div class="py-4 flex items-center">{{ order.status }}</div>
      <div class="py-4 flex items-center">{{ order.total }}</div>
      <div class="pr-8 py-4 flex items-center">
        <button class="px-8 py-4 bg-head text-white text-sm">VIEW</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountOrders",
  data(){
    return{
        orders:[
            { orderId:"#68787", date: new Date(), status: "On Hold", total:"$1200 for 3 items"},
            { orderId:"#25787", date: new Date(), status: "On Hold", total:"$1200 for 3 items"},
            { orderId:"#38125", date: new Date(), status: "On Hold", total:"$1200 for 3 items"}
        ]
    }
  },
  methods:{
    async getUserOrders(){
      try {
        const { data } = await this.$api.get("customer/orders/")
        console.log("data:", data)
      } catch (error) {
        console.log("user-orders:", error)
      }
    },
  },
  async mounted(){
    await this.getUserOrders()
  }
};
</script>

<style></style>
