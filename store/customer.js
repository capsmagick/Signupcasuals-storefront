export const state = () => {
  customerProductsCart: {
  }
};

// Mutations

export const mutations = {
  setCustomerProductsCart(state, payload) {
    state.customerProductsCart = payload;
  },
};

// Actions

export const actions = {
  async getCustomerProductCart({ commit }, payload) {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      const { cart } = await this.$axios.$post("/api/store/carts");
      localStorage.setItem("cartId", cart.id);
      commit("setCustomerProductsCart", cart);
      return
    }
    const { cart } = await this.$axios.$get(`/api/store/carts/${cartId}`);
    commit("setCustomerProductsCart", cart);
  },
};
