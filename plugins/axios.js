// Api.js
import axios from "axios";
// console.log("context", context)

export default function ({ store }, inject) {
  const axiosAPI = axios.create({
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withCredentials: true,
    baseURL: "http://localhost:8000",
  });

  // Adding request interceptor to attach CSRF token to outgoing requests
  axiosAPI.interceptors.request.use(
    (config) => {
      const method = config.method;
      if (method !== "get" || method !== "delete") {
        if (
          typeof FormData !== "undefined" &&
          config.data instanceof FormData
        ) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
      }
      const csrftoken = getCookie("csrftoken");
      if (csrftoken) {
        config.headers["X-CSRFToken"] = csrftoken;
      }
      
      if(store.state.access){
        config.headers['Authorization'] = `Bearer ${store.state.access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosAPI.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  function getCookie(name) {
    if (typeof window === "undefined") {
      return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const possibleValue = parts.pop();
      if (possibleValue) {
        return possibleValue.split(";").shift() || null; // Fix applied here
      }
    }
    return null;
  }

  inject("api", axiosAPI);
}

// export default axiosAPI;
