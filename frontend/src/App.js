import { React } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Login from "./pages/LoginPage/Login";
import BgRemove from "./pages/app/BgRemove/BgRemove";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "rgba(240, 240, 240, 0.5)",
        height: "fit-content",
        minHeight: "100vh",
      }}
    >
      <GlobalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/myapi" element={<Dashboard />} />
            <Route exact path="/myaccount" element={<Dashboard />} />
            <Route exact path="/app/bg-remove" element={<BgRemove />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
