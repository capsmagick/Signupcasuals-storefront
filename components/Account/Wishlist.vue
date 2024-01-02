<template>
    <div>
        <div class="grid grid-cols-3 gap-6">
            <div v-for="product in 5" :key="product" class="">
                <ProductCard :isWislist="true"/>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import ProductCard from "../Products/Card.vue"
  export default {
      name:"AccountWishlist",
      components:{
        ProductCard
      }
  }
  </script>
  
  <style>
  
  </style>