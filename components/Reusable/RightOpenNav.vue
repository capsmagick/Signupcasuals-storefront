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
          <div class="relative ml-auto h-screen w-[400px]">
            <!--content-->
            <div
              class="border-0 relative flex flex-col w-full h-full outline-none focus:outline-none"
              :class="isBgTransparent ? '' : 'bg-white shadow-lg'"
            >
              <!--header-->
              <div
                v-if="!hideHeader"
                class="flex bg-primary items-center justify-between px-10 py-5 rounded-t"
              >
                <h3 class="text-base text-head font-medium uppercase">{{ title }}</h3>
                <button
                  v-if="close"
                  class="p-1 ml-auto border-0 text-appText float-right leading-none font-semibold outline-none focus:outline-none"
                  v-on:click="toggleModal()"
                >
                  <Close />
                </button>
              </div>
              <!--body-->
              <div
                class="relative flex-auto w-full"
                :class="[
                  `${noPaddingInBody ? '' : 'px-10 py-4'}`,
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
    name: "open-side-nav",
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
    components:{
        Close: () => import("vue-material-design-icons/Close.vue")
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
  