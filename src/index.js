import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";

let HelloWorld = () => {
  return (
    <h1>Hello there World!</h1>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
