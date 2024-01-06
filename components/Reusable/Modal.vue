<template>
    <div>
      <slot
        name="modal-activator"
        :toggleModal="toggleModal"
        :showModal="showModal"
      />
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="showModal"
          class="overflow-x-hidden overflow-y-auto fixed inset-0 z-[38] outline-none focus:outline-none justify-center items-center flex"
          style="z-index: 38"
        >
          <div class="relative my-6 mx-auto" :style="{ width: `${width}` }">
            <!--content-->
            <div
              class="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none"
              :class="isBgTransparent ? '' : 'bg-white shadow-lg'"
            >
              <!--header-->
              <div
                v-if="!hideHeader"
                class="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t"
              >
                <h3 class="text-lg text-appText font-medium">{{ title }}</h3>
                <button
                  v-if="close"
                  class="p-1 ml-auto border-0 text-appText float-right leading-none font-semibold outline-none focus:outline-none"
                  v-on:click="toggleModal()"
                >
                  <mdi-close-circle-outline />
                </button>
              </div>
              <!--body-->
              <div
                class="relative flex-auto w-full"
                :class="[
                  `${noPaddingInBody ? '' : 'p-4'}`,
                  overflowXHidden ? 'overflow-x-hidden' : '',
                ]"
              >
                <slot
                  name="modal-content"
                  :toggleModal="toggleModal"
                  :showModal="showModal"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div
        v-if="showModal"
        class="opacity-25 fixed inset-0 z-[36] bg-black"
        style="z-index: 36"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    name: "regular-modal",
    props: {
      title: String,
      visibility: Boolean,
      width: {
        type: String,
        default: "300px",
      },
      hideHeader: {
        type: Boolean,
        default: false,
      },
      isBgTransparent: {
        type: Boolean,
        default: false,
      },
      modelValue: {
        type: Boolean,
        default: false,
      },
      close: {
        type: Boolean,
        default: true,
      },
      noPaddingInBody: {
        type: Boolean,
        default: false,
      },
      overflowXHidden: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: "modelValue",
      event: "update",
    },
    data() {
      return {
        showModal: false,
      };
    },
    watch: {
      visibility(v) {
        this.toggleModal();
      },
      modelValue(v) {
        this.showModal = v;
      },
    },
    methods: {
      toggleModal: function () {
        this.showModal = !this.showModal;
        this.$emit("update", this.showModal);
      },
    },
  };
  </script>
  