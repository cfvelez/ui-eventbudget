export class AuthManager {
  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }
}
