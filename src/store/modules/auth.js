import api from "../../utils/api";

const baseDomain = process.env.VUE_APP_API_URL;

export const auth = {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || "",
    scope: localStorage.getItem("scope") || ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_register(state, userId) {
      state.status = "registering";
      state.userId = userId;
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
      //console.log("mutation", state);
    },
    auth_error(state) {
      state.status = "error";
    },
    credentials_request(state) {
      state.status = "credentials_loading";
    },
    credentials_success(state, userId, scope) {
      state.status = "credentials_success";
      state.userId = userId;
      state.scope = scope;

    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.userId = "";
      state.scope = "";
    }
  },
  actions: {
    login({ dispatch, commit }, data) {
      console.log("login action", data);
      let user = {
        email: data.email,
        password: data.password
      };
      let url = `${baseDomain}/users/me/access_tokens`;
      return new Promise((resolve, reject) => {
        commit("auth_request");
        api({
          url: url,
          data: user,
          method: "POST"
        })
          .then(resp => {
            console.log("login", resp);
            const token = resp.token;
            this.state.token = token;
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = 'bearer ' + token;
            dispatch('getCredentials').then(response => {
              commit("auth_success", token);
              resolve(resp);
            });
          })
          .catch(err => {
            //console.log("login catch", err.response);
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    getCredentials({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: `${baseDomain}/users/me/api_keys`,
          method: "GET"
        })
          .then(resp => {
            var api_keys = resp.results || resp;
            console.log('resp_keys',resp);
            if (
              api_keys
            ) {
              let scope = api_keys;
              this.state.scope = scope;
              // DONT SET IT STATIC
              //localStorage.setItem("scope", scope);

                          //TODO: setup userId obj
        // const userId = resp.userId;
        // let role = "";
        // this.state.userId = userId;
        // this.state.token = token;
        // localStorage.setItem("token", token);
        // localStorage.setItem("userId", userId);
              resolve(resp);
            } else {
              reject('NO KEYS');
            }
          })
          .catch(err => {
            //console.log("login catch", err.response);
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            reject(err);
          });

      });
    },
    init({dispatch, commit}) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token");
          dispatch('getCredentials').then(response => {
            commit("auth_success", this.state.token);
            resolve('TOKEN SET');
          });
        } else {
          reject('NO TOKEN');
        }
      })
    },
    callback({ commit }, data) {
      return new Promise((resolve, reject) => {
        //console.log("auth store callback", data);
        if (!data.accessToken || !data.userId) {
          commit("auth_error");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          reject("no login data set");
        }
        const token = data.accessToken;
        //TODO: setup userId obj
        const userId = data.userId;
        this.state.userId = userId;
        this.state.token = token;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        // Add the following line:
        api.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, userId);
        resolve(data);
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        api({
          url: `${baseDomain}/api/Clients`,
          data: user,
          method: "POST"
        })
          .then(resp => {
            const userId = resp.id;
            commit("auth_register", userId);
            resolve(resp);
          })
          .catch(err => {
            console.log("register catch", err);
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        api({
          url: `${baseDomain}/api/Clients/logout`,
          method: "POST"
        })
          .then(resp => {
            commit("logout");
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
            resolve(resp);
          })
          .catch(err => {
            console.log("logout catch", err);
            commit("auth_error", err);
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
            reject(err);
          });
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.userId,
    getRole: state => state.role
  }
};
