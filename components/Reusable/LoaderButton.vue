<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="text-sm font-medium text-white bg-head px-6 py-4 flex items-center justify-center gap-2"
    :class="{width}"
    @click="onClick"
  >
    <span>{{ label }}</span>
    <svg v-if="loading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9 3.51221C5.50442 4.74772 3 8.08143 3 12.0001C3 16.9707 7.02944 21.0001 12 21.0001C16.9706 21.0001 21 16.9707 21 12.0001C21 8.08143 18.4956 4.74772 15 3.51221"
          stroke="currentcolor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: "LoaderButton",
  props: {
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    width:{
      type: String, 
      default:"w-52"
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style></style>
