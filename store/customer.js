export const state = () => {
  customerCartId: "";
  customerProductsCart: {
  }
};

// Mutations

export const mutations = {
  setCustomerProductsCart(state, payload) {
    state.customerProductsCart = payload;
  },
  setCustomerCartId(state, payload) {
    state.customerCartId = payload;
  },
};

// Actions

export const actions = {
  async getCustomerProductCart({ commit }, payload) {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        const { cart } = await this.$axios.$post("/api/carts");
        localStorage.setItem("cartId", cart.id);
        commit("setCustomerProductsCart", cart);
        return;
      }
      // check cart exists
      this.$axios
        .$get(`/api/carts/${cartId}`)
        .then((res) => {
          const { cart } = res;
          localStorage.setItem("cartId", cart.id);
          commit("setCustomerCartId", cart.id);
          commit("setCustomerProductsCart", cart);
          return;
        })
        .catch(async (e) => {
          const { cart } = await this.$axios.$post("/api/carts");
          localStorage.setItem("cartId", cart.id);
          commit("setCustomerCartId", cart.id);
          commit("setCustomerProductsCart", cart);
          return;
        });
    } catch (error) {
      console.log("new ", error);
    }
  },
};
