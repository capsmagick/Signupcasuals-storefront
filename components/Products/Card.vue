<template>
  <div class="relative flex flex-col group cursor-pointer" @click="goToProductDetails">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img v-if="product.thumbnail" :src="product.thumbnail" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
      <img v-else src="~/assets/images/product.png" alt="" srcset="" />
    </div>
    <div class="flex justify-between pt-4">
      <div>
        <div class="text-xs text-second leading-5">Dresses</div>
        <div class="text-sm text-head leading-5">
          {{ product.title }}
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
    product:{
      type: Object,
      default: {}
    },
    isWislist:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{}
  },
  methods:{
    goToProductDetails(){
      this.$router.push(`/shop/${this.product.id}`)
    }
  }
};
</script>

<style></style>
