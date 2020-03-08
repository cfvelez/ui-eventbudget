import React from "react";
import { Login } from "./features/app/ui/login/login";
//import logo from "./logo.svg";
import "./App.css";
import { Page } from "./components/page/page";

function App() {
  return (
    <Page title="Login">
      <Login></Login>
    </Page>
  );
}

export default App;
