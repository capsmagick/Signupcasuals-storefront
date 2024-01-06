<template>
  <div class="px-4">
    <!-- Hot list -->
    <div class="flex flex-col gap-4 py-4">
      <div class="flex h-[250px]">
        <div class="w-1/2 bg-footer uppercase text-head flex flex-col items-start justify-end px-7 pb-7">
          <p class="text-sm pb-1">Hot list</p>
          <h3 class="xs:text-2xl text-lg pb-1">
            <span class="font-medium">MEN</span> <br />
            <span>COLLECTION</span>
          </h3>
          <button class="uppercase text-sm font-medium">
            shop now
            <div class="block">
              <div class="w-1/2 h-[2px] bg-head"></div>
            </div>
          </button>
        </div>
        <div class="w-1/2">
          <img
            src="~/assets/images/product.png"
            class="h-full object-cover"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <!--  -->

      <div class="flex h-[250px]">
        <div class="w-1/2 bg-footer uppercase text-head flex flex-col items-start justify-end px-7 pb-7">
          <p class="text-sm pb-1">Hot list</p>
          <h3 class="xs:text-2xl text-lg pb-1">
            <span class="font-medium">KIDS</span> <br />
            <span>COLLECTION</span>
          </h3>
          <button class="uppercase text-sm font-medium">
            shop now
            <div class="block">
              <div class="w-1/2 h-[2px] bg-head"></div>
            </div>
          </button>
        </div>
        <div class="w-1/2">
          <img
            src="~/assets/images/product.png"
            class="h-full object-cover"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <!--  -->

      <div class="bg-[#F5E6E0] pt-28 px-7 pb-7">
          <h3 class="xs:text-2xl text-lg pb-1">
            <span class="font-medium">E-GIFT 
                </span> <br />
            <span>CARDS</span>
          </h3>
          <p class="text-sm pb-1">Surprise someone with the gift they <br />
            really want.</p>
          <button class="uppercase text-sm font-medium">
            DISCOVER MORE
            <div class="block">
              <div class="w-1/2 h-[2px] bg-head"></div>
            </div>
          </button>
      </div>
    </div>
    <TrendyProducts />
  </div>
</template>

<script>
import TrendyProducts from "./TrendyProducts.vue";
export default {
  name: "MobileHome",
  components: {
    TrendyProducts,
  },
};
</script>

<style></style>
