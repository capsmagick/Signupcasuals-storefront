<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto pt-12 pb-6">
    <!-- Products details -->
    <div class="product_detail_grid md:grid gap-5 pb-12 md:px-0 px-4" style="">
      <div class="flex md:flex-row flex-col-reverse gap-4">
        <div
          class="preview-slide-images md:flex md:flex-col grid grid-cols-4 md:w-20 gap-4 flex-shrink-0"
        >
          <div v-for="(image, idx) in product.images" :key="idx">
            <a class="cursor-pointer" @click="onSelectImage(idx)"
              ><img :src="image.url" alt=""
            /></a>
          </div>
        </div>
        <div class="selected-image flex-1">
          <img :src="previewImage.url" alt="" class="w-full object-cover" />
        </div>
      </div>
      <div class="md:pl-10">
        <div class="md:flex hidden items-center justify-between">
          <div class="text-xs font-medium">HOME / SHOP</div>
          <div class="flex items-center gap-4 text-xs text-head">
            <button class="flex items-center font-medium">
              <span><mdi-chevron-left :size="18" /></span>PREV
            </button>
            <button class="flex items-center font-medium">
              NEXT<span><mdi-chevron-right :size="18" /></span>
            </button>
          </div>
        </div>

        <!-- Details -->
        <div class="pt-10 text-head flex flex-col gap-8">
          <div>
            <h4 class="text-2xl">{{ product.title }}</h4>
            <h3 class="text-[22px] font-medium">$249</h3>
          </div>
          <p class="text-sm text-justify">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center font-medium">
              <div class="w-20">SIZES</div>

              <div class="flex items-center gap-2">
                <button
                  v-for="variant in variants"
                  :key="variant"
                  :class="[
                    variant.id == selectedVariant.id
                      ? 'bg-head text-white border-head'
                      : 'border-footer text-head',
                    'border px-4 py-1.5 font-normal uppercase',
                  ]"
                  @click="onSelectVariant(variant)"
                >
                  {{ variant.title }}
                </button>
              </div>
            </div>
            <div
              class="font-medium text-xs text-head border-b-2 h-full border-head"
            >
              SIZE GUIDE
            </div>
          </div>
          <!-- product colors -->
          <div class="flex text-sm items-center font-medium">
            <div class="w-20">COLOR</div>

            <div class="flex items-center gap-2">
              <div
                v-for="color in colors"
                :key="color"
                :class="{
                  'ring-2 ring-head': selectedColor == color,
                }"
                class="h-7 w-7 rounded-full flex items-center justify-center"
                @click="onSelectColor(color)"
              >
                <div
                  class="h-5 w-5 rounded-full"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>
          <!--  -->
          <!-- options -->
          <div class="flex items-center gap-4">
            <div
              class="px-6 py-4 border border-footer text-sm flex items-center gap-4"
            >
              <button @click="onClickQty('sub')"><Minus :size="16" /></button>
              {{ itemQty }}
              <button @click="onClickQty('add')"><Plus :size="16" /></button>
            </div>
            <button
              class="text-sm font-medium text-white bg-head px-6 py-4 w-52"
              @click="addToCart"
            >
              ADD TO CART
            </button>
          </div>
          <!--  -->
          <!--  -->
          <div class="flex items-center gap-6 text-head">
            <button class="flex items-center gap-2 text-sm font-medium">
              <mdi-heart-outline :size="18" />
              ADD TO WISHLIST
            </button>
            <button class="flex items-center gap-2 text-sm font-medium">
              <mdi-share-variant-outline :size="18" />
              SHARE
            </button>
          </div>
          <!--  -->
          <div class="">
            <div class="text-sm mb-2">
              <span class="text-second uppercase">SKU:</span> N/A
            </div>
            <div class="text-sm mb-2">
              <span class="text-second uppercase">Categories:</span>Casual &
              Urban Wear, Jackets, Men
            </div>
            <div class="text-sm mb-2">
              <span class="text-second uppercase">Tags:</span>biker, black,
              bomber, leather
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div v-for="tab in tabs" :key="tab" class="text-sm uppercase">
              <h6
                class="font-medium border-b-2 cursor-pointer"
                @click="selectedTab = tab"
                :class="[
                  selectedTab == tab
                    ? 'text-head border-head'
                    : 'text-second border-transparent',
                ]"
              >
                {{ tab }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- related products -->
    <div class="hidden md:block pt-12">
      <h5 class="text-head text-2xl font-bold mb-6">
        <span class="font-normal">RELATED</span> PRODUCTS
      </h5>
      <div class="grid grid-cols-4 gap-8">
        <ProductCard v-for="item in 4" :key="item" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
export default {
  name: "singleProductPage",
  layout: "main",
  components: {
    ProductCard,
    Plus: () => import("vue-material-design-icons/Plus.vue"),
    Minus: () => import("vue-material-design-icons/Minus.vue"),
  },
  data() {
    return {
      selectedTab: "description",
      colors: ["#222222", "#C93A3E", "#E4E4E4"],
      tabs: ["description", "additional information", "reviews"],
      selectedColor: null,
      imageIdx: 0,
      product: {},
      previewImage: {},
      itemQty: 1,
      variants: [],
      selectedVariant: {},
    };
  },
  methods: {
    async fetchProductsList() {
      const { product: productId } = this.$route.params;
      const { product } = await this.$axios.$get(
        `/api/products/${productId}`
      );
      this.product = product;
      this.previewImage = product.images[0];
      this.variants = product.variants;

      // Default
      this.selectedVariant = this.variants[0];
    },
    onSelectImage(index = null) {
      if (!index) return;
      this.previewImage = this.product.images[index];
    },
    onSelectVariant(variant){
      this.selectedVariant = variant
    },
    onClickQty(val) {
      if (val == "add") this.itemQty++;
      if (val == "sub") {
        if (this.itemQty == 1) return;
        this.itemQty--;
      }
    },
    async addToCart() {
      if (!localStorage.getItem("cartId")) {
        const { cart } = await this.$axios.$post("/api/carts");
        localStorage.setItem("cartId", cart.id);
      }
      let cartId = localStorage.getItem("cartId");
      console.log("herere")
      const variant_id = this.selectedVariant.id;

      const updatedCart = await this.$axios.$post(
        `/api/carts/${cartId}/line-items`,
        {
          variant_id,
          quantity: 2,
        }
      );
    },
  },
  mounted() {
    this.fetchProductsList();
  },
};
</script>

<style></style>
