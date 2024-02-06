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
    <div class="xl:max-w-4xl lg:max-w-4xl mx-auto md:py-20 py-10 md:px-0 px-4">
      <div class="flex">
        <div class="w-1/2 flex flex-col gap-4">
          <h4 class="text-2xl text-head font-medium capitalize">
            Headquarters
          </h4>
          <div class="text-sm font-normal text-head">
            SignUp Casuals, Ground floor,<br />
            City centre, Thrissur<br />
            Kerala-680001<br />
            India<br />
          </div>
          <a
            href="mailto:support@signupcasuals.com"
            class="text-sm font-normal text-blue-500 underline"
          >
            support@signupcasuals.com
          </a>
          <span class="text-sm font-normal text-head">+91 9562889921</span>
          <h6 class="text-base font-medium text-head">Business Hours</h6>
          <div class="text-sm font-normal text-head">
            Monday to Friday, 9:00 AM to 6:00 PM (IST)
          </div>
        </div>
        <div class="w-1/2 hidden flex-col gap-4">
          <h4 class="text-2xl text-head font-medium capitalize">
            Store In thrissur
          </h4>
          <div></div>
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
      <div class="ap-4 pt-12">
        <h4 class="text-2xl text-head font-medium capitalize">
          Feedback and Inquiries
        </h4>
        <p class="text-sm font-normal text-head text-justify pt-4">
          We value your feedback and are eager to hear from you. If you have any
          questions, comments, or suggestions, please fill out the contact form
          on our website, and our team will get back to you as soon as possible.
        </p>
      </div>

      <div class="ap-4 pt-12">
        <h4 class="text-2xl text-head font-medium capitalize">
          Career Opportunities
        </h4>
        <p class="text-sm font-normal text-head text-justify pt-4">
          Interested in joining the SignUp Casuals team? Explore career
          opportunities and submit your resume to <a href="mailto:careers@signupcasuals.com" class="text-blue-500 underline">careers@signupcasuals.com</a>.
        </p>
      </div>
      <!-- get In Touch -->
      <div class="flex flex-col gap-4 pt-12">
        <h4 class="text-2xl text-head font-medium capitalize">Get in touch</h4>
        <FormTextField v-model="getInTouch.name" placeholder="Name" />
        <FormTextField v-model="getInTouch.email" placeholder="Email Address" />
        <textarea
          rows="5"
          class="block w-full text-appText appearance-none border border-footer px-3 py-2 text-clip placeholder-gray-400 shadow-sm focus:border-head focus:outline-none focus:ring-head sm:text-sm"
          placeholder="Your Review"
        />
        <button class="text-sm font-medium text-white bg-head px-6 py-4 w-52">
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
  data() {
    return {
      getInTouch: {},
    };
  },
};
</script>

<style></style>
