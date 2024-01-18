<template>
  <div>
    <div v-if="isShowLogin">
      <form action="" @submit.prevent>
        <div class="mb-6">
          <FormTextField
            v-model="login.email"
            placeholder="Username or email address *"
          />
        </div>
        <div class="mb-6">
          <FormTextField v-model="login.password" placeholder="Password" />
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="text-second text-sm">
            <input type="checkbox" name="" id="" />
            Remember me
          </div>
          <button class="text-head underline text-sm">Lost password?</button>
        </div>
        <button
          class="w-full px-8 py-4 bg-head text-center text-white text-sm mb-6"
          @click="customerLogin"
        >
          LOGIN
        </button>
        <p class="text-sm text-second text-center">
          No account yet?
          <span
            class="text-head underline cursor-pointer"
            @click="isShowLogin = false"
            >Create Account</span
          >
        </p>
      </form>
    </div>
    <!-- Create Account Form -->
    <div v-else>
      <form action="" @submit.prevent>
        <div class="mb-6">
          <FormTextField
            v-model="customerRegister.first_name"
            placeholder="First Name"
          />
        </div>
        <div class="mb-6">
          <FormTextField
            v-model="customerRegister.last_name"
            placeholder="Last Name"
          />
        </div>
        <div class="mb-6">
          <FormTextField
            v-model="customerRegister.email"
            placeholder="Email address *"
          />
        </div>
        <div class="mb-6">
          <FormTextField
            v-model="customerRegister.password"
            placeholder="Password"
          />
        </div>
        <div class="mb-6">
          <FormTextField
            v-model="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <p class="text-second text-sm text-justify mb-6">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>
        <button
          class="w-full px-8 py-4 bg-head text-center text-white text-sm mb-6"
          @click="registerCustomer"
        >
          REGISTER
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegisterForm",
  data() {
    return {
      isShowLogin: true,
      customerRegister: {},
      login: {},
      confirmPassword: null,
    };
  },
  methods: {
    async customerLogin() {
      try {
        const { customer } = await this.$axios.$post("/api/auth", this.login);
        this.$auth.setUser(customer);
        this.$router.push("/")
        this.$emit("loggedIn")
      } catch (error) {}
    },
    async registerCustomer() {
      try {
        const res = await this.$axios.$post(
          "/api/store/customers",
          this.customerRegister
        );
        console.log(res);
      } catch (error) {}
    },
  },
};
</script>

<style></style>
