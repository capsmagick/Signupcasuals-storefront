<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto pt-12 pb-6">
    <!-- Products details -->
    <div class="product_detail_grid md:grid gap-5 pb-12 md:px-0 px-4" style="">
      <div class="flex md:flex-row flex-col-reverse gap-4">
        <div
          class="preview-slide-images md:flex md:flex-col grid grid-cols-4 md:w-20 gap-4 flex-shrink-0"
        >
          <!-- <div v-for="(image, idx) in product.images" :key="idx">
            <a class="cursor-pointer" @click="onSelectImage(idx)"
              ><img :src="image.url" alt=""
            /></a>
          </div> -->
        </div>
        <div class="selected-image flex-1">
          <img
            v-if="previewImage"
            :src="previewImage"
            alt=""
            class="w-full object-cover"
          />
          <img
            v-else
            src="~/assets/images/product.png"
            class="w-full object-cover"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="md:pl-10">
        <div class="md:flex hidden items-center justify-between">
          <div class="text-xs font-medium">
            HOME / SHOP
            <span v-if="product.name" class="uppercase"
              >/ {{ product.name }}</span
            >
          </div>
          <!-- <div
            v-if="filteredRelatedProducts && filteredRelatedProducts.length"
            class="flex items-center gap-4 text-xs text-head"
          >
            <button
              @click="selectNextOrPrev('prev')"
              class="flex items-center font-medium"
            >
              <span><mdi-chevron-left :size="18" /></span>PREV
            </button>
            <button
              @click="selectNextOrPrev('next')"
              class="flex items-center font-medium"
            >
              NEXT<span><mdi-chevron-right :size="18" /></span>
            </button>
          </div> -->
        </div>

        <!-- Details -->
        <div class="pt-10 text-head flex flex-col gap-8">
          <div>
            <h4 class="text-2xl capitalize">{{ product.name }}</h4>
            <h3 class="text-[22px] font-medium">
              {{ sellingPrice }}
            </h3>
          </div>
          <div class="flex">
            <div></div>
          </div>
          <!-- product colors -->
          <div class="flex text-sm items-center font-medium">
            <div class="w-20 flex-shrink-0">COLOR</div>
            <div class="grid grid-cols-6 gap-2 w-full">
              <div
                v-for="item in variants"
                :key="item.id"
                :class="[
                  item.id == variant.id ? 'border-head' : 'border-white',
                  'w-full h-20 border-2 cursor-pointer',
                ]"
                @click="onSelectVariant(item)"
              >
                <img
                  v-if="item.images && item.images.length"
                  :src="`${apiUrl}${item.images[0].thumbnail}`"
                  class="h-full w-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <div class="hidden items-center gap-2">
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
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center font-medium gap-2">
              <div class="w-20">SIZES</div>

              <div
                v-if="variantSize && variantSize.value"
                class="flex items-center gap-2 flex-wrap"
              >
                <button
                  class="bg-head text-white border-head border px-4 py-1.5 font-normal uppercase"
                  @click="onSelectVariant(variant)"
                >
                  {{ variantSize.value }}
                </button>
              </div>
            </div>
            <div
              class="font-medium text-xs text-head border-b-2 h-full border-head"
            >
              SIZE GUIDE
            </div>
          </div>

          <!--  -->
          <!-- options -->
          <div class="flex items-center gap-4">
            <div
              class="px-6 py-4 border border-footer text-sm flex items-center gap-4"
            >
              <button @click="onClickQty('sub')">
                <Minus :size="16" />
              </button>
              {{ itemQty }}
              <button @click="onClickQty('add')">
                <Plus :size="16" />
              </button>
            </div>
            <ReusableLoaderButton
              label="ADD TO CART"
              @click="addToCart"
              :loading="loading"
            />
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
              <span class="text-second uppercase">Categories:</span>
              <span
                class="uppercase"
                v-for="category in product.categories"
                :key="category.id"
                >{{ category.name }}</span
              >
            </div>
            <div class="flex items-center gap-2 text-sm mb-2">
              <span class="text-second uppercase">Tags:</span>
              <span v-for="tag in product.tags" :key="tag.id">{{
                tag.value
              }}</span>
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
          <p class="text-sm text-justify">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
    <!-- related products -->
    <div
      v-if="filteredRelatedProducts && filteredRelatedProducts.length"
      class="hidden md:block pt-12"
    >
      <h5 class="text-head text-2xl font-bold mb-6">
        <span class="font-normal">RELATED</span> PRODUCTS
      </h5>
      <div class="grid grid-cols-4 gap-8">
        <ProductCard
          v-for="item in filteredRelatedProducts.slice(0, 4)"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/Products/Card.vue";
