<template>
  <div>
    <form action="" class="flex flex-col gap-6">
      <div class="flex gap-6">
        <span class="w-1/2">
          <FormTextField placeholder="First Name" v-model="user.first_name" />
        </span>
        <span class="w-1/2">
          <FormTextField placeholder="Last Name" v-model="user.last_name"/>
        </span>
      </div>
      <div>
        <FormTextField placeholder="Display Name" />
      </div>
      <div>
        <FormTextField placeholder="Email address" v-model="user.email"/>
      </div>
      <h5 class="text-sm font-medium">PASSWORD CHANGE</h5>
      <div>
        <FormTextField
          placeholder="Current password (leave blank to leave unchanged) "
        />
      </div>
      <div>
        <FormTextField
          placeholder="New password (leave blank to leave unchanged) "
        />
      </div>
      <div>
        <FormTextField placeholder="Confirm new password  " />
      </div>
      <div>
        <button @click="updateUserDetails" class="px-8 py-4 bg-head text-white text-sm">
          SAVE CHANGES
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods:{
    async updateUserDetails(){
        try {
            await this.$axios.$post("/api/customers/me",{
                ...this.user
            })
        } catch (error) {
            
        }
    }
  },
  mounted(){
    this.user = JSON.parse(JSON.stringify(this.$auth.user))
  }
};
</script>

<style></style>
