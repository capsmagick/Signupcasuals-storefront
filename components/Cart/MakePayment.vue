<template>
  <form :action="paymentPayload.action" method="post" ref="form" enctype="multipart/form-data">
    <input
      type="hidden"
      :value="paymentPayload.post_data.request"
      name="request"
      id="request"
    />
    <input
      type="hidden"
      id="Content-Type"
      name="Content-Type"
      value="application/json"
    />
    <input
      type="hidden"
      id="X-VERIFY"
      name="X-VERIFY"
      :value="paymentPayload.headers['X-VERIFY']"
    />
    <input
      type="hidden"
      id="accept"
      name="accept"
      :value="paymentPayload.headers.accept"
    />
    <button type="submit" hidden id="payment-button"></button>
  </form>
</template>

<script>
export default {
  name: "MakePayment",
  props: {
    paymentPayload: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    async makePayment() {
      const form = this.$refs.form.submit();
      // const formData = new FormData(form);

      // formData.set("Content-Type", "application/json");
      console.log(this.paymentPayload)
      try {
        await fetch(this.paymentPayload.action, {
          method: "POST",
          body: {request: this.paymentPayload.post_data.request}, // Serialize the form data to JSON
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you need here
            "X-VERIFY": this.paymentPayload.headers["X-VERIFY"],
            accept: this.paymentPayload.headers.accept,
          },
        });
      } catch (error) {
        console.log(error);
      }

      // const formData = new FormData();
      // formData.append("request", this.paymentPayload.post_data.request);
      // const headers = {
      //   ...this.paymentPayload.headers,
      // };
      // try {
      //   await this.$axios.post("/api/", formData, { headers });
      // } catch (error) {
      //   console.log("make-payment:", error);
      // }
    },
  },
  mounted() {
    this.$refs.form.submit();
    // const formButton = document.getElementById("payment-button");
    // formButton.click();
  },
};
</script>

<style></style>
