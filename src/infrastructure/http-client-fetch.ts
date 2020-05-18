import { AuthManager } from "../features/app/domain/authManager";
import { serverResponse } from "../features/app/domain/serverResponse";
const AuthMng = new AuthManager();
console.log("5.0", AuthMng.isAuthenticated());
const tokenHeader = AuthMng.isAuthenticated() ? AuthMng.getToken() : "";
console.log("token 5:", tokenHeader);

export class httpClientFetch {
  method: string = "";
  baseUri: string = "http://localhost:5000";
  url: string = "";

  constructor(_method: string, _url: string) {
    this.method = _method;
    this.url = _url;
  }

  async request() {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + AuthMng.getToken());
    let response: serverResponse = {
      data: {
        status: "error",
        message: "Invalid Token!",
        data: null,
      },
    };

    const info = await fetch(this.baseUri + this.url, {
      method: this.method,
      headers: myHeaders,
    });

    response = Object.assign({}, await info.json());
    return response;
  }
}

/*
const httpClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Control-Allow-Origin": "*",
    "Access-Control-Allow-Header": "*",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${tokenHeader}`,
  },
});

function httpClient(method, URL){

const myHeaders = new Headers();
  const AuthMgr = new AuthManager();

  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + AuthMgr.getToken());

  const info = await fetch("http://localhost:5000" + URL, {
    method: "POST",
    headers: myHeaders,
  });
}


export { httpClient };
*/
