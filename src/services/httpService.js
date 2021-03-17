import axios from "axios";
// import { access_token_key } from "../authConfig.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error");
    toast.error("An Unexpected error occured.");
  }
  return Promise.reject(error);
});

// axios.interceptors.request.use(() => {
//   const token = localStorage.getItem(access_token_key);
//   console.log(token);
//   if (token !== undefined && token !== "undefined" && token !== null) {
//     axios.defaults.headers.common["Authorization"] = token;
//   }
// }, null);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios,
};
