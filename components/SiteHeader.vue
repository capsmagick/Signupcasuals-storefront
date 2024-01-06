<template>
  <header class="fixed w-full bg-white block z-40">
    <div
      class="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl md:px-0 px-4 mx-auto flex items-center justify-between py-4"
    >
      <div class="md:hidden block">
        <button class="" @click="showSideNav = !showSideNav">
          <img src="~/assets/images/icons/nav-icon.svg" />
        </button>
      </div>
      <div class="flex items-center xl:gap-10 md:gap-4">
        <img src="~/assets/images/logo.png" class="h-10" />
        <!--Navigation  -->
        <nav class="md:flex hidden">
          <ul
            class="flex items-center xl:gap-10 lg:gap-6 md:gap-4 text-sm uppercase text-head font-medium"
          >
            <li v-for="(link, idx) in navLinks" :key="idx" class="cursor-pointer">
              <a @click="goToPage(link)">{{ link.title }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Options -->
      <div class="flex items-center xl:gap-10 lg:gap-6 md:gap-4">
        <button class="md:flex hidden">
          <img src="~/assets/images/icons/magnify.svg" />
        </button>
        <ReusableRightOpenNav title="login" width="700px">
          <template #modal-activator="{ toggleModal }">
            <button class="md:flex hidden" @click="toggleModal">
              <img src="~/assets/images/icons/account.svg" />
            </button>
          </template>
          <template #modal-content="{ toggleModal }">
            <div>Hello</div>
          </template>
        </ReusableRightOpenNav>
        <button class="md:flex hidden">
          <img src="~/assets/images/icons/heart.svg" />
        </button>
        <button>
          <img src="~/assets/images/icons/shopping-bag.svg" />
        </button>
        <button class="md:flex hidden">
          <img src="~/assets/images/icons/nav-icon.svg" />
        </button>
      </div>
    </div>
    <!-- mobile side bar -->
    <div
    v-if="showSideNav"
      class="md:hidden block fixed z-30 bg-white w-full border-t py-4"
      style="height: calc(100vh - 72px)"
    >
      <div class="h-full flex flex-col divide-y divide-footer">
        <div class="px-4 flex-1">
          <div class="flex items-center">
            <input
              id="search-field"
              class="h-full w-full border border-footer py-3 pl-3 pr-8 text-head placeholder-second focus:border-head focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
              v-model="searchText"
            />
            <Magnify class="-ml-7 relative text-second" />
          </div>
          <div>
            <nav class="pt-4">
              <ul
                class="flex flex-col gap-6 text-[16px] uppercase text-head font-medium"
              >
                <li v-for="(link, idx) in navLinks" :key="idx">
                  <a href="#" class="flex items-end">
                    <span class="flex-1">{{ link.title }}</span>
                    <span><ChevronRight /></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="px-4 pt-4 flex flex-col gap-4">
          <div class="flex items-center text-lg uppercase font-medium gap-2"><AccountOutline :size="24"/> My Account</div>
          <div class="flex items-center">
            <div class="w-1/3 text-second">Language</div>
            <div class="flex-1 flex gap-2 text-head">United Kingdom | English
              <ChevronDown />
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-1/3 text-second">Currency</div>
            <div class="flex-1 flex gap-2 text-head">Usd
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "SiteHeader",
  components: {
    Magnify: () => import("vue-material-design-icons/Magnify.vue"),
    ChevronRight: () => import("vue-material-design-icons/ChevronRight.vue"),
    AccountOutline: () => import("vue-material-design-icons/AccountOutline.vue"),
    ChevronDown: () => import("vue-material-design-icons/ChevronDown.vue")
  },
  data() {
    return {
      searchText: null,
      showSideNav:false,
      navLinks: [
        {
          title: "Home",
          value: "index",
        },
        {
          title: "Shop",
          value: "shop",
        },
        {
          title: "Collection",
          value: "collection",
        },
        {
          title: "Journal",
          value: "journal",
        },
        {
          title: "Lookbook",
          value: "look-book",
        },
        {
          title: "Pages",
          value: "pages",
        },
      ],
    };
  },
  methods:{
    goToPage(link){
      let val = link.value;
      if(val == 'index') this.$router.push('/')
      else this.$router.push(`/${link.value}`)
    }
  }
};
</script>

<style></style>
