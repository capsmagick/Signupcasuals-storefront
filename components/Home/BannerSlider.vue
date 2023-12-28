<template>
  <div class="home-banner relative">
    <div class="banner-images h-full">
      <img src="~/assets/images/banner.png" class="h-full" alt="" srcset="" />
    </div>
    <!-- Banner text -->
    <div
      class="absolute text-head top-[50%] left-[20%] transform -translate-y-[50%]"
    >
      <h1 class="text-5xl md:text-7xl capitalize">
        {{ selectedBanner.title }}
      </h1>
      <p class="text-base">{{ selectedBanner.description }}</p>
      <button class="text-lg font-medium border-b border-head pb-1 pt-4">
        Discover Now
      </button>
    </div>
    <div class="absolute bottom-10 left-[20%] flex gap-10">
      <button class="flex items-center gap-2 text-sm text-second font-medium">
        <span>PREV</span>
        <span class="h-[2px] bg-second w-10"></span>
      </button>
      <button class="flex items-center gap-2 text-sm text-second font-medium group">
        <span class="h-[2px] bg-second w-10"></span>
        <span>NEXT</span>
      </button>
    </div>
    <div class="absolute right-16 top-[50%] transform -translate-y-[50%]">
        <ul class="flex flex-col gap-4 md:gap-6 items-center">
            <li><img src="~/assets/images/icons/facebook.svg" alt="" srcset=""></li>
            <li><img src="~/assets/images/icons/twitter.svg" alt="" srcset=""></li>
            <li><img src="~/assets/images/icons/instagram.svg" alt="" srcset=""></li>
            <li><img src="~/assets/images/icons/pinterest.svg" alt="" srcset=""></li>
            <li><span class="text-second text-sm font-medium" style="writing-mode: tb-rl;">FOLLOW US</span></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBannerSlider",
  data() {
    return {
      imgIndex: 1,
      banners: [
        {
          title: "The Classics",
          description: "An exclusive selection of this season's trends.",
        },
        {
          title: "fresh Threads",
          description: "An exclusive selection of this season's trends.",
        },
        {
          title: "Trend Fashion",
          description: "An exclusive selection of this season's trends.",
        },
      ],
    };
  },
  watch: {
    imgIndex(v) {
      this.bannerSlider();
    },
  },
  computed: {
    selectedBanner() {
      return this.banners[this.imgIndex - 1];
    },
  },
  methods: {
    bannerSlider() {
      setTimeout(() => {
        if (this.imgIndex == 3) this.imgIndex = 1;
        else this.imgIndex++;
        console.log(this.imgIndex);
      }, 5000);
    },
  },
  mounted() {
    this.bannerSlider();
  },
};
</script>

<style>
.home-banner {
  display: block;
  height: calc(100vh - 72px);
}
</style>
