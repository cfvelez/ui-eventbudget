export class AuthManager {
  login(token: string) {
    localStorage.setItem("token", token);
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    console.log("Borrar");
    if (localStorage.getItem("token") !== null) {
      localStorage.removeItem("token");
    }
  }
}
