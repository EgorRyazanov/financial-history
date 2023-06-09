import $api from "../http";

export class AuthService {
  static async login(email, password) {
    return await $api.post("/Authorize/signin", {
      email: email,
      password: password,
      rememberMe: false,
    });
  }

  static async register(email, password, name) {
    return await $api.post("/Authorize/register", {
      name: name,
      email: email,
      password: password,
    });
  }

  static async update(form) {
    return await $api.put("/Authorize/updateUser", form);
  }

  static async tokenLogin() {
    return await $api.post("/Authorize/signinWithAccess", null, { withCredentials: true });
  }

  static async logout() {
    return await $api.post("/Authorize/signout"), null, { withCredentials: true };
  }
}
