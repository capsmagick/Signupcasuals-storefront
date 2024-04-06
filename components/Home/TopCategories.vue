<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
    <h5 class="text-2xl uppercase text-center mb-8">top categories</h5>
    <!-- <div class="grid grid-cols-8 gap-4 justify-center items-center mx-auto self-center"> -->
      <div class="flex items-center justify-center mx-auto self-center">
      <div
        v-for="category in categories"
        :key="category.value"
        class="flex justify-center items-center gap-4 flex-col md:w-52 cursor-pointer"
        @click="onSelectCategory(category)"
      >
        <div
          class="md:h-28 md:w-28 bg-white rounded-full flex items-center justify-center overflow-hidden"
        >
          <!-- <img
            :src="require(`~/assets/images/icons/categories/${category.icon}`)"
            alt=""
          /> -->
          <img v-if="category.image" :src="category.image" alt="" class="w-full h-full object-cover">
          <svg  v-else width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <h1 class="text-sm font-medium text-head text-center">{{ category.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTopCategories",
  data() {
    return {
      categories: [],
      dummyCat: [
        { name: "Handbags", value: "handbags", icon: "handbag.svg" },
        { name: "Clothings", value: "clothings", icon: "clothes-hanger.svg" },
        { name: "Jackets", value: "jackets", icon: "hoodie.svg" },
        { name: "Watches", value: "watches", icon: "wristwatch.svg" },
        { name: "Dresses", value: "dresses", icon: "wedding-dress.svg" },
        { name: "Shoes", value: "shoes", icon: "shoes.svg" },
        { name: "Jeans", value: "jeans", icon: "trousers.svg" },
        { name: "Shirts", value: "shirts", icon: "tshirt.svg" },
      ],
    };
  },
  methods: {
    async getProductCategories() {
      try {
        const { data } = await this.$api.get("/customer/category/")
        this.categories = Array.isArray(data?.results) ? data.results : this.dummyCat
      } catch (error) {
        console.log("top-categories:fetch-cat:", error)
      }
    },
    onSelectCategory(category){
      this.$router.push(`/shop?category=${category.id}`)
    }
  },
  async mounted() {
    await this.getProductCategories();
  },
};
</script>

<style></style>
