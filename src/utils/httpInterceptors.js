import httpClient from "./api";
import store from "../store/index";
const actionScope = `loader`;

export function setupInterceptors({ dispatch }) {
  let requestsPending = 0;

  const req = {
    pending: () => {
      requestsPending++;
      dispatch(`${actionScope}/show`);
    },
    done: () => {
      requestsPending--;

      if (requestsPending <= 0) {
        dispatch(`${actionScope}/hide`);
      }
    }
  };

  httpClient.interceptors.request.use(
    config => {
      req.pending();

      const token = store.state.auth.token;
      // console.log('INTERCEPTOR request', token);
      if (token) {
        config.headers["Authorization"] = 'bearer ' + token;  // for Spring Boot back-end
        //config.headers["x-access-token"] = token; // for Node.js Express back-end
      }

      return config;
    },
    error => {
      requestsPending--;

      req.done();

      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    ({ data }) => {
      req.done();

      return Promise.resolve(data);
    },
    error => {
      req.done();

      return Promise.reject(error);
    }
  );
}
