<template>
    <div
      class="relative inline-block text-left text-gray-800"
      :class="[widthFull ? 'w-full' : 'w-auto']"
    >
      <slot
        name="menu-activator"
        :toggleMenu="toggleMenu"
        :isMenuOpen="isMenuOpen"
        :setStatus="setStatus"
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
          class="origin-top-center absolute mt-2 rounded-md shadow-lg text-sm border z-50"
          :class="[
            bottom ? 'bottom-10' : '',
            menuClass,
            overflow,
            right ? 'right-0' : 'left-0',
            setToBottom ? 'bottom-10' : '',
            dropWidth ? dropWidth : 'w-full',
          ]"
          :style="{ width: `${width}px` }"
          :id="`dropdown-content:${id}`"
          v-if="isMenuOpen"
        >
          <div
            class="rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <slot name="menu-content" :toggleMenu="toggleMenu" />
          </div>
        </div>
      </transition>
    </div>
  </template>
  <script>
//   import { mixin as clickaway } from "vue-clickaway";
  export default {
    // mixins: [clickaway],
    props: {
      id: {
        type: String | Number,
      },
      width: {
        type: String,
        default: "auto",
      },
      menuClass: {
        type: String,
        default: "w-full",
      },
      overflow: {
        type: String,
        default: "overflow-visible",
      },
      right: {
        type: Boolean,
        default: true,
      },
      bottom: {
        type: Boolean,
        default: false,
      },
      widthFull: {
        type: Boolean,
        default: true,
      },
      dropWidth: {
        type: String,
        default: "w-full",
      },
    },
    data() {
      return {
        isMenuOpen: false,
        setToBottom: false,
      };
    },
    methods: {
      toggleMenu(e) {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen) {
          this.$emit("opened");
          this.setView();
        } else this.$emit("closed");
      },
      closeMenu() {
        this.isMenuOpen = false;
        this.$emit("closed");
      },
      setStatus(status) {
        this.isMenuOpen = status;
      },
      setView() {
        const el = document.getElementById("dropdown-activator:" + this.id);
        const card = document.getElementById("dropdown-content:" + this.id);
  
        if (!el || !card) return;
  
        var cardHeight = card.getBoundingClientRect().height;
  
        var spaceBelow = window.innerHeight - el.getBoundingClientRect().bottom;
  
        spaceBelow = spaceBelow - 16; // 16 is padding surrounded
  
        if (spaceBelow < cardHeight) this.setToBottom = true;
        else this.setToBottom = false;
      },
    },
  };
  </script>
  