<template>
  <div>
    <ValidationProvider :rules="rules" :vid="vid" v-slot="{ errors }">
      <label
        :for="id"
        class="block text-xs font-medium text-appLabel"
        v-if="label"
        >{{ label }}</label
      >
      <div class="mt-1">
        <input
          @input="$emit('update', $event.target.value)"
          :id="id"
          :name="id"
          :type="type"
          :value="modelValue"
          v-on="$listeners"
          :ref="refName"
          class="block w-full text-appText appearance-none border border-footer px-3 py-2 text-clip placeholder-gray-400 shadow-sm focus:border-head focus:outline-none focus:ring-head sm:text-sm"
          :placeholder="placeholder"
          :class="inputClass"
          :disabled="disabled"
          @keyup.enter="$emit('enter')"
        />
      </div>
      <span class="text-xs pl-3 text-red-500" v-if="!hideDetails">{{
        errors[0]
      }}</span>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    rules: {
      type: String,
      default: "",
    },
    refName: {
      type: String,
      default: "",
    },
    vid: {
      // this is using for confirm password
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "modelValue",
    event: "update",
  },
};
</script>
