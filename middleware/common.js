import axios from "~/plugins/axios";

export default async function ({ store, redirect, app }) {
    try {
        const { data } = await app.$api.get("customer/category?is_main_menu=true")
        if(Array.isArray(data?.results)){
            store.commit("setDynamicMenu", data.results)
        }
    } catch (error) {
        console.log("get-main-menu:", error)
    }
}
