export class AuthManager {
  login(token: string) {
    localStorage.setItem("token", token);
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
      return true;
    }
    return false;
  }
}
