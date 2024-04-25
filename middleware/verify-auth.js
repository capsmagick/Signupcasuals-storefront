import axios from "~/plugins/axios";

export default async function ({ store, redirect, app }) {
    try {
      const { data } = await app.$api.get(
        "/account/user/me"
      );
      if (data.loggedIn) {
          store.commit("setLoggedIn", true);
          store.commit("setUser", data.user);
      }
      // store.commit("setAccess", data.access);
      // store.commit("setLoggedIn", true);
      // const { data: userData } = await app.$api.get("/account/token/user/status/");
      // store.commit("setUser", userData.user);
    } catch (error) {
      console.log("Middleware error>>", error);
      console.log("Refresh token expired");
      localStorage.removeItem("refresh");
      store.commit("setAccess", "");
      store.commit("setLoggedIn", false);
    }
}
