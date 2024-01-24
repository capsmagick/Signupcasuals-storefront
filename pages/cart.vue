<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto pt-12 pb-6">
    <h1 class="text-head text-3xl font-bold mb-4">CART</h1>
    <!-- Cart steps -->
    <div class="grid grid-cols-3">
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
    <!-- Cart steps -->

    <div class="py-10">
      <!-- Shopping bags -->
      <div v-if="step == 1" class="grid gap-[60px]" style="grid-template-columns: 2fr 1fr">
        <div class="flex flex-col">
          <div
            class="grid text-sm text-head font-medium uppercase border-b border-footer py-3"
            style="grid-template-columns: 4fr 1fr 1fr 1fr 40px"
          >
            <div>Product</div>
            <div>Price</div>
            <div>quantity</div>
            <div>subtotal</div>
            <div></div>
          </div>
          <!-- Products list -->
          <div
            v-for="product in cartProducts"
            :key="product"
            class="grid text-sm text-head font-medium border-b border-footer py-7"
            style="grid-template-columns: 4fr 1fr 1fr 1fr 40px"
          >
            <div class="flex gap-7">
              <div class="w-20 h-full">
                <img v-if="product.thumbnail" :src="product.thumbnail" alt="">
                <img
                v-else
                  src="~/assets/images/product.png"
                  class="w-[100px]"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="flex items-center">
                <span class="text-head text">{{ product.title }}</span>
                <span></span>
              </div>
            </div>
            <div class="flex items-center text-second">$99</div>
            <div class="flex items-center">
              <div
                class="px-4 py-4 text-second border border-footer text-sm flex items-center gap-4"
              >
                <button>-</button>
                {{  product.quantity }}
                <button>+</button>
              </div>
            </div>
            <div class="flex items-center">$399</div>
            <div class="flex items-center text-second">
              <mdi-window-close :size="18" />
            </div>
          </div>

          <!-- Coupon -->
          <div class="flex items-center justify-between mt-6">
            <div
              class="text-sm flex items-center border border-footer px-6 py-4"
            >
              <span class="text-second w-48">Coupon Code</span>
              <span class="font-medium text-head uppercase">APPLY COUPON </span>
            </div>
            <button
              class="text-sm font-medium text-head bg-footer px-6 py-4 flex items-center justify-center"
            >
              UPDATE CART
            </button>
          </div>
        </div>
        <div>
          <div class="border border-head px-10 pt-9 pb-4 mb-6">
            <h6 class="text-sm font-medium mb-6">CART TOTALS</h6>
            <div class="flex flex-col divide-y divide-footer">
              <div
                class="flex py-4 gap-4 items-center text-xs font-medium text-head"
              >
                <div class="w-1/2">SUBTOTAL</div>
                <div class="w-1/2">$1300</div>
              </div>
              <div class="flex py-4 gap-4 text-xs font-medium text-head">
                <div class="w-1/2">SHIPPING</div>
                <div class="w-1/2">
                  <ul class="font-normal">
                    <li class="mb-4">Free shipping</li>
                    <li class="mb-4">Flat rate: $49</li>
                    <li class="mb-4">Local pickup: $8</li>
                  </ul>
                </div>
              </div>
              <div
                class="flex py-4 gap-4 items-center text-xs font-medium text-head"
              >
                <div class="w-1/2">VAT</div>
                <div class="w-1/2">$19</div>
              </div>
              <div
                class="flex py-4 gap-4 items-center text-xs font-medium text-head"
              >
                <div class="w-1/2">TOTAL</div>
                <div class="w-1/2">$1319</div>
              </div>
            </div>
          </div>
          <button
            class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center w-full"
            @click="proceedCheckout"
            >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
      <!-- Shopping bags -->

      <!-- Checkout form -->
      <div v-if="step == 2" class="grid gap-[60px]" style="grid-template-columns: 2fr 1fr">
        <div>
          <h5 class="text-[16px] text-head font-medium mb-4">BILLING DETAILS</h5>
          <div>
            <form action="" class="flex flex-col gap-6">
              <div class="flex items-center gap-4">
                <div class="w-1/2">
                  <FormTextField placeholder="First Name" />
                </div>
                <div class="w-1/2">
                  <FormTextField placeholder="Last Name" />
                </div>
              </div>
              <FormTextField placeholder="Company name (Optional)" />
              <FormTextField />
              <FormTextField placeholder="Town / City*" />
              <FormTextField placeholder="Postcode / ZIP *" />
              <FormTextField placeholder="Province *" />
              <FormTextField placeholder="Phone *" />
              <FormTextField placeholder="Your Mail" />
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
          <div class="border border-head px-10 pt-9 pb-4 mb-6">
            <h6 class="text-sm font-medium mb-6">YOUR ORDER</h6>
            <div class="flex flex-col divide-y divide-footer">
              <div
                class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
              >
                <div class="">PRODUCT</div>
                <div class="">SUBTOTAL</div>
              </div>
              <div
                class="flex flex-col py-4 gap-4 text-xs font-medium text-head"
              >
                <div
                  class="flex flex-1 items-center justify-between text-xs text-second"
                >
                  <div class="">Zessi Dresses x2</div>
                  <div class="">$32.50</div>
                </div>
                <div
                  class="flex flex-1 items-center justify-between text-xs text-second"
                >
                  <div class="">Zessi Dresses x2</div>
                  <div class="">$32.50</div>
                </div>
              </div>
              <div
                class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
              >
                <div class="">VAT</div>
                <div class="">$19</div>
              </div>
              <div
                class="flex py-4 gap-4 items-center justify-between text-xs font-medium text-head"
              >
                <div class="">TOTAL</div>
                <div class="">$1319</div>
              </div>
            </div>
          </div>
          <!--  -->
          <div
            class="border border-footer px-10 pt-9 pb-4 mb-6 flex flex-col gap-4"
          >
            <div class="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id=""
                class="accent-head mt-1"
              />
              <div>
                <h6 class="text-sm text-head font-medium">
                  Direct bank transfer
                </h6>
                <p class="text-xs">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference.Your order will not be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id=""
                class="accent-head mt-1"
              />
              <div>
                <h6 class="text-sm text-head font-medium">Check payments</h6>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id=""
                class="accent-head mt-1"
              />
              <div>
                <h6 class="text-sm text-head font-medium">Cash on delivery</h6>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <input
                type="radio"
                name="payment"
                id=""
                class="accent-head mt-1"
              />
              <div>
                <h6 class="text-sm text-head font-medium">Paypal</h6>
              </div>
            </div>
            <div class="text-head text-xs ">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <span class="text-red-500">privacy policy.</span> 
            </div>
          </div>
          <button
            class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center w-full"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
      <!--  -->

      <!-- Confirmation -->
      <div v-if="step == 3" class="max-w-3xl flex flex-col gap-9 mx-auto">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  layout: "main",
  components: {
    CheckBold: () => import("vue-material-design-icons/CheckBold.vue"),
  },
  data() {
    return {
      selectedTab:"shopping-bag",
      checkoutTabs: [
        {
          title: "SHOPPING BAG",
          description: "Manage Your Items List",
          value: "shopping-bag",
        },
        {
          title: "SHIPPING AND CHECKOUT",
          description: "Checkout Your Items List",
          value: "shipping-checkout",
        },
        {
          title: "CONFIRMATION",
          description: "Review And Submit Your Order",
          value: "confirmation",
        },
      ],
      cartDetails:{},
      cartProducts:[],
      step:1
    };
  },
  methods:{
    async getCartProductList(){
      const cartId = localStorage.getItem("cartId");
      if(!cartId) return;

      const { cart } = await this.$axios.$get(`/api/carts/${cartId}`)
      this.cartDetails = cart;
      this.cartProducts = cart.items
    },
    proceedCheckout(){
      console.log("herer")
      if(this.step == 1){
        this.step = 2;
      }
    }
  },
  async mounted(){
    await this.getCartProductList();
  }
};
</script>

<style></style>
