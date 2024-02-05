<template>
  <div>
    <div
      class="xl:max-w-4xl lg:max-w-4xl mx-auto md:pt-20 pt-10 pb-6 md:px-0 px-4"
    >
      <h1 class="md:block hidden text-head text-3xl font-bold mb-4">
        CONTACT US
      </h1>
    </div>
    <div class="hidden bg-gray-400">aa</div>
    <div
      class="xl:max-w-4xl lg:max-w-4xl mx-auto md:py-20 py-10 md:px-0 px-4"
    >
      <div class="flex">
        <div class="w-1/2 flex flex-col gap-4">
          <h4 class="text-2xl text-head font-medium capitalize">
            Store In thrissur
          </h4>
          <div class="text-sm font-normal text-head">
            1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
            United States
          </div>
          <div class="text-sm font-normal text-head">
            sale@uomo.com<br />
            +1 246-345-0695
          </div>
        </div>
        <div class="w-1/2 flex flex-col gap-4">
          <h4 class="text-2xl text-head font-medium capitalize">
            Store In thrissur
          </h4>
          <div class="text-sm font-normal text-head">
            1418 River Drive, Suite 35 Cottonhall, CA 9622 <br />
            United States
          </div>
          <div class="text-sm font-normal text-head">
            sale@uomo.com<br />
            +1 246-345-0695
          </div>
        </div>
      </div>
      <!-- get In Touch -->
      <div class="flex flex-col gap-4 pt-12">
        <h4 class="text-2xl text-head font-medium capitalize">Get in touch</h4>
        <FormTextField
          v-model="getInTouch.name"
          placeholder="Name"
        />
        <FormTextField
            v-model="getInTouch.email"
            placeholder="Email Address"
          />
          <textarea rows="5" class="block w-full text-appText appearance-none border border-footer px-3 py-2 text-clip placeholder-gray-400 shadow-sm focus:border-head focus:outline-none focus:ring-head sm:text-sm" placeholder="Your Review"/>
          <button
          class="text-sm font-medium text-white bg-head px-6 py-4 w-52"
        >
          SUBMIT
        </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  layout: "main",
  data(){
    return{
        getInTouch:{}
    }
  }
};
</script>

<style></style>
