import axios from "axios";
//import store from "../store/index";

const baseDomain = process.env.VUE_APP_API_URL;
const baseURL = `${baseDomain}`;
//console.log("api", baseURL);
//console.log("token", store.state.auth.token);
let api = axios.create({
  baseURL
  //,
  //headers: { Authorization: store.state.auth.token }
});

export default api;
