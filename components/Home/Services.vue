<template>
  <div class="flex flex-col divide-y divide-footer">
    <div>
      <div class="xl:max-w-7xl lg:max-w-4xl mx-auto">
        <div class="flex items-center justify-between py-24 px-16">
          <div class="flex flex-col items-center gap-4">
            <img src="~/assets/images/icons/shipping.svg" alt="" srcset="" />
            <div class="">
              <div class="text-sm font-medium text-head">
                FAST AND FREE DELIVERY
              </div>
              <div class="text-xs text-second">
                Free delivery for all orders over $140
              </div>
            </div>
          </div>
    
          <div class="flex flex-col items-center gap-4">
            <img src="~/assets/images/icons/headphone.svg" alt="" srcset="" />
            <div class="">
              <div class="text-sm font-medium text-head">
                24/7 CUSTOMER SUPPORT
              </div>
              <div class="text-xs text-second">
                Friendly 24/7 customer support
              </div>
            </div>
          </div>
    
          <div class="flex flex-col items-center gap-4">
            <img src="~/assets/images/icons/shield.svg" alt="" srcset="" />
            <div class="">
              <div class="text-sm font-medium text-head">
                MONEY BACK GUARANTEE
              </div>
              <div class="text-xs text-second">
                We return money within 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="xl:max-w-7xl lg:max-w-4xl  px-16 mx-auto ">
        <div class="flex items-center divide-x divide-footer">
          <div class="w-1/2 py-24">
            <div class="flex flex-col gap-4 items-center justify-center">
              <h1 class="text-lg font-medium text-head">
              Stay in Touch
            </h1>
            <ul class="flex gap-4 md:gap-6 items-center">
              <li><img src="~/assets/images/icons/facebook.svg" alt="" srcset=""></li>
              <li><img src="~/assets/images/icons/twitter.svg" alt="" srcset=""></li>
              <li><img src="~/assets/images/icons/instagram.svg" alt="" srcset=""></li>
              <li><img src="~/assets/images/icons/pinterest.svg" alt="" srcset=""></li>
          </ul>
            </div>
          </div>
          <div class="w-1/2 py-24">
            <div class="flex flex-col gap-4 items-center justify-center">
              <h1 class="text-lg font-medium text-head">
                Sign up now & get 10% off
            </h1>
            <p class="text-sm text-second">Be the first to get the latest news about trends, promotions, and much more!</p>
            <div class="flex items-center gap-2">
              <FormTextField placeholder="Last Name" />
              <button class="flex text-sm px-6 py-2 h-full bg-head text-white">JOIN</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>