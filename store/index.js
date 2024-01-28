export const state = () => ({
  alert: {
    visibility: false,
    title: "",
    description: "",
    isError: false,
  },
});

export const actions = () => {};

export const mutations = {
  setAlert(state, { title, description, isError, timeout = 5000 }) {
    console.log("set alert")
    state.alert = {
      visibility: true,
      title,
      description,
      isError,
    };

    setTimeout(() => {
      this.commit("closeAlert");
    }, timeout);
  },
  closeAlert(state) {
    state.alert = { visibility: false };
  },
};
