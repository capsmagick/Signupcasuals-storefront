<template>
  <div class="max-w-md min-h-[400px] mx-auto py-20">
    <div class="flex flex-col items-center justify-center w-full">
      <h4 class="mb-6">REGISTER</h4>

      <div class="w-full">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent>
            <div class="flex gap-4">
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="customerRegister.username"
                  placeholder="Username"
                  rules="required|string"
                />
              </div>
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="customerRegister.password"
                  placeholder="Password"
                  :type="'password'"
                  rules="required|min:4"
                  vid="password"
                />
              </div>
            </div>
            <div class="flex gap-4">
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  :type="'password'"
                  rules="required|confirmed:password"
                />
              </div>
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="customerRegister.first_name"
                  placeholder="First Name"
                  rules="required|string"
                />
              </div>
            </div>
            <div class="flex gap-4">
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="customerRegister.last_name"
                  placeholder="Last Name"
                  rules="required|string"
                />
              </div>
              <div class="mb-6 w-1/2">
                <FormTextField
                  v-model="customerRegister.email"
                  placeholder="Email address *"
                  type="email"
                  required
                  rules="required|email"
                />
              </div>
            </div>

            <p class="text-second text-sm text-justify mb-6">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
            <div class="flex">
              <ReusableLoaderButton
                label="REGISTER"
                @click="registerCustomer"
                width="w-full"
                :disabled="invalid"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign up",
  layout: "main",
  data() {
    return {
      customerRegister: {},
    };
  },
  methods: {
    async registerCustomer() {
      try {
        this.loading = true;

        const res = this.$api.post(
          "/account/user/sign-up/",
          this.customerRegister
        );

        // const res = await this.$axios.$post(
        //   "/api/customers",
        //   this.customerRegister
        // );

        this.$alert.show({
          title: "Yasss, account created.",
          description:
            "Your account have been created successfully. Please login with your email and password!",
        });

        this.$router.push("/sign-in");
      } catch (error) {
      } finally {
        this.loading = false;
        this.isShowLogin = true;
      }
    },
  },
};
</script>

<style></style>
