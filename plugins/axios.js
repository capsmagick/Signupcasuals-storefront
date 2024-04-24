// Api.js
import axios from "axios";
import Cookies from "js-cookie";

let csrfToken;

const setTokenToHeaders = function (request) {
    console.log('SET csrfToken : ', csrfToken)
    if (csrfToken) {
        request.headers["X-CSRFToken"] = csrfToken;
    }
};

const getTokenFromResponse = function () {
    csrfToken = Cookies.get("csrftoken");
    console.log('GET csrfToken : ', csrfToken)
};

export default function ({store}, inject) {
    const axiosAPI = axios.create({
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        withCredentials: true,
        baseURL: "/api",
        // baseURL: "http://localhost:8000/api",
        headers: {
            Accept: "application/json"
        }
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
            setTokenToHeaders(config);

            // if (store.state.access) {
            //   config.headers["Authorization"] = `Bearer ${store.state.access}`;
            // }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosAPI.interceptors.response.use(
        function (response) {
            getTokenFromResponse();
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    inject("api", axiosAPI);
}

// export default axiosAPI;
