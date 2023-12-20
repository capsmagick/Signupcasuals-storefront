<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto py-[90px]">
    <div class="max-w-[500px] mx-auto text-center flex flex-col gap-4">
        <h1 class="text-head text-3xl font-bold mb-4 uppercase">Order Tracking</h1>
        <div class="text-sm text-second">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</div>
        <FormTextField placeholder="Order Id"/>
        <FormTextField placeholder="Billing email"/>
        <button
            class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center w-full"
          >
            TRACK
          </button>
    </div>
  </div>
</template>

<script>
export default {
    name:"OrderTrackingPage",
    layout:"main"
}
</script>

<style>

</style>