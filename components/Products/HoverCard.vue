<template>
  <div class="group">
    <div class="relative">
      <img src="~/assets/images/product.png" alt="" srcset="" />
      <div
        class="invisible group-hover:visible flex w-full flex-col gap-4 absolute items-end right-2 justify-end top-2"
      >
        <button
          class="w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <Eye :size="18" />
        </button>
        <button
          class="w-8 h-8 bg-second-red text-white rounded-full flex items-center justify-center"
        >
          <HeartOutline :size="18" />
        </button>
      </div>

      <div class="absolute flex w-full bottom-4 px-4">
        <button
          class="invisible group-hover:visible bg-white flex-1 text-sm py-2 text-head flex items-center justify-center"
        >
          ADD TO CART
        </button>
      </div>
    </div>
    <div class="flex justify-between pt-4">
      <div>
        <div class="text-xs text-second leading-5">Dresses</div>
        <div class="text-sm text-head leading-5">{{ product.title }}</div>
        <div class="text-sm text-head leading-5">60</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import Eye from "vue-material-design-icons/EyeOutline.vue";
export default {
  name: "ProductHoverCard",
  props:{
    product: {
    type: Object,
    default: {},
  },
  },
  components: {
    HeartOutline,
    Eye,
  },
};
</script>

<style></style>
