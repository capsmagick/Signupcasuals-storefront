<template>
  <div>
    <div>
      <form action="" class="flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <div class="w-1/2">
            <FormTextField
              placeholder="Full name"
              v-model="shipping_address.full_name"
            />
          </div>
          <div class="w-1/2">
            <FormTextField
              placeholder="Contact Number"
              v-model="shipping_address.contact_number"
            />
          </div>
        </div>
        <FormTextField
          placeholder="Address 1"
          v-model="shipping_address.address_line_1"
        />
        <FormTextField
          placeholder="Address 2"
          v-model="shipping_address.address_line_2"
        />
        <FormTextField
          placeholder="Land mark"
          v-model="shipping_address.land_mark"
        />
        <FormTextField
          placeholder="district *"
          v-model="shipping_address.district"
        />
        <FormTextField placeholder="state *" v-model="shipping_address.state" />
        <FormTextField
          placeholder="country *"
          v-model="shipping_address.country"
        />
        <FormTextField
          placeholder="Pin code *"
          v-model="shipping_address.pin_code"
        />

        <ReusableSelectableMenu
          :placeholder="'Address type'"
          :items="addressTypes"
          :itemText="'name'"
          :itemValue="'value'"
          :selected="shipping_address.address_type"
          v-model="shipping_address.address_type"
          :search="false"
          class="w-full"
        />
        <!-- <FormTextField
            placeholder="Your Mail"
            v-model="shipping_address.email"
          /> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressForm",
  data() {
    return {
      shipping_address: {},
      addressTypes: [
        {
          name: "Shipping",
          value: "Shipping",
        },
        {
          name: "Billing",
          value: "Billing",
        },
      ],
    };
  },
};
</script>

<style></style>
