export const state = () => ({
  alert: {
    visibility: false,
    title: "",
    description: "",
    isError: false,
  },
  access: "",
  isLoggedIn: false,
  user: {},
  dynamicMenu:[]
});

export const actions = () => {};

export const mutations = {
  setAlert(state, { title, description, isError, timeout = 5000 }) {
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
  setAccess(state, payload) {
    state.access = payload;
  },
  setLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setDynamicMenu(state, payload){
    state.dynamicMenu = payload
  }
};