import { mapActions } from "vuex";
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
      variant: {},
      previewImage: null,
      itemQty: 1,
      variants: [],
      selectedVariant: {},
      relatedProducts: [],
      options: [],
      optionColor: {},
      optionSize: {},
      loading: false,
      apiUrl: "https://manage.signupcasuals.com:8443",
      sellingPrice: 0,
    };
  },
  watch: {
    product(val) {
      this.calculatePrice();
    },
    variant(val) {
      this.calculatePrice();
    },
  },
  filters: {
    variantPrize() {
      if (this.variant && this.variant.selling_price) {
        return this.variant.selling_price;
      }
      return 0;
    },
  },
  computed: {
    apiUrl() {
      return this.$config.MEDIA_URL;
    },
    filteredRelatedProducts() {
      if (this.relatedProducts.length) {
        return this.relatedProducts.filter((p) => p.id != this.product.id);
      }
    },
    variantSize() {
      if (
        this.variant &&
        this.variant.attributes &&
        this.variant.attributes.length
      ) {
        const size = this.variant.attributes.find(
          (v) => v.attributes.name == "size"
        );

        return size;
      }
    },
  },
  methods: {
    ...mapActions("customer", ["getCustomerProductCart"]),
    async fetchProductsList() {
      const { product: productId } = this.$route.params;
      const { data } = await this.$api.get(`/customer/product/${productId}/`);
      const { data: productVariants } = await this.$api.get(
        `/customer/product/${productId}/other-variants/`
      );
      console.log("data:>>", data);
      this.product = data;
      if (productVariants.length > 0) this.variant = productVariants[0];
      else this.variant = this.product;
      this.variants = productVariants;
      this.calculatePrice();
      this.onSelectImage();
      // Default
      // this.selectedVariant = this.variants[0];
      // this.options = product.options;
      // this.optionColor = this.options.find((o) => o.title == "Color");

      // await this.getRelatedProducts();
    },
    async getRelatedProducts() {
      try {
        if (!this.product.categories.length) return;
        const categoryIds = this.product.categories.map((c) => c.id);
        const url =
          "/api/products?" +
          "category_id[]=" +
          categoryIds.join("&category_id[]=");
        const { products } = await this.$axios.$get(url);
        this.relatedProducts = products;
      } catch (error) {
        console.log("err", error);
      }
    },
    onSelectImage(index = null) {
      try {
        if (!index && this.variant.images && this.variant.images.length) {
          this.previewImage = `${this.apiUrl}${this.variant.images[0].image}`;
          return;
        }
        this.previewImage = this.variant.images[index];
      } catch (error) {
        console.log("image:error");
      }
    },
    onSelectVariant(variant) {
      this.variant = variant;
    },
    onClickQty(val) {
      if (val == "add") this.itemQty++;
      if (val == "sub") {
        if (this.itemQty == 1) return;
        this.itemQty--;
      }
    },
    async addToCart() {
      try {
        this.loading = true;
        await this.$api.post("/customer/cart/add-to-cart/", {
          product_variant: this.product.id,
          quantity: this.itemQty,
          price: this.product.selling_price,
        });

        this.getCustomerProductCart();

        this.$alert.show({
          title: "Successfully Added",
          description: "Your Product has been added to cart successfully!",
        });
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    calculatePrice() {
      try {
        let amount = 0;
        if (this.variant && this.variant.selling_price) {
          console.log("variant:>>");
          amount = this.variant.selling_price;
        } else if (this.product && this.product.sellingPrice) {
          console.log("product:>>");
          amount = this.product.selling_price;
        } else amount = 0;
        console.log("amount:>>", amount);
        this.sellingPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "inr",
        }).format(amount);
      } catch (error) {
        console.log("price");
      }
    },
  },
  mounted() {
    this.fetchProductsList();
  },
};
</script>

<style></style>
