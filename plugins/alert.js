export default ({ store }, inject) => {
  inject("alert", {
    show({ title = "", description = "", isError = false }) {
    console.log("herer in ")
      store.commit("setAlert", { title, description, isError });
    },
  });
};
