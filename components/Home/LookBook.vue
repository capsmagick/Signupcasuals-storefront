<template>
  <div class="bg-fourth">
    <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
      <h5 class="text-2xl uppercase text-center mb-8">lookbook</h5>
      <div class="pt-8 flex items-center gap-4">
        <!-- prev button -->
        <div class="flex flex-1 justify-center gap-4">
          <div
            v-for="lookBook in lookBooks.slice(0,4)"
            class="relative w-1/4 overflow-hidden cursor-pointer"
            :key="lookBook.name"
            @click="onClickProduct(lookBook)"
          >
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 h-64">
              <img v-if="lookBook.thumbnail" :src="lookBook.thumbnail" alt="" srcset="" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
              <img v-else src="~/assets/images/product.png" alt="" srcset="" />
            </div>
            <div class="absolute bottom-0 bg-footer w-full px-4 py-2 text-head rounded-b-md">
              <h6 class="text-lg">{{ lookBook.title }}</h6>
              <!-- <div v-if="lookBook.categories && lookBook.categories.length" class="flex items-center gap-1 flex-nowrap">
                <span v-for="category in lookBook.categories"  :key="category.id"> {{ category.name }}</span>
              </div> -->
              <p class="text-lg">{{ lookBook.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LookBook",
  data() {
    return {
      lookBooks: [],
    };
  },
  methods: {
    async fetchLookBook() {
      try {
        const { product_tags } = await this.$axios.$get("/api/product-tags");
        const lookBookTag = (product_tags ?? []).find(
          (t) => t.value.toLowerCase() == "lookbook"
        );
        if (lookBookTag) await this.getLookBookProducts(lookBookTag.id);
      } catch (error) {
        console.log(error);
      }
    },
    async getLookBookProducts(tagId = null) {
      try {
        const { products } = await this.$axios.$get(
          `/api/products?tags[]=${tagId}`
        );

        if (products && products.length) this.lookBooks = products;
      } catch (error) {
        console.log("fetch products:", error);
      }
    },
    onClickProduct(lookBook){
      this.$router.push(`/shop/${lookBook.id}`) 
    }
  },
  async mounted() {
    await this.fetchLookBook();
  },
};
</script>

<style></style>
