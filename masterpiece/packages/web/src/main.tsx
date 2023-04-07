import React from "react";
import ReactDOM from "react-dom/client";
import {
  Provider as UrqlProvider,
  createClient,
  cacheExchange,
  fetchExchange,
} from "urql";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import "./globals.css";
import AboutUs from "./pages/AboutUs";
import { EthosConnectProvider } from "ethos-connect";

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={urql}>
      <App />
    </UrqlProvider>
  </React.StrictMode>
);

function App() {
  return (
    <EthosConnectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </EthosConnectProvider>
  );
}
