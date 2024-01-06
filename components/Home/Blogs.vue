<template>
  <div class="bg-fourth">
    <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:py-20 pb-6">
      <h5 class="text-2xl uppercase text-center mb-8">Our Blogs</h5>
      <div class="pt-8 flex items-center gap-4">
        <!-- prev button -->
        <div class="md:block hidden">
          <button
            class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second"
          >
            <MdiChevronLeft />
          </button>
        </div>

        <!-- prev button -->
        <div class="grid md:grid-cols-3 grid-cols-2 gap-6">
          <div v-for="blog in blogs" class="" :key="blog.name">
            <div>
              <img src="~/assets/images/product.png" alt="" srcset="" />
            </div>
            <div class="flex items-center text-sm text-second gap-8 pt-4">
                <span class="uppercase">By Admi</span>
                <span>Jan 16 2023</span>
            </div>
            <h3 class="text-lg text-head">{{ blog.name}}</h3>
          </div>
        </div>
        <!-- prev button -->
        <div class="md:block hidden">
          <button
            class="w-10 h-10 flex items-center justify-center bg-[#EEEEEE] rounded-full text-second"
          >
            <MdiChevronRight />
          </button>
        </div>

        <!-- prev button -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blogs",
  data() {
    return {
      blogs: [
        {
          id: "Sample-1",
          name: "Sample 1",
          description: "This is sample data #1",
        },
        {
          id: "Sample-2",
          name: "Sample 2",
          description: "This is sample data #2",
        },
        {
          id: "Sample-3",
          name: "Sample 3",
          description: "This is sample data #3",
        },
      ],
    };
  },
};
</script>

<style></style>
