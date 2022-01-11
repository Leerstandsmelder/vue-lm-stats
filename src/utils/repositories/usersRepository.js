import repository from "../api.js";


export default {
  get() {
    let url = "/users/me";
    return repository.get(url);
  },
  getMovies(userId) {
    let url = "/users/me/locations";
    return repository.get(`${url}/?${userId}`);
  },
  registerUser(payload) {
    let url = "/users";
    return repository.post(`${url}`, payload);
  },
  getAll(filter) {
    let filter_query = "";
    if (filter) {
      filter_query = "?filter=" + filter;
    }
    
    console.log("in get all users", filter);
    let url = "/users" + filter_query;
    return repository.get(url);
  },
  removeUser(userId) {
    console.log("removeUser", userId);
    let url = "/users/" + userId;
    console.log("removeUserUrl", url);
    return repository.delete(`${url}`);
  },
  updateUser(payload) {
    console.log("updateUser", payload);
    if (payload.uuid) {
      let url = "/users/" + payload.uuid;
      console.log("updateUser", url);

      return repository.put(`${url}`, payload);
    }
  }
};
