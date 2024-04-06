<template>
    <ReusableDropdown
      :id="id"
      :width="width"
      :menuClass="classes"
      :bottom="bottom"
      :right="right"
      :dropWidth="dropWidth"
    >
      <template #menu-activator="{ toggleMenu }">
        <slot name="custom-activator" :toggleMenu="toggleMenu" />
        <div v-if="!hideDefaultActivator">
          <div class="text-xs text-gray-600 pb-1" v-if="label">{{ label }}</div>
          <button
            type="button"
            class="relative w-full cursor-pointer bg-white pl-3 pr-10 focus:outline-none"
            :class="{
              'border  focus:border-head  focus:ring-2 focus:ring-border-head shadow-sm outline-none':
                outline,
              'bg-gray-100 border-gray-100 text-gray-400': disabled,
              'py-1.5 text-xs': small,
              'py-2 text-sm': !small,
              'border-gray-300': !disabled,
              'text-left': left,
              'text-right': !left,
            }"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            :disabled="disabled"
            @click.stop="toggleMenu"
            :id="`dropdown-activator:${id}`"
          >
            <span class="block truncate" :class="activatorClasses">{{
              displaySelected
            }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <!-- Heroicon name: mini/chevron-up-down -->
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </template>
  
      <template #menu-content="{ toggleMenu }">
        <ul
          class="w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto max-h-60"
          :class="contentClasses"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <li class="p-2" v-if="search">
            <div class="flex items-center">
              <Magnify class="-mr-6 relative z-10" />
              <input
                id="search-field"
                class="h-full w-full border-b border-gray-300 py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
                v-model="searchText"
              />
            </div>
          </li>
          <li
            v-if="parsedItems.length == 0"
            class="text-gray-400 text-xs relativeselect-none py-2 pl-3"
          >
            No options found.
          </li>
          <li
            class="text-gray-900 relative cursor-pointer select-none py-2 pl-3 hover:bg-gray-200"
            :id="`listbox-option-${idx}`"
            role="option"
            v-for="(item, idx) in parsedItems"
            :key="idx"
            @click="
              () => {
                onSelectItem(item);
                if (!multiple) toggleMenu();
              }
            "
          >
            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
            <div class="flex items-center">
              <div
                class="font-normal block truncate text-appText flex-1"
                :class="{ 'font-semibold': item.selected }"
              >
                {{ item[itemText] }}
              </div>
              <div
                class="text-indigo-600 flex items-center pr-4"
                v-if="item.selected"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </li>
  
          <slot name="sub-content" :toggleMenu="toggleMenu" />
        </ul>
      </template>
    </ReusableDropdown>
  </template>
  <script>
  import Magnify from "vue-material-design-icons/Magnify.vue";
  export default {
    data() {
      return {
        searchText: "",
      };
    },
    props: {
      id: {
        type: String | Number,
        default: new Date().valueOf(),
      },
      label: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      items: {
        type: Array,
        default: [],
      },
      itemText: {
        type: String,
      },
      itemValue: {
        type: String,
      },
      modelValue: {
        type: [String, Number, Array],
        default: "",
      },
      selected: {
        type: [String, Number, Array],
        default: "",
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
      },
      classes: {
        type: String,
      },
      search: {
        type: Boolean,
        default: true,
      },
      outline: {
        type: Boolean,
        default: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      small: {
        type: Boolean,
        default: false,
      },
      left: {
        type: Boolean,
        default: true,
      },
      right: {
        type: Boolean,
        default: true,
      },
      bottom: {
        type: Boolean,
        default: false,
      },
      activatorClasses: {
        type: String,
        default: "",
      },
      contentClasses: {
        type: String,
        default: "",
      },
      hideDefaultActivator: {
        type: Boolean,
        default: false,
      },
      dropWidth: {
        type: String,
        default: "w-full",
      },
    },
    components: {
      Magnify,
    },
    model: {
      prop: "modelValue",
      event: "update",
    },
    computed: {
      parsedItems() {
        const items = this.items.map((el) => {
          if (
            !this.multiple &&
            this.selected &&
            el[this.itemValue] === this.selected
          )
            el.selected = true;
          else if (this.multiple && Array.isArray(this.selected)) {
            el.selected = this.selected.includes(el[this.itemValue]);
          } else el.selected = false;
  
          return el;
        });
  
        const values = [
          ...new Map(items.map((item) => [item[this.itemValue], item])).values(),
        ];
  
        return values.filter((v) => {
          return (
            v[this.itemText]
              .substring(0, this.searchText.length)
              .toLowerCase() === this.searchText.toLowerCase()
          );
        });
      },
      displaySelected() {
        if (!this.multiple && this.selected) {
          const item = this.items.find(
            (el) => el[this.itemValue] === this.selected
          );
          if (item) return item[this.itemText];
        } else if (this.multiple && Array.isArray(this.selected)) {
          const items = this.items
            .filter((el) => this.selected.includes(el[this.itemValue]))
            .map((el) => el[this.itemText])
            .join(", ");
          if (items) return items;
          return `Select ${this.label || this.placeholder}`;
          // return items ?? `Select ${this.label || this.placeholder}`
        }
  
        return `Select ${this.label || this.placeholder}`;
      },
    },
    methods: {
      onSelectItem(item) {
        let selected = this.multiple ? this.selected ?? [] : null;
        const value = item[this.itemValue];
  
        if (this.multiple) {
          if (selected.includes(value))
            selected = selected.filter((el) => el !== value);
          else selected.push(value);
        } else selected = value;
  
        this.$emit("update", selected);
        this.$emit("onChangeItem", selected);
      },
    },
  };
  </script>
  