<template>
    <div class="bg-fourth">
      <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
        <h5 class="text-2xl uppercase text-center mb-8">lookbook</h5>
        <div class="pt-8 flex items-center gap-4">
          <!-- prev button -->
          <div class="grid md:grid-cols-4 grid-cols-2 gap-6">
            <div v-for="lookBook in lookBooks" class="relative" :key="lookBook.name">
              <div>
                <img src="~/assets/images/product.png" alt="" srcset="" />
              </div>
              <div class="absolute bottom-5 left-4 text-white">
                <h6 class=" text-sm">{{ lookBook.title}}</h6>
                <p class="text-lg">{{ lookBook.category}}</p>
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
        lookBooks: [
          {
            id: "Sample-1",
            title: "WOMEN SEASONS",
            category: "Floral Dress",
          },
          {
            id: "Sample-1",
            title: "WOMEN SEASONS",
            category: "Trench Coat",
          },
          {
            id: "Sample-1",
            title: "MEN SEASONS",
            category: "Folk Pants",
          },
          {
            id: "Sample-1",
            title: "MEN SEASONS",
            category: "Cos Jacket",
          },
        ],
      };
    },
  };
  </script>
  
  <style></style>
  