<template>
  <footer class="bg-footer w-full">
    <div
      class="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl mx-auto flex flex-col divide-y divide-[#CFCDCD]"
    >
      <div class="md:flex hidden items-center justify-between pt-12 pb-9 px-16">
        <div class="flex items-center gap-4">
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

        <div class="flex items-center gap-4">
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

        <div class="flex items-center gap-4">
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
      <!-- second col details -->
      <div class="pt-24 pb-16">
        <div class="grid grid-cols-12 justify-between items-center pb-8">
          <div class="col-span-3">
            <img src="~/assets/images/logo.png" class="block h-14" />
          </div>
          <h3 class="text-sm text-head font-medium col-span-2">COMPANY</h3>
          <h3 class="text-sm text-head font-medium col-span-2">SHOP</h3>
          <h3 class="text-sm text-head font-medium col-span-2">HELP</h3>
          <h3 class="text-sm text-head font-medium col-span-2">SUBSCRIBE</h3>
        </div>
        <div class="grid grid-cols-12">
          <div
            class="text-xs text-head flex flex-col gap-4 justify-start col-span-3"
          >
            <p class="leading-5">
              SignUp Casuals, Ground floor,<br />
            City centre, Thrissur<br />
            Kerala-680001<br />
            India<br />
            </p>
            <p class="leading-5">
            support@signupcasuals.com<br />
            +91 9562889921
            </p>
          </div>
          <div class="col-span-2">
            <ul class="flex flex-col space-y-4 text-xs">
              <li><nuxt-link to="/about">About Us</nuxt-link></li>
              <li><nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></li>
              <li><nuxt-link to="/payments">Payments</nuxt-link></li>
              <li><nuxt-link to="/contact">Contact Us</nuxt-link></li>
            </ul>
          </div>
          <div class="col-span-2">
            <ul class="flex flex-col space-y-4 text-xs">
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Men </a></li>
              <li><a href="#">Women </a></li>
              <li><a href="#">Shop All </a></li>
            </ul>
          </div>
          <div class="col-span-2">
            <ul class="flex flex-col space-y-4 text-xs">
              <li><nuxt-link to="/terms-conditions">Terms & Conditions</nuxt-link></li>
              <li><nuxt-link to="/shipping-policy">Shipping Policy</nuxt-link></li>
              <li><nuxt-link to="/exchange-cancellation-policy">Exchange & Cancellation Policy</nuxt-link></li>
              <li><nuxt-link to="/return-refund-policy">Return & Refund Policy</nuxt-link></li>
              
            </ul>
          </div>

          <div class="col-span-3 text-head flex flex-col gap-4">
            <p class="text-xs leading-5">
              Be the first to get the latest news about trends, <br />
              promotions, and much more!
            </p>
            <div class="flex items-center gap-4 bg-white px-4 py-4 text-head">
              <input
                type="email"
                name=""
                id=""
                placeholder="Your email address"
                class="text-sm text-head flex-1"
              />
              <button class="font-medium uppercase">Join</button>
            </div>
            <h5 class="text-[15] text-head font-medium">Secure payments</h5>
            <img src="~/assets/images/payments.png" />
          </div>
        </div>
      </div>
      <div class="pt-8 pb-6 flex items-center justify-between text-xs">
        <div>©SignUp Casuals  and powered by Knowbin Technologies Pvt Ltd.</div>
        <div class="flex gap-4">
          <span class="text-second">Language</span>
          <span>United Kingdom | English</span>
          <span class="text-second">Currency</span>
          <span>&#8377; INR</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style></style>
