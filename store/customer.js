export const state = () => {
  customerCartId: "";
  customerProductsCart: {
  }
  region: {
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
  setRegion(state, payload) {
    state.region = payload;
  },
};

// Actions

export const actions = {
  async getCustomerProductCart({ commit }, payload) {
    try {
      const cartId = localStorage.getItem("cartId");
      if (!cartId) {
        const { regions } = await this.$axios.$get("/api/regions");
        if (!regions.length) return;
        let selectedRegion;
        selectedRegion = regions.find((v) => v.name == "India");
        if (!selectedRegion) selectedRegion = regions[0];
        commit("setRegion", selectedRegion);
        const { cart } = await this.$axios.$post("/api/carts", {
          region_id: selectedRegion.id,
        });
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
          const { regions } = await this.$axios.$get("/api/regions");
          if (!regions.length) return;
          let selectedRegion;
          selectedRegion = regions.find((v) => v.name == "India");
          if (!selectedRegion) selectedRegion = regions[0];
          commit("setRegion", selectedRegion);
          const { cart } = await this.$axios.$post("/api/carts",{
            region_id: selectedRegion.id,
          });
          localStorage.setItem("cartId", cart.id);
          commit("setCustomerCartId", cart.id);
          commit("setCustomerProductsCart", cart);
          return;
        });
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
