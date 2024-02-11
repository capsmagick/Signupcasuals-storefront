<template>
  <header class="fixed w-full bg-white block z-50">
    <div
      class="xl:max-w-7xl lg:max-w-4xl md:max-w-3xl md:px-0 px-4 mx-auto flex items-center justify-between py-4"
    >
      <div class="lg:hidden block">
        <button class="" @click="showSideNav = !showSideNav">
          <img src="~/assets/images/icons/nav-icon.svg" />
        </button>
      </div>
      <div class="flex items-center xl:gap-10 md:gap-4">
        <img src="~/assets/images/logo.png" class="h-10" />
        <!--Navigation  -->
        <nav class="lg:flex hidden">
          <ul
            class="flex items-center xl:gap-6 lg:gap-4 md:gap-2 text-sm uppercase text-head font-medium"
          >
            <li
              v-for="(link, idx) in navLinks"
              :key="idx"
              class="cursor-pointer"
            >
              <div v-if="link.value == 'pages'">
                <ReusableDropdown
                  menuClass="w-40"
                  :right="false"
                  dropMarginTop="mt-[28px]"
                >
                  <template #menu-activator="{ toggleMenu }">
                    <button
                      class="text-sm uppercase text-head font-medium px-4"
                      @click="toggleMenu"
                    >
                      {{ link.title }}
                    </button>
                  </template>
                  <template #menu-content="{ toggleMenu }">
                    <div class="flex flex-col px-[20px] py-5 gap-2 capitalize">
                      <div
                        v-for="page in pages"
                        :key="page.link"
                        @click="
                          toggleMenu();
                          goToPage(page);
                        "
                      >
                        {{ page.name }}
                      </div>
                    </div>
                  </template>
                </ReusableDropdown>
              </div>
              <a v-else @click="goToPage(link)" class="px-4">{{
                link.title
              }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Options -->
      <div class="flex items-center xl:gap-10 lg:gap-6 md:gap-4">
        <div>
          <button @click="toggleSearch" class="lg:flex hidden">
            <img v-if="!isSearchOpen" src="~/assets/images/icons/magnify.svg" />
            <MdiWindowClose v-else />
          </button>
        </div>

        <button class="lg:flex hidden" @click="goToPage({ link: 'account' })">
          <img src="~/assets/images/icons/account.svg" />
        </button>
        <button class="lg:flex hidden">
          <img src="~/assets/images/icons/heart.svg" />
        </button>
        <button @click="goToPage({ link: 'cart' })" class="relative">
          <img src="~/assets/images/icons/shopping-bag.svg" />
          <div
            v-show="cartItemCount > 0"
            class="absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center bg-third text-[10px] font-medium text-white rounded-full"
          >
            {{ cartItemCount }}
          </div>
        </button>
        <ReusableRightOpenNav title="login" width="700px">
          <template #modal-activator="{ toggleModal }">
            <button class="lg:flex hidden" @click="toggleModal">
              <img src="~/assets/images/icons/nav-icon.svg" />
            </button>
          </template>
          <template #modal-content="{ toggleModal }">
            <LoginRegisterForm @loggedIn="toggleModal" />
          </template>
        </ReusableRightOpenNav>
      </div>
    </div>
    <!-- mobile side bar -->
    <div
      v-if="showSideNav"
      class="lg:hidden block fixed z-30 bg-white w-full border-t py-4"
      style="height: calc(100vh - 72px)"
    >
      <div class="h-full flex flex-col divide-y divide-footer">
        <div class="px-4 flex-1">
          <div v-if="mobileLink != 'collection'" class="flex items-center">
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
            <nav v-if="!mobileLink" class="pt-4">
              <ul
                class="flex flex-col gap-6 text-[16px] uppercase text-head font-medium"
              >
                <li v-for="(link, idx) in navLinks" :key="idx">
                  <a
                    v-on:click="
                      [
                        link.value == 'pages' || link.value == 'collection'
                          ? (mobileLink = link.value)
                          : goToPage(link),
                      ]
                    "
                    class="flex items-end cursor-pointer"
                  >
                    <span class="flex-1">{{ link.title }}</span>
                    <span><ChevronRight /></span>
                  </a>
                </li>
              </ul>
            </nav>
            <!-- Pages -->
            <div v-if="mobileLink == 'pages'">
              <div
                class="flex items-center gap-2 font-medium border-b border-footer py-2"
              >
                <MdiChevronLeft class="cursor-pointer" @click="resetTab" />
                PAGES
              </div>
              <ul class="text-sm flex flex-col gap-4 pt-4">
                <li v-for="page in pages" :key="page.link">{{ page.name }}</li>
              </ul>
            </div>
            <!-- Collections -->
            <div v-if="mobileLink == 'collection'">
              <div class="flex items-center gap-2 mb-4">
                <button
                  v-for="item in collectionTabs"
                  :key="item"
                  :class="[
                    item == collectionCurrentTab
                      ? 'bg-head text-white'
                      : 'text-head bg-white',
                    'px-4 py-2 text-sm font-medium uppercase rounded-md',
                  ]"
                >
                  {{ item }}
                </button>
              </div>
              <div
                class="flex items-center gap-2 font-medium border-b border-footer py-2"
              >
                <MdiChevronLeft class="cursor-pointer" @click="resetTab" />
                COLLECTION
              </div>
              <ul class="text-sm flex flex-col gap-4 pt-4">
                <li v-for="collection in collections" :key="collection">
                  {{ collection }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="px-4 pt-4 flex flex-col gap-4">
          <div class="flex items-center text-lg uppercase font-medium gap-2">
            <AccountOutline :size="24" /> My Account
          </div>
          <div class="flex items-center">
            <div class="w-1/3 text-second">Language</div>
            <div class="flex-1 flex gap-2 text-head">
              United Kingdom | English
              <ChevronDown />
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-1/3 text-second">Currency</div>
            <div class="flex-1 flex gap-2 text-head">
              &#8377; INR
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        class="absolute inset-x-0 top-[72px] -z-10 bg-gray-300 bg-opacity-70 shadow-lg ring-1 ring-gray-900/5 overflow-hidden"
        style="height: calc(100vh - 72px)"
        v-if="isMenuOpen"
      >
        <div class="w-full bg-white">
          <div class="mx-auto max-w-7xl gap-x-8 gap-y-10 px-4 py-10 lg:px-4">
            <component :is="HeaderMenuComponent" />
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoginRegisterForm from "../LoginRegisterForm.vue";
import HeaderSearch from "./Search.vue";
export default {
  name: "SiteHeader",
  components: {
    Magnify: () => import("vue-material-design-icons/Magnify.vue"),
    ChevronRight: () => import("vue-material-design-icons/ChevronRight.vue"),
    AccountOutline: () =>
      import("vue-material-design-icons/AccountOutline.vue"),
    ChevronDown: () => import("vue-material-design-icons/ChevronDown.vue"),
    LoginRegisterForm,
    HeaderSearch,
  },
  data() {
    return {
      searchText: null,
      showSideNav: false,
      navLinks: [
        {
          title: "Home",
          value: "index",
          link: "index",
        },
        {
          title: "Shop",
          value: "shop",
          link: "shop",
        },
        {
          title: "Collection",
          value: "collection",
          link: "#top-collection",
        },
        {
          title: "Journal",
          value: "journal",
        },
        {
          title: "Lookbook",
          value: "look-book",
          link: "#look-book",
        },
        {
          title: "Pages",
          value: "pages",
        },
      ],
      pages: [
        {
          name: "About",
          link: "about",
        },
        {
          name: "Privacy Policy",
          link: "privacy-policy",
        },
        {
          name: "Payments",
          link: "payments",
        },
        {
          name: "Contact Us",
          link: "contact",
        },
      ],
      collectionTabs: ["women", "men", "kids"],
      collectionCurrentTab: "women",
      collections: [
        "New",
        "Best Sellers",
        "Collaborations®",
        "Sets",
        "DenimJackets & Coats",
        "Overshirts",
        "Trousers",
        "Jeans",
        "Dresses",
        "Sweatshirts and Hoodies",
        "T-shirts & Tops",
      ],
      customerCart: {},
      mobileLink: "",
      isSearchOpen: false,
      isMenuOpen: false,
      HeaderMenuComponent: "",
    };
  },
  watch: {
    customerProductsCart(v) {
      this.customerCart = JSON.parse(JSON.stringify(this.customerProductsCart));
    },
  },
  computed: {
    ...mapState("customer", ["customerProductsCart"]),
    cartItemCount() {
      return 1;
      // if (this.customerCart) {
      //   if (this.customerCart?.items.length) return cart.items.length;
      //   return 0
      // }
      // return 0;
    },
  },
  methods: {
    ...mapActions("customer", ["getCustomerProductCart","getRegions"]),
    async getProductCategories() {
      try {
        const { product_categories } = await this.$axios.$get(
          "/api/product-categories?parent_category_id=null"
        );
        if (!product_categories.length) this.categories = this.dummyCat;
        else this.categories = product_categories;
      } catch (error) {}
    },
    goToPage(link) {
      console.log("here");
      let val = link.link;
      if (val == "index") this.$router.push("/");
      else this.$router.push(`/${link.link}`);
      this.showSideNav = false;
    },
    resetTab() {
      this.mobileLink = "";
    },
    fetchUserProfile() {
      try {
        // const { customer } = this.$axios.$get("/api/auth");
        // this.$auth.setUser(customer);
      } catch (error) {}
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
      this.isMenuOpen = !this.isMenuOpen;
      this.HeaderMenuComponent = "HeaderSearch";
    },
  },
  mounted() {
    this.fetchUserProfile();
    this.getCustomerProductCart();
    this.getProductCategories()
    this.getRegions();
  },
};
</script>

<style></style>
