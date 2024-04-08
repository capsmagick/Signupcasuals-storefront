import axios from "~/plugins/axios";

export default async function ({ store, redirect, app }) {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    try {
      const { data } = await app.$api.post(
        "/account/token/user/token/refresh/",
        {
          refresh: refresh,
        }
      );
      store.commit("setAccess", data.access);
      store.commit("setLoggedIn", true);
      const { data: userData } = await app.$api.get("/account/user/me/");
      store.commit("setUser", userData.user);
    } catch (error) {
      console.log("Middleware error>>", error);
      console.log("Refresh token expired");
      localStorage.removeItem("refresh");
      store.commit("setAccess", "");
      store.commit("setLoggedIn", false);
    }
  }
}
