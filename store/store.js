export const state = () => {
  categories: [];
};

// Mutations

export const mutations = {
  setStoreCategories(state, payload) {
    state.categories = payload;
  },
};

// Actions

export const actions = {
  async fetchStoreCategories({ commit }, payload) {
    try {
      const { product_categories } = await this.$axios.$get(
        "/api/product-categories?parent_category_id=null&include_descendants_tree=true"
      );
      if (product_categories && product_categories.length)
        commit("setStoreCategories", product_categories);
      console.log("product_cat:",product_categories);
    } catch (error) {
      console.log("store.fetch.categories:", error);
    }
  },
};
