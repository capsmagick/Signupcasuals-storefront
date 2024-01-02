<template>
  <div class="relative group">
    <div>
      <img src="~/assets/images/product.png" alt="" srcset="" />
    </div>
    <div class="flex justify-between pt-4">
      <div>
        <div class="text-xs text-second leading-5">Dresses</div>
        <div class="text-sm text-head leading-5">
          Calvin Shorts
        </div>
        <div class="text-sm text-head leading-5">60</div>
      </div>
      <div>
        <img src="~/assets/images/icons/heart-small.svg" />
      </div>
    </div>
    <button v-if="isWislist" class="invisible group-hover:visible absolute top-4 left-4 p-2 bg-white text-head rounded">
      <MdiWindowClose :size="18"/>
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props:{
    isWislist:{
      type: Boolean,
      default: false
    }
  }
};
</script>

<style></style>
