export const state = () => {
  customerCartId: "";
  customerProductsCart: {
  }
  customerCartItems: [];
  region: {
  }
  wishList: [];
};

// Mutations

export const mutations = {
  setCustomerProductsCart(state, payload) {
    state.customerProductsCart = payload;
  },
  setCustomerCartId(state, payload) {
    state.customerCartId = payload;
  },
  setRegion(state, payload) {
    state.region = payload;
  },
  setWishlist(state, payload) {
    state.region = payload;
  },
  setCustomerCartItems(state, payload) {
    state.customerCartItems = payload;
  },
};

// Actions

export const actions = {
  async getCustomerProductCart({ commit }, payload) {
    try {
      const { data } = await this.$api.get("/customer/cart/user-cart/");
      commit("setCustomerCartItems", data.items);
      // check cart exists
    } catch (error) {
      console.log("new ", error);
    }
  },
  async getRegions({ commit }, payload) {
    try {
      const { regions } = await this.$axios.$get("/api/regions");
      if (!regions.length) return;
      let selectedRegion;
      selectedRegion = regions.find((v) => v.name == "India");
      if (!selectedRegion) selectedRegion = regions[0];
      commit("setRegion", selectedRegion);
    } catch (error) {}
  },
};

// Getters

export const getters = {
  getCustomerCart(state) {
    return state.customerProductsCart ? state.customerProductsCart : {};
  },
};
