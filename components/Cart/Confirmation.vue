<template>
    <div  class="max-w-3xl flex flex-col gap-9 mx-auto">
        <div class="flex items-center justify-center flex-col">
          <div
            class="h-20 w-20 bg-third flex items-center justify-center rounded-full mb-5"
          >
            <CheckBold :size="30" class="text-white" />
          </div>
          <h1 class="text-head text-4xl mb-2">Your order is completed!</h1>
          <p class="text-second text-sm">
            Thank you. Your order has been received.
          </p>
        </div>
        <div class="border border-dashed border-second p-10">
          <div class="grid grid-cols-4 text-sm text-second font-medium mb-4">
            <div>Order Number</div>
            <div>Date</div>
            <div>Total</div>
            <div>Payment Method</div>
          </div>
          <div class="grid grid-cols-4 text-[16px] text-head font-medium">
            <div>13119</div>
            <div>27/11/2020</div>
            <div>$40.10</div>
            <div>Direct Bank Transfer</div>
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
                class="flex items-center justify-between text-sm font-medium text-second"
              >
                <span>Kirby T-Shirt</span>
                <span>$32.50</span>
              </div>
              <div
                class="flex items-center justify-between text-sm font-medium text-second"
              >
                <span>Zessi Dresses x2</span>
                <span>$32.50</span>
              </div>
            </div>

            <div
              class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
            >
              <span>SUBTOTAL</span>
              <span>$89.90</span>
            </div>
            <div
              class="py-4 flex items-center justify-between text-sm font-medium text-head"
            >
              <span class="uppercase">SHIPPING</span>
              <span class="font-normal">Free shipping</span>
            </div>
            <div
              class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
            >
              <span>VAT</span>
              <span>$19</span>
            </div>
            <div
              class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
            >
              <span>PAYMENT METHOD</span>
              <span>Direct bank transfer</span>
            </div>
            <div
              class="py-4 flex items-center justify-between text-sm font-medium uppercase text-head"
            >
              <span>TOTAL</span>
              <span>$1319</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name:"CartConfirmation",
    components:{
        CheckBold: () => import("vue-material-design-icons/CheckBold.vue"),
    },
    data(){
        return{
            orderDetails:{}
        }
    },
    methods:{
        async getOrderDetails(){
            try {
                const { data } = await this.$api.get("/orders/order/");
                this.orderDetails = data.results
            } catch (error) {
                console.log("Order:", error)
            }
        }
    },
    mounted(){
        this.getOrderDetails()
    }
}
</script>

<style>

</style>