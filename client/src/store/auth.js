import HTTP from "../http";
import router from "../router";

export default {
  namespaced: true,
  state: {
    registerEmail: null,
    registerPassword: null,
    registerError: null,
    token: null
  },
  actions: {
    register({ commit, state }) {
      commit("setRegisterError", null);
      return HTTP()
        .post("/auth/register", {
          email: state.registerEmail,
          password: state.registerPassword
        })
        .then(({ data }) => {
          commit("setToken", data.token);
          router.push("/");
        })
        .catch(() => {
          commit("setRegisterError", "Invalid Registration Information");
        });
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    }
  }
};
