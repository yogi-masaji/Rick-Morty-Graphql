import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./service/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);
