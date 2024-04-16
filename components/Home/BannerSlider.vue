<template>
  <div class="home-banner relative">
    <div class="banner-images h-full">
      <img :src="selectedBanner.image" class="h-full md:object-none object-cover" alt="" srcset=""/>
    </div>
    <!-- Banner text -->
    <div
      class="absolute text-head top-[50%] left-[20%] transform -translate-y-[50%]"
    >
      <h1 class="text-5xl md:text-7xl capitalize" v-html="selectedBanner.title">
        {{ selectedBanner.title }}
      </h1>
      <p class="text-base" v-html="selectedBanner.short_description">{{ selectedBanner.short_description }}</p>
      <button @click="onClickDiscover(selectedBanner.link)" class="text-lg font-medium border-b border-head pb-1 pt-4">
        {{ selectedBanner.cta_text }}
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
    <div class="sm:block hidden absolute right-16 top-[50%] transform -translate-y-[50%]">
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
      banners: [],
    };
  },
  watch: {
    imgIndex(v) {
      this.bannerSlider();
    },
  },
  computed: {
    selectedBanner() {
      if (this.banners.length !== 0) {
        return this.banners[this.imgIndex - 1];
      } else {
        return {}
      }
    },
  },
  methods: {
    async getBanners() {
      try {
        const {data} = await this.$api.get("/cms/customer/hero-section/")
        this.banners = data.results
        console.log('Banners:', this.banners)
      } catch (error) {
        const errorText = error.response.status + ' ' + error.response.statusText
        this.$alert.show({
          isError: true,
          title: error.response.status,
          description: errorText,
        });
      }
    },
    bannerSlider() {
      setTimeout(() => {
        const imageIndex = this.banners.length
        if (this.imgIndex === imageIndex) this.imgIndex = 1;
        else this.imgIndex++;
      }, 5000);
    },
    onClickDiscover(link) {
      window.location.href = link;
    }
  },
  mounted() {
    this.getBanners()
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
