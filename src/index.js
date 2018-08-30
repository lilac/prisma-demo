import React from "react";
import ReactDOM from "react-dom";
import App from "./Admin";

ReactDOM.render(<App uri={`http://localhost:4466/qa/${process.env['NODE_ENV']}`}/>, document.getElementById("root"));
