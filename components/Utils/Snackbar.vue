<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          v-show="alert.visibility"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckDecagramOutline v-if="!alert.isError" :size="24" class="text-green-400"/>
                <AlertDecagramOutline v-else :size="24" class="text-red-500"/>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ alert.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ alert.description }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AlertDecagramOutline from "vue-material-design-icons/AlertDecagramOutline.vue";
import CheckDecagramOutline from "vue-material-design-icons/CheckDecagramOutline.vue";
export default {
  components: {
    AlertDecagramOutline,
    CheckDecagramOutline,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState(["alert"]),
  },
  watch: {
    alert(v) {
      console.log("alert", v);
    },
  },
  methods: {
    ...mapMutations(["setAlert", "closeAlert"]),
  },
};
</script>

<style></style>
