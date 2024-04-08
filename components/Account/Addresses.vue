<template>
  <div>
    <div class="flex items-center justify-between">
      <p class="text-sm text-head">
        The following addresses will be used on the checkout page by default.
      </p>
      <button class="text-sm">+ Add address</button>
    </div>
    <div class="flex gap-8 pt-10 pr-32">
      <div class="w-1/2">
        <div class="flex items-center">
          <h5 class="text-lg font-medium flex-1 text-head">BILLING ADDRESS</h5>
          <p class="text-xs font-medium border-b border-head">EDIT</p>
        </div>
        <div class="text-xs">
          Daniel Robinson <br />
          1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
          United States<br />
          <br /><br />
          sale@uomo.com<br />
          +1 246-345-0695
        </div>
      </div>

      <div class="w-1/2">
        <div class="flex items-center">
          <h5 class="text-lg font-medium flex-1 text-head">SHIPPING ADDRESS</h5>
          <p class="text-xs font-medium border-b border-head">EDIT</p>
        </div>
        <div class="text-xs">
          Daniel Robinson <br />
          1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
          United States<br />
          <br /><br />
          sale@uomo.com<br />
          +1 246-345-0695
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountAddress",
  data(){
    return{
      addresses:[]
    }
  },
  methods:{
    async getCustomerAddresses(){
      try {
        const { data } = await this.$api.get("/account/user-address/");
        console.log("address",)
      } catch (error) {
        
      }
    }
  }
};
</script>

<style></style>
