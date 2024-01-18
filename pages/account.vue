<template>
  <div class="xl:max-w-7xl lg:max-w-4xl mx-auto md:px-0 px-4 py-12 min-h-[500x]">
    <h1 class="text-head text-3xl font-bold mb-4 uppercase">{{ currentNavDetails.name}}</h1>
    <div class="account pt-12 grid gap-4">
      <!-- nav bar -->
      <aside>
        <ul class="flex flex-col gap-6">
          <li v-for="nav in accountNav" :key="nav.value">
            <a
              :class="[ currentNav == nav.value ? 'text-second-red border-second-red' : 'text-head border-transparent','text-sm font-medium uppercase border-b-2 cursor-pointer' ]"
              @click="currentNav = nav.value"
            >
              {{ nav.name }}</a
            >
          </li>
        </ul>
      </aside>
      <!--  -->
      <div>
        <div v-if="currentNav == 'dashboard'">
            <p class="text-head text-sm">Hello <span class="font-medium">{{ user?.first_name ?? "Guest"}}</span>( not <span class="font-medium">user</span>? Log Out )</p>
            <p class="text-head text-sm pt-10">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
        </div>
        <div v-else>
            <component :is="currentNavDetails.component"/>
        </div>
        </div>
    </div>
    <!-- Cart steps -->
  </div>
</template>

<script>
export default {
  name: "AccountPage",
  layout: "main",
  components:{ 
    Orders: () => import("@/components/Account/Orders.vue"),
    Downloads: () => import("@/components/Account/Downloads.vue"),
    Addresses: () => import("@/components/Account/Addresses.vue"),
    AccountDetails: () => import("@/components/Account/AccountDetails.vue"),
    Wishlist: () => import("@/components/Account/Wishlist.vue")
  },
  data() {
    return {
      accountNav: [
        { name: "dashboard", value: "dashboard", component: "dashboard" },
        { name: "orders", value: "orders", component: "orders" },
        { name: "downloads", value: "downloads", component: "downloads" },
        { name: "addresses", value: "addresses", component: "addresses" },
        { name: "account details", value: "account-details", component: "account-details" },
        { name: "wishlist", value: "wishlist", component: "wishlist" },
      ],
      currentNav: "dashboard",
    };
  },
  computed:{
    currentNavDetails(){
        return this.accountNav.find((e) => e.value == this.currentNav)
    },
    user(){
      return this.$auth.user
    }
  }
};
</script>

<style></style>
