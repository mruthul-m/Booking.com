import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { SearchContextProvider } from "./contexts/SearchContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   rootElement
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
