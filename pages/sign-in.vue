<template>
  <div class="max-w-sm min-h-[400px] mx-auto py-20">
    <div class="flex flex-col items-center justify-center w-full">
        <h4 class="mb-6">LOGIN</h4>

        <div class="w-full">
            <form action="" @submit.prevent>
              <div class="mb-2">
                <FormTextField
                  v-model="login.username"
                  placeholder="Username or email address *"
                />
              </div>
              <div class="mb-2">
                <FormTextField
                  v-model="login.password"
                  placeholder="Password"
                  :type="'password'"
                />
              </div>
              <div class="flex items-center justify-end mb-6">
                <div class="hidden text-second text-sm">
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
                  @click="signUp"
                  >Create Account</span
                >
              </p>
            </form>
          </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
name:"sign in",
layout:"main",
data(){
    return{
        login: {
        username: "pachalam",
        password: "1234567",
      },
    }
},
methods:{
    ...mapMutations(["setLoggedIn","setAccess","setUser"]),
    async customerLogin() {
      try {
        const { data } = await this.$api.post("/account/session/user/login/", {
          ...this.login,
        });

        // const tokensString = data.tokens;
        // const validJsonString = tokensString.replace(/'/g, '"');
        // const tokenObj = JSON.parse(validJsonString);
        // const { refresh, access } = tokenObj;

        // localStorage.setItem("refresh", refresh);
        // this.setAccess(access);
        this.setLoggedIn(true);
        this.$alert.show({
          title: "Logged in Successfully",
          description: "You have successfully logged in!",
        });
        // this.$router.push("/");
        this.$emit("loggedIn");

        this.$router.push("/")
      } catch (error) {
        console.log("er", error);
        this.$alert.show({
          isError: true,
          title: "Invalid Login",
          description: "Please enter valid credentials",
        });
      }
    },
    signUp(){
        this.$router.push('/sign-up')
    }
}
}
</script>

<style>

</style>